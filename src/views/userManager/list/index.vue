<template>
  <div id="user-list">
    <!-- 筛选和添加用户 -->
    <div class="toolbar">
      <Filter @filter-con="handleFilter" />
      <el-button type="primary" :icon="Plus" circle @click="handleAdd" />
    </div>

    <!-- 用户数据表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column
        prop="userId"
        label="用户编号"
        width="150"
        align="center"
      />
      <el-table-column
        prop="userName"
        label="用户姓名"
        width="200"
        align="center"
      />
      <el-table-column
        prop="userEmail"
        label="邮箱"
        width="250"
        align="center"
      />
      <el-table-column
        prop="userPhone"
        label="手机号码"
        width="200"
        align="center"
      />
      <el-table-column
        prop="registrationTime"
        label="注册时间"
        width="200"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ formatDate(row.registrationTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="用户状态"
        width="150"
        align="center"
      >
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
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
            <el-link type="success" size="small" @click="handleEdit(row)"
              >编辑</el-link
            >
            <el-link
              type="danger"
              size="small"
              @click="handleDelete(row.userId)"
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
        :total="totalRecords"
        layout="prev, pager, next"
        @current-change="handlePageChange"
      />
    </div>
  </div>

  <!-- 用户详情 Drawer -->
  <UserDrawer
    :drawerVisible="isDrawerVisible"
    :row="selectedRow"
    @update:drawerVisible="isDrawerVisible = $event"
  />

  <!-- 编辑用户 Dialog -->
  <EditDialog
    :dialogVisible="isEditDialogVisible"
    :row="selectedRow"
    @update:dialogVisible="isEditDialogVisible = $event"
  />

  <!-- 添加用户 Dialog -->
  <AddDialog
    :dialogVisible="isAddDialogVisible"
    @update:dialogVisible="isAddDialogVisible = $event"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Plus } from "@element-plus/icons-vue";
import UserDrawer from "./components/detailDrawer.vue";
import EditDialog from "./components/editDialog.vue";
import AddDialog from "./components/addDialog.vue";
import Filter from "./components/filter.vue";
import dayjs from "dayjs";
import { getUsersPaginated, deleteUser } from "@/api/user";

// 控制 Drawer 和 Dialog 的显示与隐藏
const isDrawerVisible = ref(false);
const isEditDialogVisible = ref(false);
const isAddDialogVisible = ref(false);
const selectedRow = ref<Record<string, any> | undefined>(undefined);

// 表格数据与分页
const tableData = ref([]);
const totalRecords = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const filters = ref({});

// 格式化时间
const formatDate = (date: string) => dayjs(date).format("YYYY-MM-DD HH:mm:ss");

// 状态颜色类型
const getStatusType = (status: string) => {
  switch (status) {
    case "活跃":
      return "success";
    case "禁用":
      return "danger";
  }
};

// 获取分页数据
const fetchPaginatedData = async () => {
  try {
    const response = await getUsersPaginated({
      pageSize: pageSize.value,
      page: currentPage.value,
      ...filters.value, // 传递筛选参数
    });

    const { total, data } = response.data.contents;
    totalRecords.value = total; // 更新总记录数
    tableData.value = data; // 更新表格数据
  } catch (error) {
    console.error("获取分页数据失败:", error);
  }
};

// 筛选逻辑
const handleFilter = (newFilters: Record<string, any>) => {
  filters.value = newFilters;
  currentPage.value = 1; // 筛选后回到第一页
  fetchPaginatedData();
};

// 分页切换
const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchPaginatedData();
};

// 查看详情操作
const handleDetail = (row: any) => {
  isDrawerVisible.value = true;
  selectedRow.value = row;
};

// 编辑操作
const handleEdit = (row: any) => {
  isEditDialogVisible.value = true;
  selectedRow.value = row;
};

// 删除操作
const handleDelete = async (userId: string) => {
  // 调用删除 API，重新加载数据
  await deleteUser(userId);
  console.log(`用户 ${userId} 已删除`);
  fetchPaginatedData();
};

// 添加操作
const handleAdd = () => {
  isAddDialogVisible.value = true;
  selectedRow.value = undefined;
};

// 初始化数据
onMounted(() => {
  fetchPaginatedData();
});
</script>

<style scoped>
#user-list {
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
