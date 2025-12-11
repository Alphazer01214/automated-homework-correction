# app.py
from flask import Flask
from config import Config
from backend.utils.database import init_db     # 注意导入都要从backend开始！！！！！否则会循环引用/引用不一样的对象（见model/assignment, user的导入方式）
import os
from routes.auth import auth_bp
from routes.assignment import assignment_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # 确保上传目录存在
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    # 初始化数据库
    init_db(app)

    # 注册
    app.register_blueprint(auth_bp)
    app.register_blueprint(assignment_bp)

    return app


app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
