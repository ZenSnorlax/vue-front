<template>
  <el-dialog v-model="dialogVisible" title="添加放映" width="500px">
    <el-form :model="form" label-width="100px" ref="formRef">
      <!-- 电影名称 -->
      <el-form-item label="电影名称" prop="movieName">
        <el-input v-model="form.movieName" placeholder="请输入电影名称" />
      </el-form-item>
      <!-- 影厅名称 -->
      <el-form-item label="影厅名称" prop="cinemaName">
        <el-input v-model="form.cinemaName" placeholder="请输入影厅名称" />
      </el-form-item>
      <!--放映状态-->
      <el-form-item label="放映状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择订单状态">
          <el-option label="未放映" value="未放映" />
          <el-option label="正在放映" value="正在放映" />
          <el-option label="已放映" value="已放映" />
        </el-select>
      </el-form-item>
      <!-- 开始时间 -->
      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker
          v-model="form.startTime"
          type="datetime"
          placeholder="选择注册时间"
        />
      </el-form-item>
      <!-- 结束时间 -->
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker
          v-model="form.endTime"
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
  movieName: "",
  cinemaName: "",
  status: "", // 默认状态为空，用户选择时才会设置
  startTime: "",
  endTime: "",
});

// 关闭对话框
const closeDialog = () => {
  dialogVisible.value = false;
  emit("update:dialogVisible", false); // 发出事件通知父组件关闭对话框
};

// 确认按钮点击处理
const handleConfirm = () => {
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
