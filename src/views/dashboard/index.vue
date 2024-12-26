<template>
  <div id="dashboard">
    <!-- 时间维度选择器 -->
    <el-button-group>
      <el-button @click="fetchData('yearly')">按年</el-button>
      <el-button @click="fetchData('monthly')">按月</el-button>
      <el-button @click="fetchData('daily')">按日</el-button>
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
import { getRevenue, RevenueParams } from "@/api/dashboard";

const chartRef = ref(null); // 图表 DOM 元素
let myChart: echarts.ECharts | null = null; // 图表实例

type EChartsOption = echarts.EChartsOption; // 图表配置类型

// 获取数据并更新图表
const fetchData = async (timeframe: "yearly" | "monthly" | "daily") => {
  try {
    // 调用接口获取数据
    const params: RevenueParams = { timeframe };
    const response = await getRevenue(params);

    const { labels, data } = response.data;

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
  } catch (error) {
    console.error("数据加载失败:", error);
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
#dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.el-button-group {
  padding-top: 20px;
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
