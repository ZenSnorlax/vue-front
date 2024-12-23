<template>
  <div id="dashboard">
    <!-- 使用 el-card 作为图表的容器 -->
    <el-card style="width: 800px; margin: 0 auto">
      <div class="chart" ref="chartRef"></div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted } from "vue";

// 定义一个 ref 来存储图表 DOM 元素
const chartRef = ref(null);
type EChartsOption = echarts.EChartsOption;

onMounted(() => {
  if (chartRef.value) {
    // 初始化 ECharts 图表
    const myChart = echarts.init(chartRef.value, null, {
      renderer: "svg",
    });

    // 定义折线图的配置项
    const option: EChartsOption = {
      title: {
        text: "Total Revenue Over Time",
        left: "center",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value}元", // 格式化为货币单位
        },
      },
      series: [
        {
          name: "Revenue",
          type: "line",
          smooth: true,
          data: [8200, 9320, 9010, 9340, 12940, 13300, 13200, 14100, 15300],
          areaStyle: {
            color: "rgba(128, 128, 255, 0.3)", // 渐变区域颜色
          },
          lineStyle: {
            color: "#5470C6", // 折线颜色
            width: 2,
          },
          symbol: "circle",
          symbolSize: 8,
          itemStyle: {
            color: "#5470C6",
            borderColor: "#fff",
            borderWidth: 2,
          },
        },
      ],
    };

    // 设置图表选项
    option && myChart.setOption(option);
  }
});
</script>

<style scoped>
.chart {
  padding: 20px;
  width: 100%;
  height: 500px;
}
</style>
