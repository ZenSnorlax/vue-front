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
  (e: "filter-con", filters: any): void;
}>();

// 定义日期范围
const range = ref<[Date | null, Date | null]>([null, null]);

// 定义筛选条件
const filters = ref({
  userName: "",
  userId: "",
  userEmail: "",
  userPhone: "",
  status: "",
  startTime: "",
  endTime: "",
});

// 用户状态选项
const statusOptions = ref(["活跃", "禁用"]);

// 筛选变化时触发
const applyFilter = () => {
  // 判断是否选择了日期范围
  if (range.value[0] && range.value[1]) {
    filters.value.startTime = dayjs(range.value[0]).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    filters.value.endTime = dayjs(range.value[1]).format("YYYY-MM-DD HH:mm:ss");
  } else {
    filters.value.startTime = "";
    filters.value.endTime = "";
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
