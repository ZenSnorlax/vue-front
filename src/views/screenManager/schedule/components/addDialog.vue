<template>
  <el-dialog v-model="dialogVisible" title="增加放映" width="500px">
    <el-form :model="form" label-width="100px" ref="formRef">
      <!-- 电影名称 -->
      <el-form-item label="电影名称" prop="movieName">
        <el-input v-model="form.movieName" placeholder="请输入电影名称" />
      </el-form-item>

      <!-- 影厅名称 -->
      <el-form-item label="影厅名称" prop="cinemaName">
        <el-input v-model="form.cinemaName" placeholder="请输入影厅名称" />
      </el-form-item>

      <!-- 开始时间 -->
      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker
          v-model="form.startTime"
          type="datetime"
          placeholder="请选择开始时间"
        />
      </el-form-item>

      <!-- 结束时间 -->
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker
          v-model="form.endTime"
          type="datetime"
          placeholder="请选择结束时间"
        />
      </el-form-item>

      <!-- 放映状态 -->
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option label="活跃" value="活跃" />
          <el-option label="禁用" value="禁用" />
        </el-select>
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
import { createScreen, ScreenData } from "@/api/screen";

// 表单数据和验证规则
const form = ref<ScreenData>({
  movieName: "",
  startTime: "",
  endTime: "",
  status: "",
  cinemaName: "",
});

// 父组件传递的属性和事件
const props = defineProps({
  dialogVisible: Boolean,
});
const emit = defineEmits(["update:dialogVisible"]);

// 对话框显示状态
const dialogVisible = ref(props.dialogVisible);

// 同步 dialogVisible
watch(
  () => props.dialogVisible,
  (newVal) => {
    dialogVisible.value = newVal;
  }
);

// 关闭对话框
const closeDialog = () => {
  dialogVisible.value = false;
  emit("update:dialogVisible", false);
};

// 提交表单
const handleConfirm = async () => {
  // 调用接口提交数据
  await createScreen(form.value);
  console.log("提交成功：", form.value);
  closeDialog();
};

// 同步 dialogVisible 到父组件
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
