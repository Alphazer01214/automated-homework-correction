# assignment.py - 作业模型

from backend.utils.database import db
from datetime import datetime
import uuid


class Assignment(db.Model):
    __tablename__ = 'assignments'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))       # 作业的唯一id
    user_id = db.Column(db.String(36), db.ForeignKey('users.user_id'), nullable=True)
    subject = db.Column(db.String(50), nullable=False)
    questions = db.Column(db.JSON, nullable=False)                    # 问题（JSON）包括了问题与用户答案
    model_feedback = db.Column(db.JSON, nullable=True)                      # 模型回复JSON中的feedback项
    score = db.Column(db.Numeric(precision=5, scale=2), nullable=True)     # 未批改是null，批改是0-100
    status = db.Column(db.String(20), default='pending')              # pending, processing, completed, failed
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'subject': self.subject,
            "questions": self.questions,
            "model_feedback": self.model_feedback,
            "score": self.score,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

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
    def delete_assignments_by_user(user_id):
        """删除指定用户的所有作业"""
        try:
            # 查找并删除该用户的所有作业
            deleted_count = Assignment.query.filter_by(user_id=user_id).delete()
            db.session.commit()
            return True, f"成功删除用户 {user_id} 的 {deleted_count} 条作业记录"
        except Exception as e:
            db.session.rollback()
            return False, f"删除失败: {str(e)}"
