from flask_sqlalchemy import SQLAlchemy

# 创建全局db实例
db = SQLAlchemy()

def init_db(app):
    """初始化数据库"""
    db.init_app(app)