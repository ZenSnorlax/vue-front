<template>
  <div id="feedback-list">
    <!-- 筛选反馈 -->
    <div class="toolbar">
      <Filter @filter-con="handleFilter" />
    </div>

    <!-- 反馈数据表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column
        prop="orderId"
        label="订单编号"
        width="150"
        align="center"
      />
      <el-table-column
        prop="userId"
        label="用户编号"
        width="150"
        align="center"
      />
      <el-table-column
        prop="movieName"
        label="电影名称"
        width="200"
        align="center"
      />
      <el-table-column
        prop="feedback"
        label="评价信息"
        width="400"
        align="center"
      />
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
        v-model:current-page="pagination.page"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        layout="prev, pager, next"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Filter from "./components/filter.vue";
import dayjs from "dayjs"; // 导入 dayjs 库
import { getFeedbackPaginated } from "@/api/order";

// 定义表格数据类型
interface Feedback {
  orderId: string;
  userId: string;
  cinemaName: string;
  movieName: string;
  feedbackTime: string;
  message: string;
  rate: number;
}

// 表格数据
const tableData = ref<Feedback[]>([]);

// 分页数据
const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 0,
});

// 筛选条件
const filters = ref<any>(undefined);

// 获取数据
const fetchData = async (page = pagination.value.page) => {
  try {
    const response = await getFeedbackPaginated({
      pageSize: pagination.value.pageSize,
      page,
      ...filters.value,
    });

    const { total, data } = response.data.contents;
    pagination.value.total = total;
    tableData.value = data;
  } catch (error) {
    console.error("获取分页数据失败:", error);
  }
};

// 分页操作
const handlePageChange = (page: number) => {
  pagination.value.page = page;
  fetchData();
};

// 筛选操作
const handleFilter = (filterParams: any) => {
  filters.value = filterParams;
  fetchData(1); // 筛选后重置页码为1
};

// 格式化时间
const formatDate = (date: string) => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};

onMounted(() => {
  fetchData();
});
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
