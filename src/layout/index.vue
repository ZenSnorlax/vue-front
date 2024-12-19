<template>
  <div id="layout">
    <el-container>
      <el-aside width="200px">
        <aside-bar></aside-bar>
      </el-aside>
      <el-container>
        <el-header><header-bar></header-bar></el-header>
        <el-main><router-view> </router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import asideBar from "./components/asideBar.vue";
import headerBar from "./components/headerBar.vue";
</script>

<style scoped>
#layout {
  overflow: hidden;
  height: 100vh;
}
.el-container {
  height: 100%;
}
</style>
