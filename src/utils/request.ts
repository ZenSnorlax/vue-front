import axios from "axios";

// 创建 Axios 实例
const service = axios.create({
  baseURL: "https://localhost:8080",
  timeout: 5000, // 请求超时时间
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在请求发送之前做一些处理
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 在响应数据到达客户端之前做一些处理
    return response;
  },
  (error) => {
    // 处理响应错误
    return Promise.reject(error);
  }
);

export default service;
