# app.py
import json
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import uuid
import os
from datetime import datetime
from dotenv import load_dotenv

# ==========================
# 配置
# ==========================
app = Flask(__name__)
CORS(app)

# 数据库配置
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///assignments.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 文件上传路径
UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

db = SQLAlchemy(app)


# 数据库模型
class Assignment(db.Model):
    id = db.Column(db.String, primary_key=True)
    user_id = db.Column(db.String, nullable=True)
    subject = db.Column(db.String, nullable=False)
    assignment_type = db.Column(db.String, nullable=False)
    content = db.Column(db.JSON, nullable=False)
    result = db.Column(db.JSON, nullable=True)
    status = db.Column(db.String, default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# 初始化数据库
with app.app_context():
    db.create_all()

# 根路由（仅测试用）
@app.route('/')
def index():
    """
    测试用，后续需要通过axios实现前后端沟通
    :return:
    """
    return "Hello World"


# 学科接口
@app.route('/api/subjects', methods=['GET'])
def get_subjects():
    """
    获取学科信息
    :return:
    """
    try:
        with open('./data/subjects.json', 'r', encoding='utf-8') as f:
            subjects = json.load(f)
            return jsonify({"success": True, "data": {"subjects": subjects}})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})


# 作业提交接口
@app.route('/api/assignments/submit', methods=['POST'])
def submit_assignment():
    """
    提交作业并存入数据库，需要调用LLM API
    注意：存在异步操作，提交后不等待LLM返回，后续若LLM有回应则存入数据库中，后续要获取批改结果直接由assignment_id从数据库中搜索
    :return: {status, assignment_id}
    """


# 获取批改结果
@app.route('/api/assignments/<assignment_id>/result', methods=['GET'])
def get_result(assignment_id):
    """
    从数据库中获取结果
    :param assignment_id:
    :return: {status, data}，data是数据库中的内容
    """


# 文件上传接口
@app.route('/api/files/upload', methods=['POST'])
def upload_file():
    """
    文件上传
    :return: {status, file_path}
    """


# ==========================
# 启动 Flask
# ==========================
if __name__ == '__main__':
    app.run(debug=True)
