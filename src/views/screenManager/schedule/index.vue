<template>
  <div id="schedule-list">
    <!-- 筛选和添加放映计划 -->
    <div class="toolbar">
      <Filter @filter-con="filterData"></Filter>
      <el-button type="primary" :icon="Plus" circle @click="handleAdd" />
    </div>

    <!-- 放映计划数据表格 -->
    <el-table :data="paginatedData" style="width: 100%" border>
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
            <el-link
              type="danger"
              size="small"
              @click="handleDelete(row.scheduleId)"
              >删除</el-link
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
import { ref, computed } from "vue";
import { Plus } from "@element-plus/icons-vue"; // 图标
import EditDialog from "./components/editDialog.vue";
import AddDialog from "./components/addDialog.vue";
import { schedule_data } from "@/test/schedule"; // 示例数据
import Filter from "./components/filter.vue";
import dayjs from "dayjs"; // 导入 dayjs 库
import isBetween from "dayjs/plugin/isBetween";
// 注册插件
dayjs.extend(isBetween);
// 控制 Drawer 和 Dialog 的显示与隐藏
const isEditDialogVisible = ref(false);
const isAddDialogVisible = ref(false);
const selectedRow = ref<Record<string, any> | undefined>(undefined);

// 放映计划数据
const tableData = ref(schedule_data);
const filteredData = ref([...tableData.value]);

// 筛选逻辑
const filterData = (filters: any) => {
  const { scheduleId, movieName, cinemaName, status, screeningTime } = filters;

  filteredData.value = tableData.value.filter((item) => {
    const isShowTimeInRange = () => {
      // 确保 screeningTime 是一个包含两个时间的数组
      const [startTime, endTime] = screeningTime || [];

      // 如果没有选择时间范围，则跳过时间筛选
      if (!startTime || !endTime) return true;

      // 将 item 的开始时间和结束时间转换为 dayjs 对象
      const itemStartTime = dayjs(item.startTime); // item.startTime 转换为 dayjs 对象
      const itemEndTime = dayjs(item.endTime); // item.endTime 转换为 dayjs 对象

      // 如果 itemStartTime 或 itemEndTime 不是有效的 dayjs 对象，返回 false
      if (!itemStartTime.isValid() || !itemEndTime.isValid()) {
        return false;
      }

      // 将筛选范围的开始和结束时间转换为 dayjs 对象
      const filterStartTime = dayjs(startTime);
      const filterEndTime = dayjs(endTime);

      // 检查 item 的开始时间是否在筛选范围内
      return itemStartTime.isBetween(
        filterStartTime,
        filterEndTime,
        null,
        "[]"
      );
    };

    return (
      (scheduleId ? item.scheduleId.includes(scheduleId) : true) &&
      (movieName ? item.movieName.includes(movieName) : true) &&
      (cinemaName ? item.cinemaName.includes(cinemaName) : true) &&
      (status ? item.status === status : true) &&
      isShowTimeInRange() // 应用时间筛选
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

// 分页逻辑
const currentPage = ref(1);
const pageSize = ref(10);

// 计算当前页的数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredData.value.slice(start, end);
});

// 编辑操作
const handleEdit = (row: any) => {
  isEditDialogVisible.value = true;
  selectedRow.value = row;
};

// 删除操作
const handleDelete = (scheduleId: string) => {
  const index = tableData.value.findIndex(
    (item) => item.scheduleId === scheduleId
  );
  if (index !== -1) {
    tableData.value.splice(index, 1);
    console.log(`放映计划 ${scheduleId} 已删除`);
    filterData({
      scheduleId: "",
      movieName: "",
      auditorium: "",
      status: "",
      startTime: "",
      endTime: "",
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
