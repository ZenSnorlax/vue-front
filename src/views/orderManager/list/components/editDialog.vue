<template>
  <el-dialog v-model="dialogVisible" title="编辑订单信息" width="500px">
    <el-form :model="form" label-width="100px">
      <!-- 用户编号 -->
      <el-form-item label="用户编号">
        <el-input v-model="form.userId" placeholder="请输入用户编号" />
      </el-form-item>

      <!-- 电影名称 -->
      <el-form-item label="电影名称">
        <el-input v-model="form.movieName" placeholder="请输入电影名称" />
      </el-form-item>

      <!-- 影厅名称 -->
      <el-form-item label="影厅名称">
        <el-input v-model="form.cinemaName" placeholder="请输入影厅名称" />
      </el-form-item>

      <el-form-item label="订单价格">
        <el-input v-model="form.price" placeholder="请输入订单价格" />
      </el-form-item>

      <el-form-item label="座位号">
        <el-input v-model="form.seat" placeholder="请输入座位号" />
      </el-form-item>
      <!-- 订单状态 -->
      <el-form-item label="订单状态">
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
      <el-form-item label="下单时间">
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
// 导入更新订单数据的API（例如，updateOrder）
import { updateOrder } from "@/api/order";
import { ElMessage } from "element-plus";

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
const form = ref({ ...props.row }); // 使用展开操作符来确保表单数据是深拷贝的

// 监听 props.dialogVisible 的变化，确保同步
watch(
  () => props.dialogVisible,
  (newVal) => {
    dialogVisible.value = newVal;
  }
);

// 监听 props.row 的变化，确保 form 更新
watch(
  () => props.row,
  (newVal) => {
    form.value = { ...newVal }; // 使用深拷贝，避免引用更新导致的问题
  }
);

// 关闭对话框
const closeDialog = () => {
  dialogVisible.value = false;
  emit("update:dialogVisible", false); // 发出事件通知父组件关闭对话框
};

// 确认按钮点击处理
const handleConfirm = async () => {
  const response = await updateOrder(form.value.orderId, form.value);
  if (response.data.code == 200) {
    ElMessage.success(response.data.msg);
    closeDialog();
  } else if (response.data.code == 500) {
    ElMessage.error(response.data.msg);
  }
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
