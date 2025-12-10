# 向LLMAPI发送/接受消息，可能后续需要实现并行

import os
import threading
from openai import OpenAI
from dotenv import load_dotenv
from backend.config import Config
load_dotenv()

API_KEY = Config.API_KEY
API_BASE_URL = Config.API_BASE_URL
API_MODEL_NAME = Config.API_MODEL_NAME

