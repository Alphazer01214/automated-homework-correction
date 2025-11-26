import request from './request';
// AI写的一坨，未来要重构
/**
 * 提交作业进行批改
 * 对应后端: POST /api/assignments/submit
 * @param {Object} data - 作业数据，包含 subject_id, questions 等
 */
export function submitAssignment(data) {
  return request({
    url: '/assignments/submit',
    method: 'post',
    data: data
  });
}

/**
 * 获取作业批改结果
 * 对应后端: GET /api/assignments/{assignment_id}/result
 * @param {String} assignmentId
 */
export function getAssignmentResult(assignmentId) {
  return request({
    url: `/assignments/${assignmentId}/result`,
    method: 'get'
  });
}
