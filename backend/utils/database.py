# database.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    """初始化数据库"""
    db.init_app(app)
    #
    # from backend.models.assignment import Assignment
    # from backend.models.user import User

    # 在应用上下文中创建表
    with app.app_context():
        db.create_all()