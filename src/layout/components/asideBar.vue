<template>
  <div id="aside-bar">
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          :default-active="activePath"
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
          router
        >
          <el-menu-item index="/dashboard">
            <el-icon><HomeFilled /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="/aditorium_manager">
            <template #title>
              <el-icon><IconMenu /></el-icon>
              <span>影厅管理</span>
            </template>
            <el-menu-item index="/aditorium_manager/list"
              >影厅列表</el-menu-item
            >
            <el-menu-item index="/aditorium_manager/data"
              >运营数据</el-menu-item
            >
          </el-sub-menu>

          <el-sub-menu index="/order_manager">
            <template #title>
              <el-icon><Document /></el-icon>
              <span>订单管理</span>
            </template>
            <el-menu-item index="/order_manager/list">订单列表</el-menu-item>
            <el-menu-item index="/order_manager/data">运营数据</el-menu-item>
            <el-menu-item index="/order_manager/feedback"
              >订单反馈</el-menu-item
            >
          </el-sub-menu>
          <el-sub-menu index="/user_manager">
            <template #title>
              <el-icon><UserFilled /></el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/user_manager/list">用户列表</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="/movice_manager">
            <template #title>
              <el-icon><IconMenu /></el-icon>
              <span>放映管理</span>
            </template>
            <el-menu-item index="/movice_manager/schedule"
              >放映排期</el-menu-item
            >
          </el-sub-menu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {
  Document,
  HomeFilled,
  Menu as IconMenu,
  UserFilled,
} from "@element-plus/icons-vue";
import { useRoute } from "vue-router"; // 用于动态获取当前路径
import { computed } from "vue";

const handleOpen = (key: string, keyPath: string[]) => {
  console.log("Open:", key, keyPath);
};

const handleClose = (key: string, keyPath: string[]) => {
  console.log("Close:", key, keyPath);
};

const route = useRoute();
const activePath = computed(() => route.path);
</script>

<style scoped>
/* 引入字体 */
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400&display=swap");

/* Sidebar container style */
#aside-bar {
  background-color: #545c64;
  height: 100%;
  font-family: sans-serif; /* 默认字体 */
}

/* Menu style */
.el-menu-vertical-demo {
  width: 200px;
  height: 100%;
  padding-top: 40px;
}

/* Menu item hover effect */
.el-menu-item {
  font-weight: 400; /* Lighter font weight */
  color: #fff;
  transition: background-color 0.3s ease;
}

.el-menu-item:hover {
  background-color: #3e4a5b; /* Slightly darker background on hover */
}

/* Icon styles */
.el-menu-item span {
  font-weight: 400; /* Lighter font weight for the text */
}

/* Icon color */
.el-menu-item .el-icon {
  font-size: 20px;
  margin-right: 10px;
}
</style>
