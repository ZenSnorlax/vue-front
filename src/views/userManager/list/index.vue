<template>
  <div id="user-list">
    <!-- 筛选和添加用户 -->
    <div class="toolbar">
      <Filter @filter-con="filterData"></Filter>
      <el-button type="primary" :icon="Plus" circle @click="handleAdd" />
    </div>

    <!-- 用户数据表格 -->
    <el-table :data="paginatedData" style="width: 100%" border>
      <!-- 用户编号 -->
      <el-table-column
        prop="userId"
        label="用户编号"
        width="150"
        align="center"
      />
      <!-- 用户姓名 -->
      <el-table-column
        prop="userName"
        label="用户姓名"
        width="200"
        align="center"
      />
      <!-- 用户邮箱 -->
      <el-table-column
        prop="userEmail"
        label="邮箱"
        width="250"
        align="center"
      />
      <!-- 用户手机号码 -->
      <el-table-column
        prop="userPhone"
        label="手机号码"
        width="200"
        align="center"
      />
      <!-- 注册时间 -->
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
      <!-- 用户状态 -->
      <el-table-column
        prop="status"
        label="用户状态"
        width="150"
        align="center"
      >
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
import { ref, computed } from "vue";
import { Plus } from "@element-plus/icons-vue"; // 图标
import UserDrawer from "./components/detailDrawer.vue";
import EditDialog from "./components/editDialog.vue";
import AddDialog from "./components/addDialog.vue";
import { user_data } from "@/test/user"; // 示例数据
import Filter from "./components/filter.vue";
import dayjs from "dayjs"; // 导入 dayjs 库

// 控制 Drawer 和 Dialog 的显示与隐藏
const isDrawerVisible = ref(false);
const isEditDialogVisible = ref(false);
const isAddDialogVisible = ref(false);
const selectedRow = ref<Record<string, any> | undefined>(undefined);

// 用户数据
const tableData = ref(user_data);
const filteredData = ref([...tableData.value]);

// 筛选逻辑
const filterData = (filters: any) => {
  const { userId, userName, userEmail, status, registrationTime, userPhone } =
    filters;

  filteredData.value = tableData.value.filter((item) => {
    const isRegistrationTimeInRange = () => {
      if (!registrationTime || registrationTime.length !== 2) return true;
      const [start, end] = registrationTime;
      const itemTime = dayjs(item.registrationTime, "YYYY-MM-DD HH:mm:ss");
      return (
        itemTime.isAfter(dayjs(start, "YYYY-MM-DD HH:mm:ss")) &&
        itemTime.isBefore(dayjs(end, "YYYY-MM-DD HH:mm:ss"))
      );
    };

    return (
      (userId ? item.userId.includes(userId) : true) &&
      (userName ? item.userName.includes(userName) : true) &&
      (userEmail ? item.userEmail.includes(userEmail) : true) &&
      (userPhone ? item.userPhone.includes(userPhone) : true) &&
      (status ? item.status === status : true) &&
      isRegistrationTimeInRange()
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
    case "活跃":
      return "success";
    case "禁用":
      return "danger";
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
const handleDelete = (userId: string) => {
  const index = tableData.value.findIndex((item) => item.userId === userId);
  if (index !== -1) {
    tableData.value.splice(index, 1);
    console.log(`用户 ${userId} 已删除`);
    filterData({
      userId: "",
      userName: "",
      userEmail: "",
      status: "",
      registrationTime: [],
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
