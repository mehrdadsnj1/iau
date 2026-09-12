<script setup lang="ts">
import Topbar from '../components/common/Topbar.vue'
import HeroSection from '../components/hero/HeroSection.vue'
import DashboardGrid from '../components/dashboard/DashboardGrid.vue'
import ScheduleGrid from '../components/schedule/ScheduleGrid.vue'
import { useSchedule } from '../composables/useSchedule'

const {
  rawSchedule,
  activeFilter,
  searchQuery,
  todayLabel,
  todayClasses,
  isDayVisible,
  isClassVisible,
  setFilter,
  openModal
} = useSchedule()
</script>

<template>
  <div id="rahaView" class="view-section active">
    <Topbar title="برنامه‌ریزی رها" />
    <div class="raha-container">
      <HeroSection />
      <DashboardGrid :today-label="todayLabel" :today-classes="todayClasses" />
      <ScheduleGrid
        :schedule="rawSchedule"
        :active-filter="activeFilter"
        :search-query="searchQuery"
        :is-day-visible="isDayVisible"
        :is-class-visible="isClassVisible"
        @update:active-filter="setFilter"
        @update:search-query="searchQuery = $event"
        @select-class="openModal"
      />
    </div>
  </div>
</template>
