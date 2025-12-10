import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:
    # LLM API 相关，项目使用deepseek-reasoner
    API_KEY = os.getenv('API_KEY')
    API_BASE_URL = os.getenv('API_BASE_URL')
    API_MODEL_NAME = os.getenv('API_MODEL_NAME')

    # app.config['{这两个}']
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL') or 'sqlite:///assignments.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # 文件上传
    UPLOAD_FOLDER = './uploads'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB

    # Prompts
    CHINESE_ASSIGNMENT_PROMPT_DICT = {
        "sys_prompt": ""
    }


config = Config()