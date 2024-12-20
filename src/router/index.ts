// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

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
        meta: {
          title: "主页",
          requiresAuth: true,
        },
      },
      {
        path: "user_manager",
        component: () => import("@/views/userManager/index.vue"),
        name: "UserManager",
        meta: {
          title: "用户管理",
          requiresAuth: true,
        },
      },
      {
        path: "/aditorium_manager",
        name: "AditoriumManager",
        redirect: "/aditorium_manager/list", // 默认重定向到子路由
        meta: {
          title: "影厅管理",
          requiresAuth: true,
        },
        children: [
          {
            path: "list",
            component: () => import("@/views/aditoriumManager/list/index.vue"),
            name: "AditoriumList",
            meta: {
              title: "影厅列表",
            },
          },
          {
            path: "data",
            component: () => import("@/views/aditoriumManager/data/index.vue"),
            name: "AditoriumData",
            meta: {
              title: "运营数据",
            },
          },
        ],
      },

      {
        path: "order_manager",
        component: () => import("@/views/orderManager/index.vue"),
        name: "OrderManager",
        meta: {
          title: "订单管理",
          requiresAuth: true,
        },
      },
      {
        path: "movice_manager",
        redirect: "/movice_manager/schedule", // 默认重定向到子路由
        name: "MovieManager",
        meta: {
          title: "放映管理",
          requiresAuth: true,
        },
        children: [
          {
            path: "schedule",
            component: () => import("@/views/moviceManager/schedule/index.vue"),
            name: "MovieSchedule", // 修正名称
            meta: {
              title: "放映排期",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { title: "登录" },
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: { title: "404 Not Found" },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 路由守卫：检查登录状态
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token"); // 检查是否已登录

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ path: "/login" }); // 如果需要认证且没有登录，重定向到登录页
  } else {
    next(); // 允许进入路由
  }
});

export default router;
