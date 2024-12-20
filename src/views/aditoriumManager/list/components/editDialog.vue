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
          v-model="form.isActive"
          active-text="启用"
          inactive-text="禁用"
        />
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

// 定义父组件传递的属性
const props = defineProps({
  dialogVisible: Boolean, // 父组件传递的 visible 属性
});

// 定义父组件传递的事件
const emit = defineEmits(["update:dialogVisible"]);

// 控制对话框显示
const dialogVisible = ref(props.dialogVisible);

// 监听 props.visible 的变化，确保同步
watch(
  () => props.dialogVisible,
  (newVal) => {
    dialogVisible.value = newVal;
  }
);

// 创建表单数据
const form = reactive({
  name: "", // 影厅名称
  isActive: true, // 启用状态，默认为启用
  address: "", // 地址
  creationDate: "", // 创建日期
});

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

// 监听 drawer 的变化并通知父组件
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
