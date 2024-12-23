<template>
  <div id="feedback-list">
    <!-- 筛选和添加反馈 -->
    <div class="toolbar">
      <Filter @filter-con="filterData"></Filter>
    </div>

    <!-- 反馈数据表格 -->
    <el-table :data="paginatedData" style="width: 100%" border>
      <!-- 订单编号 -->
      <el-table-column
        prop="orderId"
        label="订单编号"
        width="150"
        align="center"
      />
      <!-- 用户编号 -->
      <el-table-column
        prop="userId"
        label="用户编号"
        width="150"
        align="center"
      />

      <!-- 电影名称 -->
      <el-table-column
        prop="movieName"
        label="电影名称"
        width="200"
        align="center"
      />

      <!-- 评价信息 -->
      <el-table-column
        prop="feedback"
        label="评价信息"
        width="400"
        align="center"
      />

      <!-- 评分 -->
      <el-table-column prop="rating" label="评分" width="200" align="center">
        <template #default="{ row }">
          <el-rate
            disabled
            v-model="row.rating"
            show-text
            text-color="#ff9900"
            count="5"
            allow-half
            show-score
            :colors="['#f7ba2a', '#f7ba2a', '#f7ba2a', '#f7ba2a', '#f7ba2a']"
          />
        </template>
      </el-table-column>

      <!-- 评价时间 -->
      <el-table-column
        prop="feedbackTime"
        label="评价时间"
        width="200"
        align="center"
      >
        <template #default="{ row }">
          {{ formatDate(row.feedbackTime) }}
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="filteredData.length"
        layout="prev, pager, next"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { feedback_data } from "@/test/order"; // 示例数据
import Filter from "./components/filter.vue";
import dayjs from "dayjs"; // 导入 dayjs 库

const table_data = ref(feedback_data);

// 反馈数据
const tableData = ref(table_data);
const filteredData = ref([...tableData.value]);

// 格式化时间
const formatDate = (date: string) => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};

// 筛选逻辑
const filterData = (filters: any) => {
  const { orderId, movieName, userId, feedback, feedbackTime } = filters;

  filteredData.value = tableData.value.filter((item) => {
    const isFeedbackTimeInRange = () => {
      if (!feedbackTime || feedbackTime.length !== 2) return true;
      const [start, end] = feedbackTime;
      const itemTime = dayjs(item.feedbackTime, "YYYY-MM-DD HH:mm:ss");
      return (
        itemTime.isAfter(dayjs(start, "YYYY-MM-DD HH:mm:ss")) &&
        itemTime.isBefore(dayjs(end, "YYYY-MM-DD HH:mm:ss"))
      );
    };

    return (
      (orderId ? item.orderId.includes(orderId) : true) &&
      (movieName ? item.movieName.includes(movieName) : true) &&
      (userId ? item.userId.includes(userId) : true) &&
      (feedback ? item.feedback.includes(feedback) : true) &&
      isFeedbackTimeInRange()
    );
  });
};

// 分页逻辑
const currentPage = ref(1);
const pageSize = ref(10);

// 计算当前页的数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredData.value.slice(start, end);
});

// 分页页码切换
const handlePageChange = (page: number) => {
  currentPage.value = page;
};
</script>

<style scoped>
#feedback-list {
  padding: 20px;
  border-radius: 8px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.el-table {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.el-table__row:hover {
  background-color: #f5f5f5;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}
</style>
