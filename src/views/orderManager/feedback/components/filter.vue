<template>
  <div class="filter-container">
    <!-- 电影名称筛选（文本框） -->
    <el-input
      v-model="filters.movieName"
      placeholder="请输入电影名称"
      size="small"
      class="filter-item"
      @input="applyFilter"
      clearable
    />

    <!-- 用户编号筛选（文本框） -->
    <el-input
      v-model="filters.userId"
      placeholder="请输入用户编号"
      size="small"
      class="filter-item"
      @input="applyFilter"
      clearable
    />

    <!-- 订单编号筛选（文本框） -->
    <el-input
      v-model="filters.orderId"
      placeholder="请输入订单编号"
      size="small"
      class="filter-item"
      @input="applyFilter"
      clearable
    />

    <!-- 评分筛选（评分组件） -->
    <div class="filter-item rating-filter">
      <span class="rating-label">选择评分：</span>
      <el-rate
        v-model="filters.rate"
        allow-half
        :colors="['#FF4D4F', '#FAAD14', '#F7BA2A', '#A0D911', '#52C41A']"
        :texts="['很差', '差', '一般', '好', '很棒']"
        show-text
        @change="applyFilter"
      />
    </div>

    <!-- 下单时间筛选（日期范围选择框） -->
    <el-date-picker
      v-model="range"
      type="daterange"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      size="small"
      class="filter-item"
      @change="applyFilter"
      clearable
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from "vue";
import dayjs from "dayjs";
import { debounce } from "lodash";

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
});

// 防抖处理筛选变化
const debounceApplyFilter = debounce(() => {
  if (range.value[0] && range.value[1]) {
    filters.value.startTime = dayjs(range.value[0]).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    filters.value.endTime = dayjs(range.value[1]).format("YYYY-MM-DD HH:mm:ss");
  } else {
    filters.value.startTime = "";
    filters.value.endTime = "";
  }

  emit("filterCon", filters.value);
}, 300);

const applyFilter = debounceApplyFilter;
</script>

<style scoped>
/* 容器样式 */
.filter-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  padding: 16px;
}

/* 筛选项样式 */
.filter-item {
  width: 240px;
  margin-bottom: 8px;
}

/* 评分筛选样式 */
.rating-filter {
  display: flex;
  align-items: center;
  height: 40px; /* 固定高度，避免抖动 */
}

.rating-label {
  margin-right: 8px;
  color: #606266;
  font-size: 14px;
}

/* 固定评分值的宽度 */
.el-rate__text {
  min-width: 40px;
  text-align: center;
}
</style>
