<template>
  <div id="order-list">
    <!-- 添加订单按钮 -->
    <el-button type="primary" :icon="Plus" circle @click="showAddOrderDialog" />

    <!-- 订单数据表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <!-- 订单编号 -->
      <el-table-column
        fixed
        prop="id"
        label="订单编号"
        width="150"
        align="center"
      />
      <!-- 客户姓名 -->
      <el-table-column
        prop="customer"
        label="客户姓名"
        width="180"
        align="center"
      />
      <!-- 影片名称 -->
      <el-table-column
        prop="movie"
        label="影片名称"
        width="200"
        align="center"
      />
      <!-- 座位号 -->
      <el-table-column prop="seat" label="座位号" width="150" align="center" />
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
            <el-link type="danger" size="small" @click="deleteOrder(row.id)">
              取消
            </el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
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
import { ref } from "vue";
import { Plus } from "@element-plus/icons-vue"; // 图标
import OrderDrawer from "./components/detailDrawer.vue";
import EditOrderDialog from "./components/editDialog.vue";
import AddOrderDialog from "./components/addDialog.vue";
import { fetchOrderList, deleteOrderById, addOrder } from "@/api/index";

// 控制 Drawer 和 Dialog 的显示与隐藏
const isDrawerVisible = ref(false);
const isEditDialogVisible = ref(false);
const isAddDialogVisible = ref(false);
const selectedRow = ref<Record<string, any> | undefined>(undefined);

// 订单数据示例
const tableData = ref([
  {
    id: "ORD001",
    customer: "张三",
    movie: "阿凡达",
    seat: "A1",
    status: "已支付",
  },
  {
    id: "ORD002",
    customer: "李四",
    movie: "复仇者联盟",
    seat: "B3",
    status: "未支付",
  },
  {
    id: "ORD003",
    customer: "王五",
    movie: "星际穿越",
    seat: "C5",
    status: "已支付",
  },
]);

// 点击详情按钮的处理函数
const showOrderDetails = (row: any) => {
  // 展示 Drawer
  isDrawerVisible.value = true;
  selectedRow.value = row;
};

// 点击修改按钮的处理函数
const showEditOrderDialog = (row: any) => {
  isEditDialogVisible.value = true;
  selectedRow.value = row;
};

// 点击取消订单的处理函数
const deleteOrder = (id: string) => {
  const index = tableData.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    tableData.value.splice(index, 1); // 删除订单信息
    console.log(`订单 ${id} 已取消`);
  }
};

// 点击添加按钮的处理函数
const showAddOrderDialog = () => {
  isAddDialogVisible.value = true; // 打开添加订单对话框
  selectedRow.value = undefined; // 清空编辑内容以便添加新订单
};
</script>

<style scoped>
/* 影厅列表背景 */
#auditorium-list {
  padding: 20px;
  border-radius: 8px;
}

/* 表格样式 */
.el-table {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

/* 表格行的背景颜色 */
.el-table__row:hover {
  background-color: #f5f5f5;
}

/* 标签样式 */
.el-tag {
  font-size: 14px;
}

/* 按钮容器样式 */
.button-container {
  display: flex;
  justify-content: center;
  gap: 20px; /* 设置按钮之间的间距 */
}

/* 按钮样式 */
.el-link {
  transition: background-color 0.3s;
}

.el-link:hover {
  background-color: #f5f5f5;
}

.el-button {
  margin: 10px;
}
</style>
