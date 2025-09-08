<script setup>
import { ref, onMounted, onBeforeUnmount, onUnmounted } from 'vue';
import { LineChart } from 'vue-chrts';

// ECG参数
const samplingRate = 250; // 采样率 (Hz)
const displaySeconds = 1; // 显示3秒数据
const maxDisplayPoints = displaySeconds * samplingRate;
const ecgData = ref([]);
let intervalId = null;

// 生成完整的ECG数据段
const generateECGSegment = () => {
  const segment = [];
  const startTime = Math.random() * 100; // 随机起始时间
  
  for (let i = 0; i < maxDisplayPoints; i++) {
    const time = startTime + (i / samplingRate);
    segment.push({
      time: time,
      displayTime: (i / samplingRate) - displaySeconds, // -3到0秒
      ecg: generateECGPoint(time)
    });
  }
  return segment;
};

// 生成单个ECG波形点
const generateECGPoint = (time) => {
  const cycleDuration = 0.8 + Math.random() * 0.4; // 随机心跳周期0.8-1.2秒
  const positionInCycle = (time % cycleDuration) / cycleDuration;
  
  let value = 0;
  
  // P波 (0-0.1周期)
  if (positionInCycle < 0.1) {
    value = (0.1 + Math.random() * 0.1) * Math.sin(positionInCycle * 10 * Math.PI);
  }
  // PR段 (0.1-0.2周期)
  else if (positionInCycle < 0.2) {
    value = (Math.random() - 0.5) * 0.05;
  }
  // QRS波群 (0.2-0.25周期)
  else if (positionInCycle < 0.25) {
    const qrsPos = (positionInCycle - 0.2) / 0.05;
    if (qrsPos < 0.2) value = -0.2 - Math.random() * 0.1; // Q波
    else if (qrsPos < 0.6) value = 0.8 + Math.random() * 0.4; // R波
    else value = -0.3 - Math.random() * 0.1; // S波
  }
  // ST段 (0.25-0.4周期)
  else if (positionInCycle < 0.4) {
    value = (Math.random() - 0.5) * 0.05;
  }
  // T波 (0.4-0.6周期)
  else if (positionInCycle < 0.6) {
    value = (0.1 + Math.random() * 0.05) * Math.sin((positionInCycle - 0.4) * 5 * Math.PI);
  }
  // TP段 (0.6-1.0周期)
  else {
    value = (Math.random() - 0.5) * 0.02;
  }
  
  // 添加噪声
  value += (Math.random() - 0.5) * 0.02;
  
  return value;
};

// 更新数据 - 每秒生成全新的随机ECG段
const updateData = () => {
  ecgData.value = generateECGSegment();
};

onMounted(() => {
  updateData(); // 初始数据
  intervalId = setInterval(updateData, 1000); // 每秒更新一次
});

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId);
});



const categories = ref({
  ecg: {
    name: 'ECG',
    color: '',
    strokeWidth: 2
  }
})

// 获取 CSS 变量的当前值
function getCurrentColor() {
  return getComputedStyle(document.documentElement)
    .getPropertyValue('--chart-1')
    .trim()
}

// 初始化
categories.value.ecg.color = getCurrentColor()

// 每 500ms 检查一次 CSS 变量
onMounted(() => {
  intervalId = setInterval(() => {
    const newColor = getCurrentColor()
    if (newColor !== categories.value.ecg.color) {
      categories.value.ecg.color = newColor
    }
  }, 500) // 500ms 检查一次
})

// 组件卸载时清除定时器
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

const xFormatter = (i) => {
  if (i >= 0 && i < ecgData.value.length) {
    return `${(ecgData.value[i].displayTime + displaySeconds).toFixed(2)}s`;
  }
  return '';
};
</script>

<template>
  <div class="ecg-monitor">
    <LineChart 
      :data="ecgData" 
      :categories="categories" 
      :height="300"
      :width="800"
      :xFormatter="xFormatter"
      xLabel="Time (s)"
      yLabel="Voltage (mV)"
      :showGrid="true"
      :showLegend="false"
      :margin="{ top: 20, right: 20, bottom: 30, left: 40 }"
      :xDomain="[-displaySeconds, 0]"
      :yDomain="[-0.5, 1.2]"
      xKey="displayTime"
    />
  </div>
</template>

<style>

</style>