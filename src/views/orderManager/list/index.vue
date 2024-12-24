<template>
  <div id="order-list">
    <!-- 筛选和添加订单 -->
    <div class="toolbar">
      <Filter @filter-con="handleFilter" />
      <el-button type="primary" :icon="Plus" circle @click="handleAdd" />
    </div>

    <!-- 订单数据表格 -->
    <el-table :data="tableData" style="width: 100%" border>
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
          <span>{{ row.orderTime }}</span>
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
            <el-link type="primary" size="small" @click="handleDetail(row)"
              >详情</el-link
            >
            <el-link type="success" size="small" @click="handleUpdate(row)"
              >修改</el-link
            >
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
        v-model:current-page="pagination.page"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        layout="prev, pager, next"
        @current-change="handlePageChange"
      />
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
      @refresh="fetchData"
    />

    <!-- 添加订单 Dialog -->
    <AddDialog
      :dialogVisible="isAddDialogVisible"
      @update:dialogVisible="isAddDialogVisible = $event"
      @refresh="fetchData"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Plus } from "@element-plus/icons-vue";
import OrderDrawer from "./components/detailDrawer.vue";
import EditDialog from "./components/editDialog.vue";
import AddDialog from "./components/addDialog.vue";
import Filter from "./components/filter.vue";
import { getOrdersPaginated, deleteOrder } from "@/api/order";

// 定义表格数据类型
interface Order {
  orderId: string;
  userId: string;
  cinemaName: string;
  movieName: string;
  status: string;
  orderTime: string;
}

// 控制 Drawer 和 Dialog 的显示与隐藏
const isDrawerVisible = ref(false);
const isEditDialogVisible = ref(false);
const isAddDialogVisible = ref(false);
const selectedRow = ref<Order | undefined>(undefined);

// 表格数据
const tableData = ref<Order[]>([]);

// 分页数据
const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 0,
});

// 筛选条件
const filters = ref();

const getStatusType = (status: string): string => {
  switch (status) {
    case "未支付":
      return "success";
    case "已支付":
      return "info";
    case "已确认":
      return "warning";
    case "已观看":
      return "success";
    case "已取消":
      return "danger";
    case "已退款":
      return "danger";
    default:
      return "warning";
  }
};

// 获取数据
const fetchData = async (page = pagination.value.page) => {
  try {
    const response = await getOrdersPaginated({
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

// 删除操作
const handleDelete = async (orderId: string) => {
  try {
    await deleteOrder(orderId);
  } catch (error) {
    console.error(`删除订单 ${orderId} 失败:`, error);
  }
};

// 详情操作
const handleDetail = (row: Order) => {
  isDrawerVisible.value = true;
  selectedRow.value = row;
};

// 修改操作
const handleUpdate = (row: Order) => {
  isEditDialogVisible.value = true;
  selectedRow.value = row;
};

// 添加操作
const handleAdd = () => {
  isAddDialogVisible.value = true;
  selectedRow.value = undefined;
};

onMounted(() => {
  fetchData();
});
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
