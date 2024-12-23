<template>
  <el-dialog v-model="dialogVisible" title="增加影厅" width="500px">
    <el-form :model="form" label-width="100px" :rules="rules" ref="formRef">
      <!-- 影厅名称 -->
      <el-form-item label="影厅名称" prop="aditoriumName">
        <el-input v-model="form.aditoriumName" placeholder="请输入影厅名称" />
      </el-form-item>

      <!-- 电影名称 -->
      <el-form-item label="电影名称" prop="movieName">
        <el-input v-model="form.movieName" placeholder="请输入电影名称" />
      </el-form-item>

      <!-- 订单编号 -->
      <el-form-item label="订单编号" prop="orderId">
        <el-input v-model="form.orderId" placeholder="请输入订单编号" />
      </el-form-item>

      <!-- 用户编号 -->
      <el-form-item label="用户编号" prop="userId">
        <el-input v-model="form.userId" placeholder="请输入用户编号" />
      </el-form-item>

      <!-- 状态 -->
      <el-form-item label="订单状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择订单状态">
          <el-option label="已支付" value="已支付" />
          <el-option label="未支付" value="未支付" />
          <el-option label="已确认" value="已确认" />
          <el-option label="已观看" value="已观看" />
          <el-option label="已取消" value="已取消" />
          <el-option label="已退款" value="已退款" />
        </el-select>
      </el-form-item>

      <!-- 下单时间 -->
      <el-form-item label="下单时间" prop="orderTime">
        <el-date-picker
          v-model="form.orderTime"
          type="datetime"
          placeholder="选择下单时间"
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
  orderId: "",
  userId: "",
  aditoriumName: "",
  movieName: "",
  status: "", // 默认状态为空，用户选择时才会设置
  orderTime: "",
});

// 表单校验规则
const rules = {
  auditoriumName: [
    { required: true, message: "请输入影厅名称", trigger: "blur" },
  ],
  movieName: [{ required: true, message: "请输入电影名称", trigger: "blur" }],
  orderId: [{ required: true, message: "请输入订单编号", trigger: "blur" }],
  customerId: [{ required: true, message: "请输入顾客编号", trigger: "blur" }],
  status: [{ required: true, message: "请选择订单状态", trigger: "change" }],
  orderTime: [{ required: true, message: "请选择下单时间", trigger: "change" }],
};

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
