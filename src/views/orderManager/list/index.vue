<template>
  <div id="order-list">
    <!-- 筛选和添加订单 -->
    <div class="toolbar">
      <Filter
        @filter-con="filterData"
        :orderStatusList="orderStatusList"
      ></Filter>
      <el-button type="primary" :icon="Plus" circle @click="handleAdd" />
    </div>

    <!-- 订单数据表格 -->
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
      <!-- 影厅名称 -->
      <el-table-column
        prop="cinemaName"
        label="影厅名称"
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
      <!-- 订单状态 -->
      <el-table-column
        prop="status"
        label="订单状态"
        width="150"
        align="center"
      >
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)" disable-transitions>
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- 下单时间 -->
      <el-table-column
        prop="orderTime"
        label="下单时间"
        width="200"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ formatDate(row.orderTime) }}</span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column
        fixed="right"
        label="操作"
        min-width="160"
        align="center"
      >
        <template #default="{ row }">
          <div class="button-container">
            <el-link type="primary" size="small" @click="handleDetail(row)">
              详情
            </el-link>
            <el-link type="success" size="small" @click="handleUpdata(row)">
              修改
            </el-link>
            <el-link
              type="danger"
              size="small"
              @click="handleDelete(row.orderId)"
              >取消</el-link
            >
          </div>
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

  <!-- 订单详情 Drawer -->
  <OrderDrawer
    :drawerVisible="isDrawerVisible"
    :row="selectedRow"
    @update:drawerVisible="isDrawerVisible = $event"
  />

  <!-- 修改订单 Dialog -->
  <EditDialog
    :dialogVisible="isEditDialogVisible"
    :row="selectedRow"
    @update:dialogVisible="isEditDialogVisible = $event"
  />

  <!-- 添加订单 Dialog -->
  <AddDialog
    :dialogVisible="isAddDialogVisible"
    @update:dialogVisible="isAddDialogVisible = $event"
  />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Plus } from "@element-plus/icons-vue"; // 图标
import OrderDrawer from "./components/detailDrawer.vue";
import EditDialog from "./components/editDialog.vue";
import AddDialog from "./components/addDialog.vue";
import { order_data } from "@/test/order"; // 示例数据
import Filter from "./components/filter.vue";
import dayjs from "dayjs"; // 导入 dayjs 库

// 控制 Drawer 和 Dialog 的显示与隐藏
const isDrawerVisible = ref(false);
const isEditDialogVisible = ref(false);
const isAddDialogVisible = ref(false);
const selectedRow = ref<Record<string, any> | undefined>(undefined);

// 订单数据
const tableData = ref(order_data);
const filteredData = ref([...tableData.value]);

// 订单状态列表
const orderStatusList = [
  "已创建",
  "未支付",
  "已支付",
  "已确认",
  "已观看",
  "已取消",
  "已退款",
];

// 筛选逻辑
const filterData = (filters: any) => {
  const { orderId, movieName, userId, cinemaName, status, orderTime } = filters;

  filteredData.value = tableData.value.filter((item) => {
    const isOrderTimeInRange = () => {
      if (!orderTime || orderTime.length !== 2) return true;
      const [start, end] = orderTime;
      const itemTime = dayjs(item.orderTime, "YYYY-MM-DD HH:mm:ss");
      return (
        itemTime.isAfter(dayjs(start, "YYYY-MM-DD HH:mm:ss")) &&
        itemTime.isBefore(dayjs(end, "YYYY-MM-DD HH:mm:ss"))
      );
    };

    return (
      (orderId ? item.orderId.includes(orderId) : true) &&
      (movieName ? item.movieName.includes(movieName) : true) &&
      (userId ? item.userId.includes(userId) : true) &&
      (cinemaName ? item.cinemaName.includes(cinemaName) : true) &&
      (status ? item.status === status : true) &&
      isOrderTimeInRange()
    );
  });
};

// 格式化时间
const formatDate = (date: string) => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};

// 状态颜色类型
const getStatusType = (status: string) => {
  switch (status) {
    case "已支付":
      return "success";
    case "已取消":
    case "未支付":
    case "已退款":
      return "danger";
    case "已确认":
    case "已观看":
      return "info";
    case "已创建":
      return "warning";
    default:
      return "default";
  }
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

// 详情操作
const handleDetail = (row: any) => {
  isDrawerVisible.value = true;
  selectedRow.value = row;
};

// 修改操作
const handleUpdata = (row: any) => {
  isEditDialogVisible.value = true;
  selectedRow.value = row;
};

// 删除操作
const handleDelete = (orderId: string) => {
  const index = tableData.value.findIndex((item) => item.orderId === orderId);
  if (index !== -1) {
    tableData.value.splice(index, 1);
    console.log(`订单 ${orderId} 已取消`);
    filterData({
      orderId: "",
      movieName: "",
      userId: "",
      aditoriumName: "",
      status: "",
      orderTime: [],
    });
  }
};

// 添加操作
const handleAdd = () => {
  isAddDialogVisible.value = true;
  selectedRow.value = undefined;
};

// 分页页码切换
const handlePageChange = (page: number) => {
  currentPage.value = page;
};
</script>

<style scoped>
#order-list {
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
