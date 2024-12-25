<template>
  <div id="dashboard">
    <!-- 时间维度选择器 -->
    <el-button-group>
      <el-button @click="fetchData('yearly')">按年</el-button>
      <el-button @click="fetchData('monthly')">按月</el-button>
      <el-button @click="fetchData('weekly')">按周</el-button>
    </el-button-group>

    <!-- 图表容器 -->
    <el-card style="width: 800px; margin: 20px auto">
      <div class="chart" ref="chartRef"></div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted } from "vue";

const chartRef = ref(null); // 图表 DOM 元素
let myChart: echarts.ECharts | null = null; // 图表实例

type EChartsOption = echarts.EChartsOption; // 类型定义
1; // 模拟的数据
const mockData = {
  yearly: {
    labels: ["2020", "2021", "2022", "2023"],
    data: [100000, 120000, 110000, 130000],
  },
  monthly: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: [8200, 9320, 9010, 9340, 12940, 13300],
  },
  weekly: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    data: [2000, 2500, 2200, 2800],
  },
};

// 获取数据并更新图表
const fetchData = (timeframe: "yearly" | "monthly" | "weekly") => {
  const { labels, data } = mockData[timeframe];

  if (myChart) {
    // 更新图表配置
    const option: EChartsOption = {
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: labels,
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value}元",
        },
      },
      series: [
        {
          name: "Revenue",
          type: "line",
          smooth: true,
          data,
          areaStyle: {
            color: "rgba(128, 128, 255, 0.3)",
          },
          lineStyle: {
            color: "#5470C6",
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

    // 设置新选项
    myChart.setOption(option);
  }
};

// 初始化图表
onMounted(() => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value, null, {
      renderer: "svg",
    });

    // 默认加载按年数据
    fetchData("yearly");
  }
});
</script>

<style scoped>
.el-button-group {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.chart {
  padding: 20px;
  width: 100%;
  height: 500px;
}
</style>
