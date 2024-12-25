<template>
  <div class="operation-data">
    <!-- 订单状态统计 -->
    <el-card class="chart-card">
      <div class="chart" ref="chartRef1"></div>
    </el-card>
    <!-- 订单创建时间分布 -->
    <el-card class="chart-card">
      <div class="chart" ref="chartRef2"></div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
import { getOrdersStatus, getOrdersCount } from "@/api/order"; // 导入接口方法

const chartRef1 = ref(null);
const chartRef2 = ref(null);

type EChartsOption = echarts.EChartsOption;

// 渲染订单状态分布图表
const renderOrderStatusChart = async () => {
  try {
    const response = await getOrdersStatus(); // 获取订单状态数据
    const statusData = response.data; // 假设返回 [{ name: "已支付", value: 20 }, ...]

    const orderStatusOption: EChartsOption = {
      title: {
        text: "订单状态分布",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        bottom: "0%",
      },
      series: [
        {
          name: "订单状态",
          type: "pie",
          radius: "50%",
          data: statusData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    if (chartRef1.value) {
      const chartInstance = echarts.init(chartRef1.value, null, {
        renderer: "svg",
      });
      chartInstance.setOption(orderStatusOption);
    }
  } catch (error) {
    console.error("获取订单状态分布数据失败:", error);
  }
};

// 渲染订单日期分布图表
const renderOrderDateChart = async () => {
  try {
    const response = await getOrdersCount(); // 获取订单日期分布数据
    const { dates, counts } = response.data; // 假设返回 { dates: ["2023-01-01", ...], counts: [10, ...] }

    const dailyOption: EChartsOption = {
      title: {
        text: "订单日期分布",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: dates,
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            interval: 0,
            rotate: 45,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "订单数量",
          type: "bar",
          barWidth: "60%",
          data: counts,
          itemStyle: {
            color: "#409EFF",
          },
        },
      ],
    };

    if (chartRef2.value) {
      const chartInstance = echarts.init(chartRef2.value, null, {
        renderer: "svg",
      });
      chartInstance.setOption(dailyOption);
    }
  } catch (error) {
    console.error("获取订单日期分布数据失败:", error);
  }
};

// 挂载时调用
onMounted(() => {
  renderOrderStatusChart();
  renderOrderDateChart();
});
</script>

<style scoped>
.operation-data {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 100px;
}

.chart-card {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  overflow: hidden;
}

.chart {
  padding: 40px;
  width: 100%;
  height: 350px;
}
</style>
