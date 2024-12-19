<template>
  <div id="aside-bar">
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="/dashboard"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
          router
        >
          <el-menu-item index="/dashboard" :to="{ path: '/dashboard' }">
            <el-icon><HomeFilled /></el-icon>
            <span>首页</span>
          </el-menu-item>

          <el-menu-item index="/navigator-two" :to="{ path: '/navigator-two' }">
            <el-icon><IconMenu /></el-icon>
            <span>影院管理</span>
          </el-menu-item>

          <el-menu-item
            index="/navigator-three"
            :to="{ path: '/navigator-three' }"
          >
            <el-icon><Document /></el-icon>
            <span>订单管理</span>
          </el-menu-item>

          <!-- Navigator Four -->
          <el-menu-item
            index="/navigator-four"
            :to="{ path: '/navigator-four' }"
          >
            <el-icon><Setting /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
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
  Setting,
} from "@element-plus/icons-vue";

// 打开菜单时的回调
const handleOpen = (key: string, keyPath: string[]) => {
  console.log("Open:", key, keyPath);
};

// 关闭菜单时的回调
const handleClose = (key: string, keyPath: string[]) => {
  console.log("Close:", key, keyPath);
};
</script>

<style scoped>
#aside-bar {
  background-color: #545c64;
  height: 100vh; /* 侧边栏填满整个视口 */
}

.el-menu-vertical-demo {
  width: 200px;
  height: 100%; /* 填满侧边栏父容器 */
}

.el-menu-vertical-demo .el-menu-item {
  padding: 0 20px; /* 菜单项的间距调整 */
}

.el-menu-vertical-demo .el-menu-item:hover {
  background-color: #636c73; /* 鼠标悬浮的背景色 */
}
</style>
