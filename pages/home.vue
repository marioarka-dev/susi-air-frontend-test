<template>
  <div class="home-container">
    <header class="dashboard-header">
      <div class="profile-section">
        <div class="avatar">
          {{ pilotStore.pilotInfo?.name.charAt(0) || 'P' }}
        </div>
        <div class="welcome-text">
          <p class="greeting">Good morning,</p>
          <h1 class="pilot-name">{{ pilotStore.pilotInfo?.name || 'Pilot' }}</h1>
        </div>
      </div>
      <div class="header-actions">
        <div class="notification">
          <BellIcon class="icon" />
          <span class="badge"></span>
        </div>
      </div>
    </header>

    <div class="stats-row">
      <div class="stat-card bento-card">
        <p class="stat-label">Total Flight Hours</p>
        <h2 class="stat-value">{{ pilotStore.totalHours }}</h2>
      </div>
    </div>

    <section class="section-container">
      <h3 class="section-title">Upcoming Flight</h3>
      <div class="flight-card bento-card">
        <div class="flight-header">
          <span class="flight-date"><CalendarIcon class="icon-sm" /> {{ pilotStore.upcomingFlight.date }}</span>
          <span class="flight-time"><ClockIcon class="icon-sm" /> {{ pilotStore.upcomingFlight.time }}</span>
        </div>
        <div class="route-info">
          <div class="route-point">
            <h2 class="code">{{ pilotStore.upcomingFlight.departure.code }}</h2>
            <p class="city">{{ pilotStore.upcomingFlight.departure.city }}</p>
          </div>
          <div class="route-divider">
            <PlaneIcon class="plane-icon" />
            <div class="line"></div>
          </div>
          <div class="route-point">
            <h2 class="code">{{ pilotStore.upcomingFlight.arrival.code }}</h2>
            <p class="city">{{ pilotStore.upcomingFlight.arrival.city }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-container">
      <h3 class="section-title">Latest News</h3>
      <div class="news-scroll">
        <div v-for="news in pilotStore.latestNews" :key="news.id" class="news-card bento-card">
          <h4 class="news-title">{{ news.title }}</h4>
          <p class="news-date">{{ news.date }}</p>
        </div>
      </div>
    </section>

    <!-- Hours to Limit Section -->
    <section class="section-container">
      <h3 class="section-title">Hours to Limit</h3>
      
      <!-- Grid 2x2 untuk 4 Kartu -->
      <div class="limit-grid">
        <div v-for="limit in pilotStore.currentLimits" :key="limit.label" class="limit-card bento-card">
          <p class="limit-label">{{ limit.label }}</p>
          <div class="limit-values">
            <span class="current-val">{{ limit.current }}</span>
            <span class="max-val">/ {{ limit.limit }}h</span>
          </div>
          <!-- Indikator Progress Bar -->
          <div class="progress-bg">
            <div 
              class="progress-fill" 
              :style="{ width: Math.min((limit.current / limit.limit) * 100, 100) + '%' }"
              :class="{ 
                'warning': (limit.current / limit.limit) > 0.8 && (limit.current / limit.limit) < 1, 
                'danger': (limit.current / limit.limit) >= 1 
              }"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Hours to Limit Section -->
    <section class="section-container">
      <h3 class="section-title">Hours to Limit</h3>
      
      <div class="limit-grid">
    
      </div>
      
    
      <FlightChart />
      
    </section>
    
    <!-- My Documents -->
    <section class="section-container">
      <div class="section-header">
        <h3 class="section-title">My Documents</h3>
        <span class="see-all">See All</span>
      </div>
      
      <div class="documents-list bento-card">
        <div v-for="doc in pilotStore.documents" :key="doc.id" class="document-item">
          <div class="doc-info">
            <FileTextIcon class="icon-doc" />
            <span class="doc-name">{{ doc.name }}</span>
          </div>
          <div :class="['status-badge', getBadgeClass(doc.expiryDays)]">
            {{ doc.expiryDays < 0 ? 'Expired' : `${doc.expiryDays} days` }}
          </div>
        </div>
      </div>
    </section>
    
  </div>
</template>

<script setup lang="ts">
import { usePilotStore } from '~/stores/pilot'
import { Bell as BellIcon, Calendar as CalendarIcon, Clock as ClockIcon, Plane as PlaneIcon, FileText as FileTextIcon } from 'lucide-vue-next'
import FlightChart from '~/components/FlightChart.vue'

// Inisialisasi store
const pilotStore = usePilotStore()

// Fungsi penentu warna lencana berdasarkan sisa hari
const getBadgeClass = (days: number) => {
  if (days < 0) return 'badge-red' // Expired
  if (days <= 30) return 'badge-amber' // Less than 30 days
  return 'badge-green' // More than 30 days
}
</script>

<style scoped lang="scss">
@use "~/assets/scss/main.scss" as *;

.home-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Header */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 48px;
  height: 48px;
  background-color: $color-primary;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
}

.greeting {
  font-size: 13px;
  color: $color-text-secondary;
  margin: 0 0 2px 0;
}

.pilot-name {
  font-size: 18px;
  color: $color-text-primary;
  margin: 0;
  font-weight: 700;
}

.notification {
  position: relative;
  background-color: $color-surface;
  padding: 10px;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  
  .icon {
    width: 20px;
    height: 20px;
    color: $color-text-primary;
  }
  
  .badge {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 8px;
    height: 8px;
    background-color: $color-brand;
    border-radius: 50%;
  }
}

/* Bento Card Global */
.bento-card {
  background-color: $color-surface;
  border-radius: $border-radius-card;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.section-title {
  font-size: 16px;
  margin: 0 0 12px 0;
  color: $color-text-primary;
  font-weight: 700;
}

.section-container {
  display: flex;
  flex-direction: column;
}

/* Stats */
.stat-label {
  font-size: 13px;
  color: $color-text-secondary;
  margin: 0 0 4px 0;
}
.stat-value {
  font-size: 24px;
  margin: 0;
  color: $color-primary;
}

/* Flight Card */
.flight-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 13px;
  color: $color-text-secondary;
  
  span {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .icon-sm {
    width: 14px;
    height: 14px;
  }
}

.route-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.route-point {
  text-align: center;
  
  .code {
    font-size: 28px;
    margin: 0;
    color: $color-primary;
  }
  
  .city {
    font-size: 12px;
    margin: 4px 0 0 0;
    color: $color-text-secondary;
  }
}

.route-divider {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: relative;
  
  .line {
    flex: 1;
    height: 1px;
    border-top: 2px dashed #E5E7EB;
  }
  
  .plane-icon {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: $color-primary;
    width: 20px;
    height: 20px;
    background-color: $color-surface;
    padding: 0 4px;
  }
}

/* News Scroll */
.news-scroll {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px; /* Ruang untuk scrollbar */
  
  /* Sembunyikan scrollbar bawaan tapi tetap bisa discroll */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.news-card {
  min-width: 240px;
  flex: 0 0 auto;
}

.news-title {
  margin: 0 0 8px 0;
  font-size: 14px;
  line-height: 1.4;
}

.news-date {
  margin: 0;
  font-size: 12px;
  color: $color-text-secondary;
}

/* Section Header (Bisa dipakai ulang) */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  .section-title {
    margin-bottom: 0;
  }

  .see-all {
    font-size: 13px;
    color: $color-brand;
    font-weight: 600;
    cursor: pointer;
  }
}

/* My Documents */
.documents-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.document-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
}

.doc-info {
  display: flex;
  align-items: center;
  gap: 12px;

  .icon-doc {
    color: $color-text-secondary;
    width: 20px;
    height: 20px;
  }

  .doc-name {
    font-size: 13px;
    font-weight: 600;
  }
}

.status-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;

  &.badge-green {
    background-color: rgba($color-success, 0.1);
    color: $color-success;
  }

  &.badge-amber {
    background-color: rgba($color-warning, 0.1);
    color: $color-warning;
  }

  &.badge-red {
    background-color: rgba($color-danger, 0.1);
    color: $color-danger;
  }
}

/* Limit Cards */
.limit-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.limit-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.limit-label {
  margin: 0;
  font-size: 13px;
  color: $color-text-secondary;
  font-weight: 600;
}

.limit-values {
  margin: 0;
}

.current-val {
  font-size: 20px;
  font-weight: 700;
  color: $color-primary;
}

.max-val {
  font-size: 13px;
  color: $color-text-secondary;
}

/* Progress Bar */
.progress-bg {
  height: 6px;
  background-color: #E5E7EB;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 4px;
}

.progress-fill {
  height: 100%;
  background-color: $color-success;
  border-radius: 4px;
  transition: width 0.3s ease, background-color 0.3s ease;
  
  /* Logika warna otomatis berdasarkan CSS class */
  &.warning {
    background-color: $color-warning;
  }
  &.danger {
    background-color: $color-danger;
  }
}
</style>