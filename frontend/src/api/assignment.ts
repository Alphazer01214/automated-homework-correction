// api/assignment.ts

import request from './request';
/**
 * 提交作业进行批改
 * 对应后端: POST /api/assignment/submit
 * @param {Object} data - 作业数据，包含 subject, questions 等
 */

const ASSIGNMENT_URL = '/assignment';
export function submitAssignment(data: Object) {
  return request.post(`${ASSIGNMENT_URL}/submit`, data);
}

// 获取历史记录
export function getHistory(user_id: string) {
  // 真的爆了，这个返回的是{data: , success: }，实际上内容（列表）在data里
  return request.get(`${ASSIGNMENT_URL}/history`, {
    params: {
      user_id: user_id
    }
  });
}
