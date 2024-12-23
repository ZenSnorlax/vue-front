<template>
  <el-dialog v-model="dialogVisible" title="增加用户" width="500px">
    <el-form :model="form" label-width="100px" ref="formRef">
      <!-- 用户名称 -->
      <el-form-item label="用户名称" prop="userName">
        <el-input v-model="form.userName" placeholder="请输入用户名称" />
      </el-form-item>

      <!-- 邮箱 -->
      <el-form-item label="邮箱" prop="userEmail">
        <el-input v-model="form.userEmail" placeholder="请输入邮箱" />
      </el-form-item>
      <!-- 手机号码 -->
      <el-form-item label="手机号" prop="userPhone">
        <el-input v-model="form.userPhone" placeholder="请输入手机号" />
      </el-form-item>

      <!-- 用户状态 -->
      <el-form-item label="用户状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择用户状态">
          <el-option label="活跃" value="活跃" />
          <el-option label="禁用" value="禁用" />
        </el-select>
      </el-form-item>

      <!-- 注册时间 -->
      <el-form-item label="注册时间" prop="registrationTime">
        <el-date-picker
          v-model="form.registrationTime"
          type="datetime"
          placeholder="选择注册时间"
        />
      </el-form-item>
    </el-form>

    <!-- 对话框底部 -->
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
import { createUser } from "@/api/user";

// 定义父组件传递的属性
const props = defineProps({
  dialogVisible: Boolean, // 父组件传递的 visible 属性
});

// 定义父组件传递的事件
const emit = defineEmits(["update:dialogVisible"]);

// 控制对话框显示
const dialogVisible = ref(props.dialogVisible);

// 监听 props.dialogVisible 的变化，确保同步
watch(
  () => props.dialogVisible,
  (newVal) => {
    dialogVisible.value = newVal;
  }
);

// 创建表单数据
const form = ref({
  userName: "",
  status: "", // 默认状态为空，用户选择时才会设置
  registrationTime: "",
  userEmail: "",
  userPhone: "",
});

// 关闭对话框
const closeDialog = () => {
  dialogVisible.value = false;
  emit("update:dialogVisible", false); // 发出事件通知父组件关闭对话框
};

// 确认按钮点击处理
const handleConfirm = async () => {
  await createUser(form.value);
  console.log(form.value); // 提交数据
  closeDialog();
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
