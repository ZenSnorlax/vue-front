<template>
  <div class="operation-data">
    <!-- 影厅收入图表 -->
    <el-card class="chart-card">
      <div class="chart" ref="chartRef1"></div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
import { getCinemaIncome } from "@/api/cinema"; //导入影厅名称与收入的字典api
// 定义 ref 来存储图表 DOM 元素
const chartRef1 = ref(null);
type EChartsOption = echarts.EChartsOption;

// 创建字典存储影厅名称与收入数据s
const incomeData = {
  "影厅 1": 15000,
  "影厅 2": 12000,
  "影厅 3": 18000,
  "影厅 4": 20000,
};

// 提取影厅名称和收入数据
const names = Object.keys(incomeData);
const incomeValues = Object.values(incomeData);

const createChart = (chartRef: any, option: EChartsOption) => {
  if (chartRef.value) {
    const myChart = echarts.init(chartRef.value, null, {
      renderer: "svg",
    });
    option && myChart.setOption(option);
  }
};

onMounted(() => {
  // 影厅收入图表配置
  const incomeChartOption: EChartsOption = {
    title: {
      text: "影厅收入",
      left: "center",
      top: "0p",
      textStyle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
      },
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
        data: names,
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          fontSize: 14,
          color: "#555",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          fontSize: 14,
          color: "#555",
          formatter: "{value} 元",
        },
      },
    ],
    series: [
      {
        name: "收入",
        type: "bar",
        barWidth: "60%",
        itemStyle: {
          color: "#4CAF50",
        },
        data: incomeValues,
      },
    ],
  };

  createChart(chartRef1, incomeChartOption);
});
</script>

<style scoped>
#operation-data {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px;
}

.chart-card {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  overflow: hidden;
}

.chart {
  padding: 20px;
  width: 100%;
  height: 350px;
}
</style>
