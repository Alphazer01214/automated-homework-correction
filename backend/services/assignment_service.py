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