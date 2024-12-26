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
        prop="registerTime"
        label="注册时间"
        width="200"
        align="center"
      >
        <template #default="{ row }">
          <span>{{ formatDate(row.registerTime) }}</span>
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
            <el-link type="primary" size="small" @click="handleDetail(row)">
              详情
            </el-link>
            <el-link type="success" size="small" @click="handleEdit(row)">
              编辑
            </el-link>
            <el-link
              type="danger"
              size="small"
              @click="handleDelete(row.userId)"
            >
              删除
            </el-link>
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
      @refresh="fetchData"
    />

    <!-- 添加用户 Dialog -->
    <AddDialog
      :dialogVisible="isAddDialogVisible"
      @update:dialogVisible="isAddDialogVisible = $event"
      @refresh="fetchData"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { Plus } from "@element-plus/icons-vue";
import UserDrawer from "./components/detailDrawer.vue";
import EditDialog from "./components/editDialog.vue";
import AddDialog from "./components/addDialog.vue";
import Filter from "./components/filter.vue";
import { getUsersPaginated, deleteUser } from "@/api/user";
import dayjs from "dayjs";
import { ElMessage, ElMessageBox } from "element-plus";

// 控制 Drawer 和 Dialog 的显示与隐藏
const isDrawerVisible = ref(false);
const isEditDialogVisible = ref(false);
const isAddDialogVisible = ref(false);
const selectedRow = ref<Record<string, any> | undefined>(undefined);

// 表格数据与分页
const tableData = ref([]);
const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 0,
});

// 筛选条件
const filters = ref();

// 格式化时间
const formatDate = (date: string) => dayjs(date).format("YYYY-MM-DD HH:mm:ss");

// 状态颜色类型
const getStatusType = (status: string) => {
  switch (status) {
    case "活跃":
      return "success";
    case "禁用":
      return "danger";
    default:
      return "info";
  }
};

// 获取用户数据
const fetchData = async (page = pagination.value.page) => {
  try {
    const response = await getUsersPaginated({
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

// 删除用户
const handleDelete = async (userId: string) => {
  try {
    await ElMessageBox.confirm("此操作将永久删除用户, 是否继续？", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });
    await deleteUser(userId);
    ElMessage.success("用户删除成功！");
    fetchData();
  } catch (error) {
    ElMessage.info("操作取消或失败！");
  }
};

// 查看详情
const handleDetail = (row: any) => {
  isDrawerVisible.value = true;
  selectedRow.value = row;
};

// 编辑用户
const handleEdit = (row: any) => {
  isEditDialogVisible.value = true;
  selectedRow.value = row;
};

// 添加用户
const handleAdd = () => {
  isAddDialogVisible.value = true;
  selectedRow.value = undefined;
};

// 数据监听和初始化
watch(
  () => isEditDialogVisible.value,
  (newValue, oldValue) => {
    if (oldValue === true && newValue === false) {
      fetchData();
    }
  }
);

watch(
  () => isAddDialogVisible.value,
  (newValue, oldValue) => {
    if (oldValue === true && newValue === false) {
      fetchData();
    }
  }
);

onMounted(() => {
  fetchData();
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
