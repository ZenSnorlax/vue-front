<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Plus } from "@element-plus/icons-vue"; // 图标
import EditDialog from "./components/editDialog.vue";
import AddDialog from "./components/addDialog.vue";
import { getCinemas, deleteCinema } from "@/api/cinema";

// 控制 Dialog 的显示与隐藏
const isEditDialogVisible = ref(false);
const isAddDialogVisible = ref(false);
const selectedRow = ref<Record<string, any> | undefined>(undefined);

// 影厅数据
const tableData = ref([]); // 初始化为空数组
const loading = ref(false); // 添加加载状态

// 加载影厅数据
const fetchCinemas = async () => {
  loading.value = true;
  try {
    const response = await getCinemas();
    tableData.value = response.data; // 假设接口返回数据结构为 { data: [...] }
  } catch (error) {
    console.error("加载影厅数据失败：", error);
    // 在这里添加错误提示，如 ElMessage
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
  const index = tableData.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    tableData.value.splice(index, 1); // 删除影厅信息
    await deleteCinema(id);
    console.log(`影厅 ${id} 已删除`);
  }
};

// 点击添加按钮的处理函数
const handleAdd = () => {
  isAddDialogVisible.value = true; // 打开添加影厅对话框
  selectedRow.value = undefined; // 清空编辑内容以便添加新影厅
};

// 页面加载时调用
onMounted(() => {
  fetchCinemas(); // 加载影厅数据
});
</script>

<template>
  <div id="auditorium-list">
    <!-- 表格头部，包含添加按钮 -->
    <div class="toolbar">
      <el-button type="primary" :icon="Plus" circle @click="handleAdd" />
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
