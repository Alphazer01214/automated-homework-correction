
from flask import jsonify, Blueprint, request
from backend.services.essay_service import EssayService
import json

essay_bp = Blueprint('essay', __name__, url_prefix='/api/essay')

@essay_bp.route('/submit', methods=['POST'])
def submit():
    """
    {
        "id": string,   // 相同question, student_answer视为同一个id
        "question": string,
        "student_answer": string,
        "ground_truth": string,
        "model_feedback": string,
        "edits": Array<Object>  // {username: string, feedback: string}，哪个老师给出什么评论
    }
    :return: {"success": bool, data: {"id": string}}
    """
    data = request.get_json()
    # id = data.get('id')
    # question = data.get('question')
    # student_answer = data.get('student_answer')
    # ground_truth = data.get('ground_truth')
    # model_feedback = data.get('model_feedback')
    # edits = data.get('edits')
    essay, message = EssayService.submit_essay(data)
    return jsonify({"success": True, "data": essay, "message": message})

@essay_bp.route('/history', methods=['GET'])
def get_history():
    username = request.args.get('username')
    essay, message = EssayService.get_essay_by_username(username)

    return jsonify({"success": True, "data": essay, "message": message})
