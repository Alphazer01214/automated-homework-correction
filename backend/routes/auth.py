# 认证路由

from flask import Blueprint, request, jsonify
from backend.services.auth_service import AuthService

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    """用户注册"""
    data = request.get_json()

    if not data or not data.get('username') or not data.get('password'):
        return jsonify({
            "success": False,
            "message": "Invalid username or password."
        }), 400

    user, message = AuthService.register(
        username=data.get('username'),
        password=data.get('password'),
        role=data.get('role', 'student')
    )

    if user:
        return jsonify({
            "success": True,
            "message": message,
            "data": user.to_dict()
        })
    else:
        return jsonify({
            "success": False,
            "message": message
        }), 400


@auth_bp.route('/login', methods=['POST'])
def login():
    """用户登录"""
    data = request.get_json()

    if not data or not data.get('username') or not data.get('password'):
        return jsonify({
            "success": False,
            "message": "Invalid username or password."
        }), 400

    user, message = AuthService.login(
        username=data.get('username'),
        password=data.get('password')
    )

    if user:
        return jsonify({
            "success": True,
            "message": message,
            "data": user.to_dict()
        })
    else:
        return jsonify({
            "success": False,
            "message": message
        }), 401


# @auth_bp.route('/profile', methods=['GET'])
# def get_profile():
#     """获取用户信息（简化版，实际需要认证中间件）"""
#     user_id = request.args.get('user_id')
#     if not user_id:
#         return jsonify({
#             "success": False,
#             "code": 40001,
#             "message": "用户ID不能为空"
#         }), 400
#
#     user = AuthService.get_user_by_id(user_id)
#     if user:
#         return jsonify({
#             "success": True,
#             "code": 200,
#             "message": "获取成功",
#             "data": user.to_dict()
#         })
#     else:
#         return jsonify({
#             "success": False,
#             "code": 40004,
#             "message": "用户不存在"
#         }), 404

@auth_bp.route('/logout', methods=['POST'])
def logout():
    """用户登出，暂时不需要实现，前端删除登录信息即可"""
    return jsonify({
        "success": True,
        "message": "Logged out."
    }), 400