<template>
    <DoughnutChart :chartData="testData" />
  </template>
  
  <script setup>
  import { DoughnutChart } from 'vue-chart-3';
  import { Chart, registerables } from "chart.js";
  Chart.register(...registerables);
  const props = defineProps({testData: Object,})
  </script>