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

// 定义筛选条件
const filters = ref({
  movieName: "",
  cinemaName: "",
  userId: "",
  orderId: "",
  status: "", // 初始为空字符串表示未选择状态
  startTime: "",
  endTime: "",
});

// 日期范围绑定变量
const range = ref<[Date | null, Date | null]>([null, null]);

// 各个筛选项的选项
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
