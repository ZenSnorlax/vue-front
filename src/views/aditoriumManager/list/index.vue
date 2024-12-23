<template>
  <div id="auditorium-list">
    <!-- 表格头部，包含添加按钮 -->
    <div class="toolbar">
      <el-button type="primary" :icon="Plus" circle @click="handleAdd" />
    </div>

    <!-- 影厅数据表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <!-- 影厅编号 -->
      <el-table-column
        fixed
        prop="id"
        label="影厅编号"
        width="150"
        align="center"
      />
      <!-- 影厅名称 -->
      <el-table-column
        prop="name"
        label="影厅名称"
        width="180"
        align="center"
      />
      <!-- 座位总数 -->
      <el-table-column
        prop="seats"
        label="座位总数"
        width="150"
        align="center"
      />
      <!-- 影厅负责人 -->
      <el-table-column
        prop="manager"
        label="影厅负责人"
        width="150"
        align="center"
      />
      <!-- 启用状态 -->
      <el-table-column
        prop="status"
        label="启用状态"
        width="150"
        align="center"
      >
        <template #default="{ row }">
          <el-tag
            :type="row.status === '启用' ? 'success' : 'danger'"
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
            <el-link type="success" size="small" @click="handleUpdata(row)">
              编辑
            </el-link>
            <el-link type="danger" size="small" @click="handleDelete(row.id)">
              删除
            </el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 编辑影厅 Dialog -->
  <EditDialog
    :dialogVisible="isEditDialogVisible"
    :row="selectedRow"
    @update:dialogVisible="isEditDialogVisible = $event"
  />

  <!-- 添加影厅 Dialog -->
  <AddDialog
    :dialogVisible="isAddDialogVisible"
    @update:dialogVisible="isAddDialogVisible = $event"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Plus } from "@element-plus/icons-vue"; // 图标
import { table_data } from "@/test/aditorium";
import EditDialog from "./components/editDialog.vue";
import AddDialog from "./components/addDialog.vue";

// 控制 Drawer 和 Dialog 的显示与隐藏
const isEditDialogVisible = ref(false);
const isAddDialogVisible = ref(false);
const selectedRow = ref<Record<string, any> | undefined>(undefined);

// 影厅数据示例
const tableData = ref(table_data);

// 点击编辑按钮的处理函数
const handleUpdata = (row: any) => {
  isEditDialogVisible.value = true;
  selectedRow.value = row;
};

// 点击删除的处理函数
const handleDelete = (id: string) => {
  const index = tableData.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    tableData.value.splice(index, 1); // 删除影厅信息
    console.log(`影厅 ${id} 已删除`);
  }
};

// 点击添加按钮的处理函数
const handleAdd = () => {
  isAddDialogVisible.value = true; // 打开添加影厅对话框
  selectedRow.value = undefined; // 清空编辑内容以便添加新影厅
};
</script>

<style scoped>
/* 影厅列表背景 */
#auditorium-list {
  padding: 20px;
  border-radius: 8px;
}

/* 工具栏样式 */
.toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
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
