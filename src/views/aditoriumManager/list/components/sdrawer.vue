<template>
  <el-drawer v-model="drawer" title="影厅详情" :with-header="false" size="30%">
    <div class="drawer-content">
      <!-- 影厅编号 -->
      <div class="drawer-item">
        <span class="drawer-label">影厅编号：</span>
        <span class="drawer-value">{{ props.row.id }}</span>
      </div>
      <!-- 影厅名称 -->
      <div class="drawer-item">
        <span class="drawer-label">影厅名称：</span>
        <span class="drawer-value">{{ props.row.name }}</span>
      </div>
      <!-- 影厅状态 -->
      <div class="drawer-item">
        <span class="drawer-label">影厅状态：</span>
        <span class="drawer-value">
          <el-tag :type="props.row.status === '启用' ? 'success' : 'danger'">
            {{ props.row.status }}
          </el-tag>
        </span>
      </div>
      <!-- 座位总数 -->
      <div class="drawer-item">
        <span class="drawer-label">座位总数：</span>
        <span class="drawer-value">{{ props.row.seats }}</span>
      </div>
      <!-- 影厅负责人 -->
      <div class="drawer-item">
        <span class="drawer-label">影厅负责人：</span>
        <span class="drawer-value">{{ props.row.manager }}</span>
      </div>
      <!--反馈电话-->
      <div class="drawer-item">
        <span class="drawer-label">反馈电话：</span>
        <span class="drawer-value">{{ "123456789" }}</span>
      </div>
      <!-- 座位示意图 -->
      <div class="demo-image__placeholder">
        <el-image :src="src">
          <template #placeholder>
            <div class="image-slot">Loading<span class="dot">...</span></div>
          </template>
        </el-image>
        <span class="demonstration">座位示意图</span>
        <!-- 说明放在图片底部 -->
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, defineProps, watch, defineEmits } from "vue";

// 定义父组件传递的属性
const props = defineProps({
  drawerVisible: Boolean,
  row: {
    type: Object,
    default: null,
  },
});

// 定义事件
const emit = defineEmits(["update:drawerVisible"]);

// 使用 ref 来控制抽屉的显示与隐藏
const drawer = ref(props.drawerVisible);

// 监听 props.drawerVisible 的变化
watch(
  () => props.drawerVisible,
  (newValue) => {
    drawer.value = newValue;
  }
);

// 监听 drawer 的变化并通知父组件
watch(drawer, (newValue) => {
  emit("update:drawerVisible", newValue);
});

// 图片源
const src =
  "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg";
</script>

<style scoped>
/* 抽屉内容区域 */
.drawer-content {
  padding: 20px;
  font-size: 14px;
  color: #333;
}

/* 抽屉项 */
.drawer-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 14px;
}

/* 标签和数值的样式 */
.drawer-label {
  font-weight: bold;
  color: #555;
}

.drawer-value {
  color: #333;
}

/* 美化座位示意图 */
.demo-image__placeholder {
  margin-top: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.demonstration {
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px; /* 将说明放在图片的下方 */
}

.image-slot {
  font-size: 14px;
  color: #999;
}

.el-image {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 自定义小圆点的动画 */
.dot {
  animation: dot-blink 1s infinite;
}

@keyframes dot-blink {
  50% {
    opacity: 0;
  }
}
</style>
