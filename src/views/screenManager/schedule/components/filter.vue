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
    <!-- 放映状态筛选（选择框） -->
    <el-select
      v-model="filters.status"
      placeholder="选择放映状态"
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

    <!-- 放映时间筛选（日期范围选择框） -->
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
const emit = defineEmits<{
  (e: "filter-con", filters: any): void; // 定义触发事件的类型
}>();

// 定义日期范围
const range = ref<[Date | null, Date | null]>([null, null]);
// 定义筛选条件，状态默认为 "全选"
const filters = ref({
  movieName: "", // 电影名称
  cinemaName: "", // 影厅名称
  status: "", // 放映状态
  movStartTime: "",
  movEndTime: "",
});

// 各个筛选项的选择项
const statusOptions = ref(["未放映", "正在放映", "已放映"]);
// 筛选变化时触发
const applyFilter = () => {
  // 判断是否选择了日期范围
  if (range.value[0] && range.value[1]) {
    filters.value.movStartTime = dayjs(range.value[0]).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    filters.value.movEndTime = dayjs(range.value[1]).format(
      "YYYY-MM-DD HH:mm:ss"
    );
  } else {
    filters.value.movStartTime = "";
    filters.value.movEndTime = "";
  }

  // 触发父组件事件，传递筛选条件
  emit("filter-con", filters.value);
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
