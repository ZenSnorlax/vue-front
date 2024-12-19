<template>
  <div id="header-bar">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
        :to="breadcrumb.to"
      >
        {{ breadcrumb.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { ArrowRight } from "@element-plus/icons-vue";

// 获取当前路由
const route = useRoute();

// 生成面包屑数据
const breadcrumbs = computed(() => {
  const paths = route.path.split("/").filter(Boolean);
  const breadcrumbList = paths.map((path, index) => {
    const fullPath = "/" + paths.slice(0, index + 1).join("/");
    const routeMeta = route.matched.find((r) => r.path === fullPath)?.meta;
    return {
      title: routeMeta?.title || path,
      to: { path: fullPath },
    };
  });

  // 如果当前路径不是 "/dashboard"，则添加 "首页" 面包屑
  if (route.path !== "/dashboard") {
    breadcrumbList.unshift({
      title: "首页",
      to: { path: "/" },
    });
  }

  return breadcrumbList;
});
</script>

<style scoped>
#header-bar {
  background-color: ghostwhite;
  border-bottom: 2px solid grey;
  height: 40px;
  display: flex;
  align-items: center;
}
.el-breadcrumb {
  margin-left: 20px;
}
</style>
