<template>
  <div class="operation-data">
    <el-card class="chart-card">
      <div class="chart" ref="chartRef"></div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
import { getRecentMovieRate } from "@/api/screen"; // 导入接口方法

// 图表容器
const chartRef = ref(null);

// 渲染评分图表
const fetchAndRenderChart = async () => {
  try {
    // 调用接口获取数据
    const response = await getRecentMovieRate();
    const { movieNames, ratings } = response.data; // 假设接口返回 { movieNames: string[], ratings: number[] }

    const ratingChartOption: echarts.EChartsOption = {
      title: {
        text: "近期电影评分均分",
        left: "center",
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
      xAxis: [
        {
          type: "category",
          data: movieNames,
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
            formatter: "{value} 分",
          },
        },
      ],
      series: [
        {
          name: "平均评分",
          type: "bar",
          barWidth: "60%",
          itemStyle: {
            color: "#FF9800",
          },
          data: ratings,
        },
      ],
    };

    // 渲染图表
    if (chartRef.value) {
      const myChart = echarts.init(chartRef.value, null, {
        renderer: "svg",
      });
      myChart.setOption(ratingChartOption);
    }
  } catch (error) {
    console.error("获取电影评分数据失败:", error);
  }
};

// 挂载时调用
onMounted(() => {
  fetchAndRenderChart();
});
</script>

<style scoped>
.operation-data {
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
