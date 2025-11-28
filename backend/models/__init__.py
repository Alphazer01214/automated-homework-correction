from ..utils.database import db

# 导入所有模型，确保它们在db.metadata中注册
from .user import User
from .assignment import Assignment

__all__ = ['db', 'User', 'Assignment']