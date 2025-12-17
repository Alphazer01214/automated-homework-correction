# 作业服务，包括作业提交、批改、管理历史数据等功能的实现

from backend.models.assignment import Assignment
from backend.models.user import User
from backend.utils.database import db

class AssignmentService:
    @staticmethod
    def submit_assignment(data):
        """
        提交作业
        :param data: json {user_id, subject, questions(array)}
        :return: assignment，消息
        """
        assignment = Assignment(
            user_id=data.get('user_id'),
            subject=data.get('subject'),
            questions=data.get('questions')
        )

        db.session.add(assignment)
        db.session.commit()

        return assignment, "Submitted"

    @staticmethod
    def delete_all_assignments():
        """删除所有作业记录"""
        try:
            # 使用原生 SQL 删除所有记录（更高效）
            db.session.query(Assignment).delete()
            db.session.commit()
            return True, "成功删除所有作业记录"
        except Exception as e:
            db.session.rollback()
            return False, f"删除失败: {str(e)}"

    @staticmethod
    def delete_assignments_by_user_id(user_id):
        """删除指定用户的所有作业"""
        try:
            # 查找并删除该用户的所有作业
            deleted_count = Assignment.query.filter_by(user_id=user_id).delete()
            db.session.commit()
            return True, f"成功删除用户 {user_id} 的 {deleted_count} 条作业记录"
        except Exception as e:
            db.session.rollback()
            return False, f"删除失败: {str(e)}"

    @staticmethod
    def delete_assignments_by_assignment_id(assignment_id):
        try:
            assignment = Assignment.query.filter_by(id=assignment_id).first()
            if assignment:
                db.session.delete(assignment)
                db.session.commit()
                return True, f"success"
            return False, f"failed"
        except Exception as e:
            db.session.rollback()
            return False, f"failed"


    @staticmethod
    def get_assignments_by_user_id(user_id: str) -> list:
        """<UNK>"""
        assignments = Assignment.query.filter_by(user_id=user_id).all()
        return [assignment.to_dict() for assignment in assignments]

    @staticmethod
    def get_all_data():
        data = User.query.all()
        for item in data:
            print(item.evil_to_dict())


