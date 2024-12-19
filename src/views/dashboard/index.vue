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

    // 定义图表的配置项
    const option: EChartsOption = {
      title: {
        text: "Referer of a Website",
        subtext: "Fake Data",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
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
