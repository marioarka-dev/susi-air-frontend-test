<template>
  <div class="chart-section">
    <div class="chart-wrapper bento-card">
      <Line :data="chartData" :options="chartOptions" class="canvas-chart" />
      
      <!-- Toggle Group -->
      <div class="toggle-group">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="['toggle-btn', { active: activeTab.id === tab.id }]"
          @click="activeTab = tab"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { usePilotStore } from '~/stores/pilot'

// Registrasi modul Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const pilotStore = usePilotStore()


const tabs = [
  { id: '1w', label: '1w', window: 7, limit: 40, max: 45 },
  { id: '1m', label: '1m', window: 30, limit: 100, max: 125 },
  { id: '3m', label: '3m', window: 90, limit: 300, max: 325 },
  { id: '6m', label: '6m', window: 180, limit: 600, max: 625 },
  { id: '1y', label: '1y', window: 365, limit: 1050, max: 1250 },
]

// Default to 1w
const activeTab = ref(tabs[0])

// Fungsi untuk membuat array 15 hari (7 hari sebelum + hari ini + 7 hari sesudah)
const generateDates = () => {
  const dates = []
  const baseDate = new Date(pilotStore.currentDate) // 31 May 2026
  
  for (let i = -7; i <= 7; i++) {
    const d = new Date(baseDate)
    d.setDate(d.getDate() + i)
    dates.push(d)
  }
  return dates
}

// Menghitung Rolling Sum
const calculateRollingSum = (targetDate: Date, windowDays: number) => {
  const targetTime = targetDate.getTime()
  
  const startDate = new Date(targetTime)
  startDate.setDate(targetDate.getDate() - windowDays + 1)
  const startTime = startDate.getTime()

  let sum = 0
  pilotStore.flightHours.forEach(record => {
    const recordTime = new Date(record.date).getTime()
    if (recordTime >= startTime && recordTime <= targetTime) {
      sum += record.hours
    }
  })
  return parseFloat(sum.toFixed(1))
}

// Data Reaktif untuk Chart
const chartData = computed(() => {
  const displayDates = generateDates()
  
  // Format Label X-Axis (misal: "24 May")
  const labels = displayDates.map(d => {
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  })

  // Data Y-Axis (Rolling Sum)
  const dataPoints = displayDates.map(d => calculateRollingSum(d, activeTab.value.window))
  
  // Data Batas Merah (Garis lurus mendatar)
  const limitPoints = displayDates.map(() => activeTab.value.limit)

  return {
    labels,
    datasets: [
      {
        label: 'Hours Flown',
        data: dataPoints,
        borderColor: '#22C5E8', // Chart accent Susi Air
        backgroundColor: '#22C5E8',
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 3,
      },
      {
        label: 'Limit',
        data: limitPoints,
        borderColor: '#E63757', // Brand red Susi Air
        borderWidth: 1,
        borderDash: [5, 5], // Garis putus-putus agar terlihat elegan
        pointRadius: 0,
        fill: false,
      }
    ]
  }
})

// Konfigurasi Visual Chart
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false // Sembunyikan legenda bawaan agar bersih
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: activeTab.value.max, // Maksimal sumbu Y dinamis berdasarkan tombol yang diklik
      grid: {
        color: '#F3F4F6'
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        maxTicksLimit: 5 // Jangan tampilkan semua 15 label agar tidak tumpang tindih di layar HP
      }
    }
  }
}))
</script>

<style scoped lang="scss">
@import "~/assets/scss/main.scss";

.chart-section {
  margin-bottom: 24px;
}

.chart-wrapper {
  padding: 20px 16px;
  height: auto;
}

.canvas-chart {
  height: 200px !important;
  width: 100%;
  margin-bottom: 20px;
}

/* Toggle Button Group */
.toggle-group {
  display: flex;
  background-color: #F3F4F6;
  border-radius: 8px;
  padding: 4px;
  gap: 4px;
}

.toggle-btn {
  flex: 1;
  background: transparent;
  border: none;
  padding: 6px 0;
  font-size: 12px;
  font-weight: 600;
  color: $color-text-secondary;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &.active {
    background-color: $color-surface;
    color: $color-primary;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
}
</style>