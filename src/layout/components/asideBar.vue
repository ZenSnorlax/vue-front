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

          <el-menu-item index="/navigator-two">
            <el-icon><IconMenu /></el-icon>
            <span>影院管理</span>
          </el-menu-item>

          <el-menu-item index="/navigator-three">
            <el-icon><Document /></el-icon>
            <span>订单管理</span>
          </el-menu-item>

          <el-menu-item index="/user_manager">
            <el-icon><UserFilled /></el-icon>
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
#aside-bar {
  background-color: #545c64;
  height: 100%;
}

.el-menu-vertical-demo {
  width: 200px;
  height: 100%;
}
</style>
