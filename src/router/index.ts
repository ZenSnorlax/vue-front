import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "../layout/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: { title: "主页" },
      },
    ],
  },
  {
    path: "/user_manager",
    component: Layout,
    meta: { title: "用户管理" },
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { title: "登陆", hidden: true },
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {},
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401.vue"),
  },
  {
    path: "/:pathMatch(.*)*", // 捕获所有未匹配的路由
    redirect: "/404", // 跳转到 404 页面
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
