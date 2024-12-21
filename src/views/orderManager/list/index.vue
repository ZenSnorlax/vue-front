<template>
  <div id="order-list">
    <!-- 筛选和添加订单 -->
    <div class="toolbar">
      <Filter></Filter>
      <el-button
        type="primary"
        :icon="Plus"
        circle
        @click="showAddOrderDialog"
      />
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
      <!-- 顾客编号 -->
      <el-table-column
        prop="customerId"
        label="顾客编号"
        width="150"
        align="center"
      />
      <!-- 影厅名称 -->
      <el-table-column
        prop="auditoriumName"
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
          <el-tag
            :type="row.status === '已支付' ? 'success' : 'danger'"
            disable-transitions
            >{{ row.status }}</el-tag
          >
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
            <el-link type="primary" size="small" @click="showOrderDetails(row)">
              详情
            </el-link>
            <el-link
              type="success"
              size="small"
              @click="showEditOrderDialog(row)"
            >
              修改
            </el-link>
            <el-link
              type="danger"
              size="small"
              @click="deleteOrder(row.orderId)"
            >
              取消
            </el-link>
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
  <EditOrderDialog
    :dialogVisible="isEditDialogVisible"
    :row="selectedRow"
    @update:dialogVisible="isEditDialogVisible = $event"
  />

  <!-- 添加订单 Dialog -->
  <AddOrderDialog
    :dialogVisible="isAddDialogVisible"
    @update:dialogVisible="isAddDialogVisible = $event"
  />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Plus } from "@element-plus/icons-vue"; // 图标
import OrderDrawer from "./components/detailDrawer.vue";
import EditOrderDialog from "./components/editDialog.vue";
import AddOrderDialog from "./components/addDialog.vue";
import { table_data } from "@/test/order";
import Filter from "./components/filter.vue";
// 控制 Drawer 和 Dialog 的显示与隐藏
const isDrawerVisible = ref(false);
const isEditDialogVisible = ref(false);
const isAddDialogVisible = ref(false);
const selectedRow = ref<Record<string, any> | undefined>(undefined);

// 订单数据示例
const tableData = ref(table_data);

// 筛选逻辑
const searchQuery = ref("");
const filteredData = ref([...tableData.value]);

const filterData = () => {
  const query = searchQuery.value.toLowerCase();
  filteredData.value = tableData.value.filter(
    (item) =>
      item.orderId.toLowerCase().includes(query) ||
      item.movieName.toLowerCase().includes(query)
  );
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

// 点击详情按钮的处理函数
const showOrderDetails = (row: any) => {
  isDrawerVisible.value = true;
  selectedRow.value = row;
};

// 点击修改按钮的处理函数
const showEditOrderDialog = (row: any) => {
  isEditDialogVisible.value = true;
  selectedRow.value = row;
};

// 点击取消订单的处理函数
const deleteOrder = (orderId: string) => {
  const index = tableData.value.findIndex((item) => item.orderId === orderId);
  if (index !== -1) {
    tableData.value.splice(index, 1); // 删除订单信息
    filterData(); // 更新筛选后的数据
    console.log(`订单 ${orderId} 已取消`);
  }
};

// 点击添加按钮的处理函数
const showAddOrderDialog = () => {
  isAddDialogVisible.value = true; // 打开添加订单对话框
  selectedRow.value = undefined; // 清空编辑内容以便添加新订单
};

// 处理页码变化
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

.el-link {
  transition: background-color 0.3s;
}

.el-link:hover {
  background-color: #f5f5f5;
}

.el-button {
  margin: 10px;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}
</style>
