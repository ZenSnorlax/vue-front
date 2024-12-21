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
import { defineProps, defineEmits, ref, reactive, watch } from "vue";
import { updateAuditorium } from "@/api/index";

// 定义父组件传递的属性
// 定义父组件传递的属性
const props = defineProps({
  dialogVisible: { type: Boolean, default: false },
  row: {
    type: Object,
    default: null,
  },
});

// 定义父组件传递的事件
const emit = defineEmits(["update:dialogVisible"]);

// 控制对话框显示
const dialogVisible = ref(props.dialogVisible);
const form = ref(props.row);

// 监听 props.dialogVisible 的变化，确保同步
watch(
  () => props.dialogVisible,
  (newVal) => {
    dialogVisible.value = newVal;
  }
);

watch(
  () => props.row,
  (newVal) => {
    form.value = newVal;
  }
);

// 关闭对话框
const closeDialog = () => {
  dialogVisible.value = false;
  emit("update:dialogVisible", false); // 发出事件通知父组件关闭对话框
};

// 确认按钮点击处理
const handleConfirm = () => {
  console.log("Form data:", form);
  // 这里可以处理表单数据，提交API请求等
  closeDialog(); // 关闭对话框
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
