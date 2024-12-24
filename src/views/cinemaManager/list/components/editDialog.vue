<template>
  <el-dialog v-model="dialogVisible" title="编辑影厅信息" width="500">
    <el-form :model="form" label-width="100px">
      <!-- 影厅名称 -->
      <el-form-item label="更改影厅名称">
        <el-input v-model="form.name" placeholder="请输入影厅名称" />
      </el-form-item>

      <!-- 启用状态 -->
      <el-form-item label="启用状态">
        <el-switch
          v-model="form.status"
          active-text="启用"
          inactive-text="禁用"
          active-value="启用"
          inactive-value="禁用"
        />
      </el-form-item>

      <!-- 座位总数 -->
      <el-form-item label="座位总数">
        <el-input
          v-model="form.seats"
          type="number"
          placeholder="请输入座位总数"
        />
      </el-form-item>

      <!-- 负责人 -->
      <el-form-item label="负责人">
        <el-input v-model="form.manager" placeholder="请输入影厅负责人" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from "vue";
import { updateCinema } from "@/api/cinema";

// 定义 CinemaData 类型
interface CinemaData {
  id: string; // id 为 string 类型
  name: string;
  status: string; // 可选 string 或 boolean，具体根据业务需求
  manager: string;
  seats: number;
}

// 定义父组件传递的属性
const props = defineProps({
  dialogVisible: { type: Boolean, default: false },
  row: {
    type: Object as () => Partial<CinemaData>,
    default: () => ({}),
  },
});

// 定义父组件传递的事件
const emit = defineEmits(["update:dialogVisible"]);

// 控制对话框显示
const dialogVisible = ref(props.dialogVisible);

// 初始化 form 数据，确保字段完整
const form = ref<CinemaData>({
  id: String(props.row?.id || ""), // 确保 id 为 string 类型
  name: props.row?.name || "",
  status: props.row?.status || "禁用",
  manager: props.row?.manager || "",
  seats: Number(props.row?.seats) || 0, // 确保 seats 为 number 类型
});

// 监听 props.dialogVisible 的变化，确保同步
watch(
  () => props.dialogVisible,
  (newVal) => {
    dialogVisible.value = newVal;
  }
);

// 监听 props.row 的变化，更新 `form` 数据
watch(
  () => props.row,
  (newVal) => {
    form.value = {
      id: String(newVal?.id || ""), // 转换为 string
      name: newVal?.name || "",
      status: newVal?.status || "禁用",
      manager: newVal?.manager || "",
      seats: Number(newVal?.seats) || 0,
    };
  }
);

// 关闭对话框
const closeDialog = () => {
  dialogVisible.value = false;
  emit("update:dialogVisible", false); // 发出事件通知父组件关闭对话框
};

// 确认按钮点击处理
const handleConfirm = async () => {
  const cinemaData: CinemaData = { ...form.value }; // 确保类型一致
  closeDialog();
  await updateCinema(cinemaData.id, cinemaData);
};

// 监听 dialogVisible 的变化并通知父组件
watch(dialogVisible, (newVal) => {
  emit("update:dialogVisible", newVal);
});
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
