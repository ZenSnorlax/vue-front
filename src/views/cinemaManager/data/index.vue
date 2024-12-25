<template>
  <div class="operation-data">
    <!-- 选择年份 -->
    <el-input-number
      v-model="year"
      :min="min_year"
      :max="max_year"
      @change="handleChange"
      label="选择年份"
    />
    <!-- 图表容器 -->
    <el-card class="chart-card">
      <div class="chart" ref="chartRef1"></div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
import { getCinemaRevenue } from "@/api/cinema"; // 导入接口方法

// 定义图表容器和年份参数
const chartRef1 = ref(null);
const year = ref(new Date().getFullYear()); // 默认当前年份
const min_year = ref(2014); // 最小年份
const max_year = ref(new Date().getFullYear()); // 最大年份

type EChartsOption = echarts.EChartsOption;

// 动态获取数据并创建图表
const fetchIncomeData = async (selectedYear: number) => {
  try {
    const response = await getCinemaRevenue({ year: selectedYear });
    const { names, revenues } = response.data;

    const incomeChartOption: EChartsOption = {
      title: {
        text: `${selectedYear} 年影厅收入`,
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
          data: revenues,
        },
      ],
    };

    // 渲染图表
    createChart(chartRef1, incomeChartOption);
  } catch (error) {
    console.error(`获取 ${selectedYear} 年影厅收入数据失败:`, error);
  }
};

// 创建图表
const createChart = (chartRef: any, option: EChartsOption) => {
  if (chartRef.value) {
    const myChart = echarts.init(chartRef.value, null, {
      renderer: "svg",
    });
    option && myChart.setOption(option);
  }
};

// 处理年份改变
const handleChange = (newYear: number) => {
  fetchIncomeData(newYear);
};

// 在组件挂载时加载默认年份数据
onMounted(() => {
  fetchIncomeData(year.value);
});
</script>

<style scoped>
.operation-data {
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
