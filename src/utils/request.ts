import axios from "axios";

// 创建 Axios 实例
const service = axios.create({
  baseURL: "http://localhost:8080", // 基础 URL
  timeout: 5000, // 请求超时时间
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 获取 token，假设 token 存储在 localStorage 中
    const token = localStorage.getItem("token");

    // 如果 token 存在，则将 token 添加到请求头
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config; // 返回配置，以继续发送请求
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 在响应数据到达客户端之前可以做一些处理（例如，统一处理返回的数据格式）
    return response;
  },
  (error) => {
    // 如果响应状态码为 401，表示 token 可能过期，执行相关操作
    if (error.response && error.response.status === 401) {
      // 可以在这里处理 token 过期的情况，例如跳转到登录页
      // 清除存储的 token 并跳转到登录页面
      localStorage.removeItem("token");
      window.location.href = "/login"; // 跳转到登录页
    }

    // 处理响应错误
    return Promise.reject(error);
  }
);

export default service;
