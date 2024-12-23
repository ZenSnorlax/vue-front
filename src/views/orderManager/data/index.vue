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
    <!-- 订单反馈电影均分统计 -->
    <el-card class="chart-card">
      <div class="chart" ref="chartRef3"></div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
import { order_data, feedback_data } from "@/test/order";

const chartRef1 = ref(null);
const chartRef2 = ref(null);
const chartRef3 = ref(null);

type EChartsOption = echarts.EChartsOption;

// 统计订单状态（已支付/未支付/已确认/已观看/已取消/已退款）
const orderStatusStats = order_data.reduce(
  (acc, order) => {
    if (order.status === "已支付") acc.paid++;
    if (order.status === "未支付") acc.unpaid++;
    if (order.status === "已确认") acc.confirmed++;
    if (order.status === "已观看") acc.watched++;
    if (order.status === "已取消") acc.cancelled++;
    if (order.status === "已退款") acc.refunded++;
    return acc;
  },
  { paid: 0, unpaid: 0, confirmed: 0, watched: 0, cancelled: 0, refunded: 0 }
);

// 订单日期分布统计
const dailyStats = order_data.reduce(
  (acc: { [key: string]: number }, order) => {
    const date = new Date(order.orderTime).toISOString().split("T")[0]; // 获取日期部分（YYYY-MM-DD）
    acc[date] = (acc[date] || 0) + 1; // 累加该日期的订单数量
    return acc;
  },
  {} as { [key: string]: number }
);

const sortedDates = Object.keys(dailyStats).sort(); // 获取并排序日期
const dailyData = sortedDates.map((date) => dailyStats[date]); // 按排序后的日期获取订单数量

// 电影评分均分统计
const avgRating = feedback_data.reduce(
  (
    acc: { [key: string]: { totalRating: number; count: number } },
    feedback
  ) => {
    if (!acc[feedback.movieName]) {
      acc[feedback.movieName] = { totalRating: 0, count: 0 };
    }
    acc[feedback.movieName].totalRating += feedback.rating;
    acc[feedback.movieName].count += 1;
    return acc;
  },
  {} as { [key: string]: { totalRating: number; count: number } }
);

// 初始化图表
const createChart = (chartRef: any, option: EChartsOption) => {
  if (chartRef.value) {
    const chartInstance = echarts.init(chartRef.value, null, {
      renderer: "svg",
    });
    chartInstance.setOption(option);
  }
};

onMounted(() => {
  // 订单状态图表配置
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
        data: [
          { value: orderStatusStats.paid, name: "已支付" },
          { value: orderStatusStats.unpaid, name: "未支付" },
          { value: orderStatusStats.confirmed, name: "已确认" },
          { value: orderStatusStats.watched, name: "已观看" },
          { value: orderStatusStats.cancelled, name: "已取消" },
          { value: orderStatusStats.refunded, name: "已退款" },
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

  // 订单日期分布图表配置
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
        data: sortedDates,
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
        data: dailyData,
        itemStyle: {
          color: "#409EFF",
        },
      },
    ],
  };

  // 电影评分均分图表配置
  const movieNames = Object.keys(avgRating);
  const avgRatings = movieNames.map((movieName) => {
    const { totalRating, count } = avgRating[movieName];
    return totalRating / count;
  });

  const avgRatingOption: EChartsOption = {
    title: {
      text: "电影评分分布",
      left: "center",
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
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "平均评分",
        type: "bar",
        barWidth: "60%",
        data: avgRatings,
        itemStyle: {
          color: "#66CC66",
        },
      },
    ],
  };

  createChart(chartRef1, orderStatusOption);
  createChart(chartRef2, dailyOption);
  createChart(chartRef3, avgRatingOption);
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
