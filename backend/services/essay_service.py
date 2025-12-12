# import json
# import uuid
#
# class EssayService:
#     @staticmethod
#     def submit_essay(data):
#         """
#         提交作文
#         :param data: json {
#             "question": string,
#             "student_answer": string,
#             "ground_truth": string,
#             "model_feedback": string,
#             "edits": Array<Object>  // {username: string, feedback: string}，哪个老师给出什么评论
#         }
#         :return: assignment，消息
#         """
#         data['id'] = str(uuid.uuid4())
#         try:
#             with open('uploads/essay.json', 'a', encoding='utf-8') as f:
#                 json.dump(data, f, ensure_ascii=False, indent=2)
#         except FileNotFoundError:
#             return None, "File not found"
#
#         return data, "Submitted"
#
#     @staticmethod
#     def get_essay_by_username(username):
#         result = []
#         try:
#             with open('uploads/essay.json', 'r', encoding='utf-8') as f:
#                 data = json.load(f)
#                 for item in data:
#                     if item.get('username') == username:
#                         result.append(item)
#         except FileNotFoundError:
#             return None, "File not found"
#         return result, f"{len(result)} essays found"

import json
import uuid
import os


class EssayService:
    @staticmethod
    def submit_essay(data):
        """
        提交作文
        :param data: json {
            "username": string,  # 添加 username 字段
            "question": string,
            "student_answer": string,
            "ground_truth": string,
            "model_feedback": string,
            "edits": Array<Object>  # {username: string, feedback: string}，哪个老师给出什么评论
        }
        :return: assignment，消息
        """
        # 生成唯一 ID
        data['id'] = str(uuid.uuid4())

        # 确保 uploads 目录存在
        os.makedirs('uploads', exist_ok=True)

        # 文件路径
        file_path = 'uploads/essay.json'

        try:
            # 读取现有数据
            existing_data = []
            if os.path.exists(file_path):
                with open(file_path, 'r', encoding='utf-8') as f:
                    # 检查文件是否为空
                    content = f.read().strip()
                    if content:
                        existing_data = json.loads(content)

            # 添加新数据
            existing_data.append(data)

            # 写回文件
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(existing_data, f, ensure_ascii=False, indent=2)

        except Exception as e:
            return None, f"Error: {str(e)}"

        return data, "Essay submitted successfully"

    @staticmethod
    def get_essay_by_username(username):
        """
        根据用户名获取作文
        :param username: 用户名
        :return: 作文列表，消息
        """
        file_path = 'uploads/essay.json'

        if not os.path.exists(file_path):
            return [], "No essays found"

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read().strip()
                if not content:
                    return [], "No essays found"

                all_essays = json.loads(content)

                # 筛选指定用户的作文
                result = []
                for essay in all_essays:
                    # 检查是否有 username 字段
                    if essay.get('username') == username:
                        result.append(essay)

        except json.JSONDecodeError:
            return [], "Error: Invalid JSON format"
        except Exception as e:
            return [], f"Error: {str(e)}"

        if result:
            return result, f"Found {len(result)} essay(s) for user '{username}'"
        else:
            return [], f"No essays found for user '{username}'"

    @staticmethod
    def get_all_essays():
        """获取所有作文"""
        file_path = 'uploads/essay.json'

        if not os.path.exists(file_path):
            return [], "No essays found"

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read().strip()
                if not content:
                    return [], "No essays found"

                all_essays = json.loads(content)
                return all_essays, f"Found {len(all_essays)} essay(s)"

        except json.JSONDecodeError:
            return [], "Error: Invalid JSON format"
        except Exception as e:
            return [], f"Error: {str(e)}"

