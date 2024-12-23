<template>
  <div class="flex flex-wrap gap-4 items-center">
    <!-- 电影名称筛选（文本框） -->
    <el-input
      v-model="filters.movieName"
      placeholder="请输入电影名称"
      size="small"
      style="width: 240px"
      @input="applyFilter"
    />

    <!-- 影厅名称筛选（文本框） -->
    <el-input
      v-model="filters.cinemaName"
      placeholder="请输入影厅名称"
      size="small"
      style="width: 240px"
      @input="applyFilter"
    />

    <!-- 顾客编号筛选（文本框） -->
    <el-input
      v-model="filters.userId"
      placeholder="请输入顾客编号"
      size="small"
      style="width: 240px"
      @input="applyFilter"
    />

    <!-- 订单编号筛选（文本框） -->
    <el-input
      v-model="filters.orderId"
      placeholder="请输入订单编号"
      size="small"
      style="width: 240px"
      @input="applyFilter"
    />

    <!-- 订单状态筛选（选择框） -->
    <el-select
      v-model="filters.status"
      placeholder="选择订单状态"
      size="small"
      style="width: 240px"
      @change="applyFilter"
    >
      <el-option
        v-for="item in statusOptions"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>

    <!-- 下单时间筛选（日期范围选择框） -->
    <el-date-picker
      v-model="filters.orderTime"
      type="daterange"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      size="small"
      @change="applyFilter"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from "vue";
import dayjs from "dayjs";

// 定义 emit，用于向父组件传递事件
const emit = defineEmits(["filterCon"]);

// 定义筛选条件，状态默认为 "全选"
const filters = ref({
  movieName: "",
  cinemaName: "",
  userId: "",
  orderId: "",
  status: "", // 初始为空字符串表示没有选择任何状态
  orderTime: [] as string[], // 类型为字符串数组
});

// 各个筛选项的选择项（已删除 "全选"）
const statusOptions = ref([
  "已支付",
  "未支付",
  "已确认",
  "已观看",
  "已取消",
  "已退款",
]);

// 筛选变化时触发
const applyFilter = () => {
  const [start, end] = filters.value.orderTime;

  // 如果存在日期范围，则格式化为字符串
  filters.value.orderTime =
    start && end
      ? [
          dayjs(start).format("YYYY-MM-DD HH:mm:ss"),
          dayjs(end).format("YYYY-MM-DD HH:mm:ss"),
        ]
      : [];

  // 触发父组件的筛选事件，传递当前筛选条件
  emit("filterCon", filters.value);
};
</script>

<style scoped>
/* 添加一些间距和布局优化 */
.flex {
  display: flex;
  flex-wrap: wrap;
}

.gap-4 {
  gap: 16px;
}

.items-center {
  align-items: center;
}
</style>
