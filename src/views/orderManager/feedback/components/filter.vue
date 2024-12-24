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

    <!-- 用户编号筛选（文本框） -->
    <el-input
      v-model="filters.userId"
      placeholder="请输入用户编号"
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

    <!-- 下单时间筛选（日期范围选择框） -->
    <el-date-picker
      v-model="range"
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

const range = ref([]);

// 定义筛选条件
const filters = ref({
  movieName: "",
  userId: "",
  orderId: "",
  startTime: "",
  endTime: "",
  rate: "",
  message: "",
});

// 筛选变化时触发
const applyFilter = () => {
  // 如果选择了日期范围，格式化为字符串
  if (range.value[0] && range.value[1]) {
    filters.value.startTime = dayjs(range.value[0]).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    filters.value.endTime = dayjs(range.value[1]).format("YYYY-MM-DD HH:mm:ss");
  } else {
    filters.value.startTime = "";
    filters.value.endTime = "";
  }

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
