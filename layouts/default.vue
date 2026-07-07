<template>
  <div class="app-layout">
    <main class="main-content">
      <slot />
    </main>

    <nav class="bottom-nav">
      <NuxtLink to="/home" class="nav-item" exact-active-class="active">
        <HomeIcon class="icon" />
        <span>Home</span>
      </NuxtLink>
      <NuxtLink to="/schedule" class="nav-item" exact-active-class="active">
        <CalendarIcon class="icon" />
        <span>Schedule</span>
      </NuxtLink>
      <NuxtLink to="#" class="nav-item" exact-active-class="active">
        <BookIcon class="icon" />
        <span>Logbook</span>
      </NuxtLink>
      <NuxtLink to="#" class="nav-item" exact-active-class="active">
        <MenuIcon class="icon" />
        <span>More</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { Home as HomeIcon, Calendar as CalendarIcon, Book as BookIcon, Menu as MenuIcon } from 'lucide-vue-next'
</script>

<style scoped lang="scss">
@use "~/assets/scss/main.scss" as *;

.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: $color-bg;
}

.main-content {
  flex: 1;
  padding-bottom: 80px; /* Memberi ruang agar konten tidak tertutup navigasi */
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $color-surface;
  display: flex;
  justify-content: space-around;
  padding: 12px 0 24px 0; /* Padding bawah lebih besar untuk area aman layar HP */
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  color: $color-text-secondary;
  font-size: 12px;
  font-weight: 600;
  transition: color 0.2s;

  .icon {
    width: 24px;
    height: 24px;
    stroke-width: 2px;
  }

  &.active {
    color: $color-primary;
  }
}
</style>