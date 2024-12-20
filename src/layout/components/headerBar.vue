<template>
  <div id="header-bar">
    <el-breadcrumb :separator-icon="ArrowRight" class="breadcrumb">
      <el-breadcrumb-item
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
        :to="breadcrumb.to"
        class="breadcrumb-item"
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
/* 引入 Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap");

/* 顶部导航条容器 */
#header-bar {
  background-color: #ffffff; /* 设置背景为纯白色 */
  border-bottom: 1px solid #dcdfe6;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 面包屑整体样式 */
.breadcrumb {
  font-size: 14px;
  color: #333333; /* 修改为深色，适合白色背景 */
  font-family: "Poppins", sans-serif; /* 使用 Poppins 字体 */
}

/* 面包屑项样式 */
.breadcrumb-item {
  font-weight: 500;
  color: #333333; /* 深色字体，以确保白色背景下的可读性 */
  cursor: pointer;
  transition: color 0.3s;
}

.breadcrumb-item:hover {
  color: #409eff; /* 鼠标悬停时改变颜色 */
}

.el-breadcrumb__separator {
  color: #eaeff9;
  font-size: 12px;
  margin: 0 5px;
}
</style>
