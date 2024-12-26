<template>
  <div id="auditorium-list">
    <!-- 表格头部，工具栏 -->
    <div class="toolbar">
      <el-button
        type="primary"
        :icon="Plus"
        circle
        @click="handleAdd"
        class="add-button"
      />
    </div>

    <!-- 影厅数据表格 -->
    <el-table :data="tableData" style="width: 100%" border :loading="loading">
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
import { ref, onMounted, watch } from "vue";
import { Plus } from "@element-plus/icons-vue"; // 图标
import { ElMessageBox, ElMessage } from "element-plus"; // 消息与对话框
import EditDialog from "./components/editDialog.vue";
import AddDialog from "./components/addDialog.vue";
import { getCinemas, deleteCinema } from "@/api/cinema";

// 控制 Dialog 的显示与隐藏
const isEditDialogVisible = ref(false);
const isAddDialogVisible = ref(false);
const selectedRow = ref<Record<string, any> | undefined>(undefined);

interface Cinema {
  id: string;
  name: string;
  seats: number;
  manager: string;
  status: string;
}

const tableData = ref<Cinema[]>([]);
const loading = ref(false);

// 加载影厅数据
const fetchCinemas = async () => {
  loading.value = true;
  try {
    const response = await getCinemas();
    tableData.value = response.data;
  } catch (error) {
    console.error("加载影厅数据失败：", error);
  } finally {
    loading.value = false;
  }
};

// 点击编辑按钮的处理函数
const handleUpdata = (row: any) => {
  isEditDialogVisible.value = true;
  selectedRow.value = row;
};

// 点击删除的处理函数
const handleDelete = async (id: string) => {
  try {
    // 显示确认对话框
    await ElMessageBox.confirm("此操作将永久删除该影厅, 是否继续？", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });

    // 用户确认后删除影厅
    const index = tableData.value.findIndex((item) => item.id === id);
    if (index !== -1) {
      tableData.value.splice(index, 1); // 删除影厅信息
      const response = await deleteCinema(id);
      if (response.data.code == 200) {
        ElMessage.success(response.data.msg);
        fetchCinemas();
      } else if (response.data.code == 500) {
        ElMessage.error(response.data.msg);
      }
    }
  } catch (error) {
    // 用户取消操作或发生错误
    ElMessage.info("已取消删除");
  }
};

// 点击添加按钮的处理函数
const handleAdd = () => {
  isAddDialogVisible.value = true;
  selectedRow.value = undefined; // 清空编辑内容以便添加新影厅
};

// 监听 isEditDialogVisible，从 true 变为 false 时触发
watch(
  () => isEditDialogVisible.value,
  (newValue, oldValue) => {
    if (oldValue === true && newValue === false) {
      fetchCinemas(); // 重新加载影厅数据
    }
  }
);
watch(
  () => isAddDialogVisible.value,
  (newValue, oldValue) => {
    if (oldValue === true && newValue === false) {
      fetchCinemas(); // 重新加载影厅数据
    }
  }
);

// 页面加载时调用
onMounted(() => {
  fetchCinemas(); // 加载影厅数据
});
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.add-button {
  margin-right: 0;
}
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
</style>
