# 单独为作文类型另开model
import json
import os
import uuid

ESSAY_DIR = '../uploads/essay'
ESSAY_FILENAME = 'essay.json'


class Essay:
    id: str = ''
    question: str = ''
    student_answer:str = ''
    ground_truth: str = ''
    model_feedback: str = ''
    edits: []

    def __init__(self, question, student_answer, ground_truth, model_feedback, edits):
        """

        :param question:
        :param student_answer:
        :param ground_truth:
        :param model_feedback:
        :param edits:
        """
        self.id = str(uuid.uuid4())
        self.question = question
        self.student_answer = student_answer
        self.ground_truth = ground_truth
        self.model_feedback = model_feedback
        self.edits = edits



