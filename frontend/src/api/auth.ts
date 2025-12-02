import request from "@/api/request.ts";

const AUTH_URL = '/auth';

// 用户
export function login(username: string, password: string) {
  return request.post(`${AUTH_URL}/login`, { username, password });
}

export function register(username: string, password: string) {
    return request.post(`${AUTH_URL}/register`, { username, password });
}

/**
 * 退出登录 (如果后端有对应的清理操作)
 * @returns {Promise<Object>}
 */
export function logout() {
    // 实际项目中，退出登录可能需要调用一个API来使服务器端的Session/Token失效
    return request.post(`${AUTH_URL}/logout`);
}
