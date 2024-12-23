<template>
  <el-drawer v-model="drawer" title="订单详情" :with-header="false" size="40%">
    <div class="drawer-content">
      <!-- 用户编号 -->
      <div class="drawer-item">
        <span class="drawer-label">用户编号：</span>
        <span class="drawer-value">{{ props.row.userId }}</span>
      </div>
      <!-- 电影名称 -->
      <div class="drawer-item">
        <span class="drawer-label">电影名称：</span>
        <span class="drawer-value">{{ props.row.movieName }}</span>
      </div>
      <!-- 影厅名称 -->
      <div class="drawer-item">
        <span class="drawer-label">影厅名称：</span>
        <span class="drawer-value">{{ props.row.cinemaName }}</span>
      </div>
      <!-- 订单状态 -->
      <div class="drawer-item">
        <span class="drawer-label">订单状态：</span>
        <span class="drawer-value">
          <el-tag :type="getStatusTagType(props.row.status)">
            {{ props.row.status }}
          </el-tag>
        </span>
      </div>
      <!-- 下单时间 -->
      <div class="drawer-item">
        <span class="drawer-label">下单时间：</span>
        <span class="drawer-value">
          {{ formatOrderTime(props.row.orderTime) }}
        </span>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, defineProps, watch, defineEmits } from "vue";
import dayjs from "dayjs";

// 定义父组件传递的属性
const props = defineProps({
  drawerVisible: Boolean,
  row: {
    type: Object,
    default: null,
  },
});

// 定义事件
const emit = defineEmits(["update:drawerVisible"]);

// 使用 ref 来控制抽屉的显示与隐藏
const drawer = ref(props.drawerVisible);

// 监听 props.drawerVisible 的变化
watch(
  () => props.drawerVisible,
  (newValue) => {
    drawer.value = newValue;
  }
);

// 监听 drawer 的变化并通知父组件
watch(drawer, (newValue) => {
  emit("update:drawerVisible", newValue);
});

// 格式化订单时间
const formatOrderTime = (orderTime: string) => {
  return orderTime ? dayjs(orderTime).format("YYYY-MM-DD HH:mm:ss") : "";
};

// 获取状态的 tag 类型
const getStatusTagType = (status: string) => {
  switch (status) {
    case "已支付":
      return "success";
    case "未支付":
      return "warning";
    case "已确认":
      return "info";
    case "已观看":
      return "success";
    case "已取消":
      return "danger";
    case "已退款":
      return "danger";
    default:
      return "default";
  }
};
</script>

<style scoped>
/* 抽屉内容区域 */
.drawer-content {
  padding: 20px;
  font-size: 14px;
  color: #333;
}

/* 抽屉项 */
.drawer-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 14px;
}

/* 标签和数值的样式 */
.drawer-label {
  font-weight: bold;
  color: #555;
}

.drawer-value {
  color: #333;
}
</style>
