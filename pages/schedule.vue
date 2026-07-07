<template>
  <div class="schedule-container">
    <header class="page-header">
      <h1 class="page-title">Roster Schedule</h1>
    </header>

    <div class="calendar-card bento-card">
      <div class="calendar-nav">
        <button class="nav-btn" @click="changeMonth(-1)"><ChevronLeftIcon class="icon" /></button>
        <h2 class="current-month">{{ currentMonthName }} {{ currentYear }}</h2>
        <button class="nav-btn" @click="changeMonth(1)"><ChevronRightIcon class="icon" /></button>
      </div>

      <div class="weekdays">
        <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" class="weekday">
          {{ day }}
        </div>
      </div>

      <div class="days-grid">
        <div v-for="blank in blankDays" :key="'blank-' + blank" class="day-cell blank"></div>
        
        <div 
          v-for="day in daysInMonth" 
          :key="day" 
          class="day-cell"
          :class="{ 'has-duty': getDutyType(day) }"
          @click="handleDayClick(day)"
        >
          <span class="day-number">{{ day }}</span>
          <div v-if="getDutyType(day)" :class="['duty-badge', getDutyType(day)]">
            {{ getDutyType(day) }}
          </div>
        </div>
      </div>
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-card" @click.stop>
        <div class="modal-icon-wrapper">
          <CalendarIcon class="modal-icon" />
        </div>
        <h3 class="modal-title">{{ selectedDateText }}</h3>
        <p class="modal-desc">Detail page coming soon!</p>
        <button class="btn-close" @click="closeModal">Close</button>
      </div>
    </div>
    </div>

    <section class="legend-section">
      <h3 class="legend-title">Duty Legend</h3>
      <div class="legend-grid">
        <div v-for="leg in legends" :key="leg.code" class="legend-item">
          <span :class="['legend-color', leg.code]"></span>
          <span class="legend-label">{{ leg.code }} - {{ leg.name }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'
import { usePilotStore } from '~/stores/pilot'

const pilotStore = usePilotStore()

// State untuk Bulan dan Tahun yang sedang dilihat (Default: Mei 2026)
const currentDate = ref(new Date('2026-05-01'))


const legends = [
  { code: 'DTY', name: 'On Duty' },
  { code: 'RLV', name: 'Requested Leave' },
  { code: 'SCK', name: 'Sick' },
  { code: 'TRV', name: 'Travel Day' },
  { code: 'TRX', name: 'Training' },
  { code: 'ADM', name: 'Administration' },
  { code: 'FER', name: 'Ferry' },
  { code: 'MED', name: 'Medical' },
  { code: 'REC', name: 'Recurrent' },
  { code: 'ULV', name: 'Unpaid Leave' }
]

// Computed properties untuk kalender
const currentMonthName = computed(() => {
  return currentDate.value.toLocaleString('default', { month: 'long' })
})

const currentYear = computed(() => {
  return currentDate.value.getFullYear()
})

const daysInMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  return new Date(year, month + 1, 0).getDate()
})

const blankDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  return new Date(year, month, 1).getDay()
})

// Fungsi navigasi bulan
const changeMonth = (step: number) => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + step)
  currentDate.value = newDate
}

// Fungsi mencari tugas di tanggal tertentu
const getDutyType = (day: number) => {
  const year = currentDate.value.getFullYear()
  // Pad month and day with leading zero if needed
  const month = String(currentDate.value.getMonth() + 1).padStart(2, '0')
  const formattedDay = String(day).padStart(2, '0')
  const dateString = `${year}-${month}-${formattedDay}`
  
  const schedule = pilotStore.scheduleData.find(s => s.date === dateString)
  return schedule ? schedule.type : null
}

const showModal = ref(false)
const selectedDateText = ref('')


const handleDayClick = (day: number) => {
  selectedDateText.value = `${day} ${currentMonthName.value} ${currentYear.value}`
  showModal.value = true
}


const closeModal = () => {
  showModal.value = false
}
</script>

<style scoped lang="scss">
@import "~/assets/scss/main.scss";

.schedule-container {
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

.page-title {
  font-size: 24px;
  color: $color-primary;
  margin: 0;
}

.calendar-card {
  background-color: $color-surface;
  border-radius: $border-radius-card;
  padding: 16px 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  height: 400px; 
}

.calendar-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  .nav-btn {
    background: transparent;
    border: none;
    color: $color-text-secondary;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;

    &:hover {
      background-color: #F3F4F6;
    }
  }

  .current-month {
    font-size: 16px;
    margin: 0;
    color: $color-primary;
  }
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 12px;
}

.weekday {
  font-size: 12px;
  font-weight: 600;
  color: $color-text-secondary;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  flex: 1;
  overflow-y: auto;
}

.day-cell {
  border: 1px solid #F3F4F6;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 2px;
  cursor: pointer;
  min-height: 45px; 

  &.blank {
    border: none;
    cursor: default;
  }

  &:not(.blank):hover {
    border-color: $color-primary;
  }

  .day-number {
    font-size: 14px;
    font-weight: 600;
    color: $color-text-primary;
    margin-bottom: 4px;
  }
}

/* Lencana Tugas (Duty Badges) - Definisi Warna */
.duty-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 4px;
  border-radius: 4px;
  color: white;
  width: 90%;
  text-align: center;
  
  &.DTY { background-color: $color-success; }
  &.SCK, &.MED { background-color: $color-danger; }
  &.RLV, &.ULV { background-color: $color-warning; }
  &.TRX, &.REC { background-color: $color-primary; }
  &.FER, &.TRV { background-color: $color-chart-accent; }
  &.ADM { background-color: $color-text-secondary; }
}

/* Legenda */
.legend-section {
  padding: 0 4px;
}

.legend-title {
  font-size: 16px;
  margin: 0 0 16px 0;
  color: $color-text-primary;
}

.legend-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;

  &.DTY { background-color: $color-success; }
  &.SCK, &.MED { background-color: $color-danger; }
  &.RLV, &.ULV { background-color: $color-warning; }
  &.TRX, &.REC { background-color: $color-primary; }
  &.FER, &.TRV { background-color: $color-chart-accent; }
  &.ADM { background-color: $color-text-secondary; }
}

.legend-label {
  font-size: 12px;
  color: $color-text-secondary;
}


.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(#0E2138, 0.4); /* Warna Navy Susi Air transparan */
  backdrop-filter: blur(4px); /* Efek blur ala Glassmorphism */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;
}

.modal-card {
  background-color: $color-surface;
  padding: 32px 24px;
  border-radius: 20px;
  width: 90%;
  max-width: 320px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transform: scale(0.95);
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.modal-icon-wrapper {
  background-color: rgba(#22C5E8, 0.1);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px auto;
  color: $color-chart-accent;
}

.modal-icon {
  width: 28px;
  height: 28px;
}

.modal-title {
  font-size: 18px;
  color: $color-primary;
  margin: 0 0 8px 0;
}

.modal-desc {
  font-size: 14px;
  color: $color-text-secondary;
  margin: 0 0 24px 0;
}

.btn-close {
  background-color: $color-primary;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 24px;
  font-weight: 600;
  width: 100%;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
}

@keyframes popIn {
  to { transform: scale(1); }
}
</style>