# services/chat_service.py
import json
import threading
import time
from openai import OpenAI
from backend.utils.database import db
from backend.models.assignment import Assignment
from backend.services.assignment_service import AssignmentService
from datetime import datetime
import os
from dotenv import load_dotenv
from sqlalchemy import or_

load_dotenv()
API_KEY = os.getenv("API_KEY")
API_BASE_URL = os.getenv("API_BASE_URL")
API_MODEL_NAME = os.getenv("API_MODEL_NAME")


class ChatService:
    def __init__(self, app, interval=20):
        """
        :param app: Flask app 实例 —— 后台线程必须使用它来进入应用上下文
        :param interval: 每隔多少秒扫描一次数据库
        """
        self.app = app  # ★ 保存 Flask app 实例
        self.client = OpenAI(api_key=API_KEY, base_url=API_BASE_URL)
        self.interval = interval
        self.running = True

        # 启动后台线程
        self.thread = threading.Thread(target=self._worker, daemon=True)
        self.thread.start()
        print(f"[ChatService] background worker started, interval={self.interval}s")

    # ----------------------------- 后台线程 ----------------------------- #

    def _worker(self):
        """
        后台线程必须手动进入 app.app_context() 才能使用数据库
        """
        with self.app.app_context():  # ★ 使用正确的 app，而不是 current_app
            while self.running:
                try:
                    print("[ChatService] scanning pending assignments...")
                    AssignmentService.get_all_data()
                    self.process_pending_assignments()
                except Exception as e:
                    print("[ChatService] worker error:", e)

                time.sleep(self.interval)

    # ----------------------------- 批改流程 ----------------------------- #

    def process_pending_assignments(self):
        pending_assignments = Assignment.query.filter(
            or_(Assignment.status == 'pending',
                Assignment.status == 'failed')
        ).all()

        if not pending_assignments:
            return

        for assignment in pending_assignments:
            try:
                assignment.status = 'processing'
                db.session.commit()

                model_feedback = self._grade_assignment_with_llm(assignment)

                assignment.model_feedback = model_feedback
                assignment.knowledge = self._extract_knowledge(model_feedback)
                assignment.score = self._calculate_total_score(model_feedback)
                assignment.status = 'completed'
                assignment.updated_at = datetime.utcnow()

            except Exception as e:
                assignment.status = 'failed'
                assignment.updated_at = datetime.utcnow()
                print("Error grading assignment:", e)

            db.session.commit()

    # ----------------------------- 调用 LLM ----------------------------- #

    def _grade_assignment_with_llm(self, assignment: Assignment):

        prompt = f"""
你是作业批改助手，正在批改{assignment.subject}学科作业。你需要按照学科要求批改作业，尽量使用中文，并使用Markdown整理答案。严格返回 JSON，不要添加额外内容。注意：explanation 需要给出较为详细的解题过程。

格式：
{{
    "questions": [
        {{
            "question": "...",
            "student_answer": "...",
            "correct_answer": "...",
            "explanation": "...",
            "knowledge": ["知识点1", "知识点2"],
            "score": 0-100
        }}
    ]
}}

学生作业内容：
{json.dumps(assignment.questions, ensure_ascii=False)}
"""

        response = self.client.chat.completions.create(
            model=API_MODEL_NAME,
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": "You must return strictly valid JSON."},
                {"role": "user", "content": prompt}
            ]
        )

        return json.loads(response.choices[0].message.content)

    # ----------------------------- 工具函数 ----------------------------- #

    @staticmethod
    def _extract_knowledge(model_feedback):
        knowledge = set()
        for q in model_feedback.get("questions", []):
            if isinstance(q.get("knowledge"), list):
                knowledge.update(q["knowledge"])
        return list(knowledge)

    @staticmethod
    def _calculate_total_score(model_feedback):
        scores = [
            q.get("score", 0)
            for q in model_feedback.get("questions", [])
            if isinstance(q.get("score"), (int, float))
        ]
        return sum(scores) / len(scores) if scores else 0

    def stop(self):
        self.running = False
        print("[ChatService] worker stopped.")
