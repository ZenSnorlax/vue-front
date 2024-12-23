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
        redirect: "/user_manager/list", // 默认重定向到子路由
        name: "UserManager",
        meta: {
          title: "用户管理",
          requiresAuth: true,
        },
        children: [
          {
            path: "list",
            component: () => import("@/views/userManager/list/index.vue"),
            name: "UserList",
            meta: {
              title: "用户列表",
              requiresAuth: true,
            },
          },
        ],
      },
      {
        path: "/cinema_manager",
        name: "CinemaManager",
        redirect: "/cinema_manager/list", // 默认重定向到子路由
        meta: {
          title: "影厅管理",
          requiresAuth: true,
        },
        children: [
          {
            path: "list",
            component: () => import("@/views/cinemaManager/list/index.vue"),
            name: "CinemaList",
            meta: {
              title: "影厅列表",
              requiresAuth: true,
            },
          },
          {
            path: "data",
            component: () => import("@/views/cinemaManager/data/index.vue"),
            name: "CinemaData",
            meta: {
              title: "运营数据",
            },
          },
        ],
      },

      {
        path: "order_manager",
        redirect: "/order_manager/list", // 默认重定向到子路由
        name: "OrderManager",
        meta: {
          title: "订单管理",
          requiresAuth: true,
        },
        children: [
          {
            path: "list",
            component: () => import("@/views/orderManager/list/index.vue"),
            name: "OrderList",
            meta: {
              title: "订单列表",
              requiresAuth: true,
            },
          },
          {
            path: "data",
            component: () => import("@/views/orderManager/data/index.vue"),
            name: "OrderData",
            meta: {
              title: "运营数据",
              requiresAuth: true,
            },
          },
          {
            path: "feedback",
            component: () => import("@/views/orderManager/feedback/index.vue"),
            name: "OrderFeedback",
            meta: {
              title: "订单反馈",
              requiresAuth: true,
            },
          },
        ],
      },
      {
        path: "movie_manager",
        redirect: "/movie_manager/schedule", // 默认重定向到子路由
        name: "MovieManager",
        meta: {
          title: "放映管理",
          requiresAuth: true,
        },
        children: [
          {
            path: "schedule",
            component: () => import("@/views/movieManager/schedule/index.vue"),
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
