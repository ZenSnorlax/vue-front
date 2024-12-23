<template>
  <div class="flex flex-wrap gap-4 items-center">
    <!-- 用户名筛选（文本框） -->
    <el-input
      v-model="filters.userName"
      placeholder="请输入用户名"
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

    <!-- 用户邮箱筛选（文本框） -->
    <el-input
      v-model="filters.userEmail"
      placeholder="请输入邮箱"
      size="small"
      style="width: 240px"
      @input="applyFilter"
    />

    <!-- 用户手机号筛选（文本框） -->
    <el-input
      v-model="filters.userPhone"
      placeholder="请输入手机号"
      size="small"
      style="width: 240px"
      @input="applyFilter"
    />
    <!-- 用户状态筛选（选择框） -->
    <el-select
      v-model="filters.status"
      placeholder="选择用户状态"
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

    <!-- 注册时间筛选（日期范围选择框） -->
    <el-date-picker
      v-model="filters.range"
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

// 定义筛选条件，状态默认为 "全选"
const filters = ref({
  userName: "",
  userId: "",
  userEmail: "",
  status: "",
  range: [] as string[], // 类型为字符串数组
  userPhone: "",
});

// 各个筛选项的选择项（已删除 "全选"）
const statusOptions = ref(["活跃", "禁用"]);

// 筛选变化时触发
const applyFilter = () => {
  const [start, end] = filters.value.range;

  // 如果存在日期范围，则格式化为字符串
  filters.value.range =
    start && end
      ? [
          dayjs(start).format("YYYY-MM-DD HH:mm:ss"),
          dayjs(end).format("YYYY-MM-DD HH:mm:ss"),
        ]
      : [];

  // 触发父组件的筛选事件，传递当前筛选条件
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
