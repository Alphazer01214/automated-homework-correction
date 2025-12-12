# 这是用于管理作业提交的路由

from flask import Blueprint, request, jsonify
from backend.services.assignment_service import AssignmentService
from backend.models.assignment import Assignment

assignment_bp = Blueprint('assignment', __name__, url_prefix='/api/assignment')

@assignment_bp.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    questions = data.get('questions')

    if not questions or len(questions) == 0:
        return jsonify({
            "success": False,
            "message": "Invalid"
        }), 400

    assignment, message = AssignmentService.submit_assignment(data)

    if assignment:
        return jsonify({
            "success": True,
            "message": message,
            "data": {
                "id": assignment.id,
                "status": assignment.status,
            }
        })
    else:
        return jsonify({
            "success": False,
            "message": message
        }), 400

@assignment_bp.route('/history', methods=['GET'])
def get_history():
    user_id = request.args.get('user_id')
    assignments = AssignmentService.get_assignments_by_user_id(user_id)
    print(assignments)
    return jsonify({
        "success": True,
        "data": assignments
    })
