<template>
  <div id="schedule-list">
    <!-- 筛选和添加放映计划 -->
    <div class="toolbar">
      <Filter @filter-con="handleFilter"></Filter>
      <el-button type="primary" :icon="Plus" circle @click="handleAdd" />
    </div>

    <!-- 放映计划数据表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <!-- 电影名称 -->
      <el-table-column
        prop="movieName"
        label="电影名称"
        width="200"
        align="center"
      />
      <!-- 影厅名称 -->
      <el-table-column
        prop="cinemaName"
        label="影厅名称"
        width="150"
        align="center"
      />
      <!-- 放映开始时间 -->
      <el-table-column
        prop="startTime"
        label="开始时间"
        width="250"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ formatDate(row.startTime) }}</span>
        </template>
      </el-table-column>
      <!-- 放映结束时间 -->
      <el-table-column
        prop="endTime"
        label="结束时间"
        width="250"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ formatDate(row.endTime) }}</span>
        </template>
      </el-table-column>
      <!-- 放映状态 -->
      <el-table-column prop="status" label="状态" width="150" align="center">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)" disable-transitions>
            {{ row.status }}
          </el-tag>
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
            <el-link type="success" size="small" @click="handleEdit(row)">
              编辑
            </el-link>
            <el-link type="danger" size="small" @click="handleDelete(row.id)"
              >删除</el-link
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
  </div>

  <!-- 编辑放映计划 Dialog -->
  <EditDialog
    :dialogVisible="isEditDialogVisible"
    :row="selectedRow"
    @update:dialogVisible="isEditDialogVisible = $event"
  />

  <!-- 添加放映计划 Dialog -->
  <AddDialog
    :dialogVisible="isAddDialogVisible"
    @update:dialogVisible="isAddDialogVisible = $event"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Plus } from "@element-plus/icons-vue"; // 图标
import EditDialog from "./components/editDialog.vue";
import AddDialog from "./components/addDialog.vue";
import Filter from "./components/filter.vue";
import dayjs from "dayjs"; // 导入 dayjs 库
import isBetween from "dayjs/plugin/isBetween";
import { deleteScreen, getScreensPaginated } from "@/api/screen";
// 注册插件
dayjs.extend(isBetween);

// 定义表格数据类型
interface Order {
  orderId: string;
  userId: string;
  cinemaName: string;
  movieName: string;
  status: string;
  orderTime: string;
}

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

// 控制 Drawer 和 Dialog 的显示与隐藏
const isEditDialogVisible = ref(false);
const isAddDialogVisible = ref(false);
const selectedRow = ref<Record<string, any> | undefined>(undefined);

// 放映计划数据

// 格式化时间
const formatDate = (date: string) => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};

// 状态颜色类型
const getStatusType = (status: string) => {
  switch (status) {
    case "正在放映":
      return "success"; // 正在上映：绿色
    case "已放映":
      return "info"; // 已放映：蓝色
    case "未放映":
      return "danger"; // 已结束：红色
    default:
      return "default"; // 默认状态颜色
  }
};

/// 获取数据
const fetchData = async (page = pagination.value.page) => {
  try {
    const response = await getScreensPaginated({
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

// 编辑操作
const handleEdit = (row: any) => {
  isEditDialogVisible.value = true;
  selectedRow.value = row;
};

// 删除操作
const handleDelete = async (id: string) => {
  await deleteScreen(id);
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
#schedule-list {
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
