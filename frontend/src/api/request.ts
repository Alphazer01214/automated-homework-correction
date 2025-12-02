// 前后端通信的核心文件 request.ts
import axios from 'axios';

const service = axios.create({
  // 配合 Vite 的代理配置，或者直接写 'http://127.0.0.1:5000/api'
  baseURL: '/api',      // 后端请求地址
  timeout: 60000, // AI 处理可能较慢，设置较长超时
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 如果有 token 可以在这里添加
    // config.headers['Authorization'] = getToken();
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  // 拦截器：拦截失败的请求
  response => {
    const res = response.data;
    // 这里根据后端返回的 success 字段判断业务逻辑是否成功
    // 假设后端格式为 { success: true, data: {...} }
    if (res.success === false) {
        console.error('API Error:', res.message);
        return Promise.reject(new Error(res.message || 'Error'));
    } else {
        return res;
    }
  },
  error => {
    console.log('err' + error);
    return Promise.reject(error);
  }
);

export default service;
