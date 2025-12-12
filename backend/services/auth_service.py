# 这是认证的具体实现，包括用户的注册与登录
from backend.models.user import User
from backend.utils.database import db

class AuthService:
    @staticmethod
    def register(username, password, role='student'):
        """
        用户注册
        return 用户模型（对象），消息（字符串）
        """
        # 检查用户名合法性以及是否已存在
        if len(username) <= 0 or len(username) > 30 or len(password) <= 0 or len(password) > 30:
            return None, "Invalid username or password."

        if User.query.filter_by(username=username).first():
            return None, "User exists."

        # 创建用户（暂时不加密密码）
        user = User(
            username=username,
            password=password,
            role=role
        )

        db.session.add(user)
        db.session.commit()

        return user, "Registered successfully."

    @staticmethod
    def login(username, password):
        """用户登录"""
        user = User.query.filter_by(username=username).first()

        if not user:
            return None, "User not found."

        # 验证密码（暂时直接比较，实际需要加密验证）
        if user.password != password:
            return None, "Wrong password."

        return user, "Successfully logged in."

    @staticmethod
    def get_user_by_id(user_id):
        """根据ID获取用户"""
        return User.query.get(user_id)
