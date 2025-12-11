# assignment.py - 作业模型
from email.policy import default

from backend.utils.database import db
from datetime import datetime
import uuid



class Assignment(db.Model):
    __tablename__ = 'assignments'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))       # 作业的唯一id
    user_id = db.Column(db.String(36), db.ForeignKey('users.user_id'), nullable=True)
    subject = db.Column(db.String(50), nullable=False)
    questions = db.Column(db.JSON, nullable=False)                    # 问题（JSON）包括了问题与用户答案
    model_feedback = db.Column(db.JSON, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)# 模型回复JSON中的feedback项
    # 以下内容从model_feedback中更新，或因为访问模型而更新
    knowledge = db.Column(db.JSON, nullable=True, default=list)     # 通过模型回复更新知识点
    score = db.Column(db.Numeric(precision=5, scale=2), nullable=True)     # 未批改是null，批改是0-100
    status = db.Column(db.String(20), default='pending')              # pending, processing, completed, failed
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'subject': self.subject,
            "questions": self.questions,
            "model_feedback": self.model_feedback,
            'knowledge': self.knowledge,
            "score": self.score,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

