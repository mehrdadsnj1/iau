<script setup lang="ts">
import Topbar from '../components/common/Topbar.vue'
import DashboardGrid from '../components/dashboard/DashboardGrid.vue'
import { useSchedule } from '../composables/useSchedule'

const { todayLabel, todayClasses } = useSchedule()
</script>

<template>
  <div id="todayView" class="view-section active">
    <Topbar title="کلاس‌های امروز" />
    <DashboardGrid :today-label="todayLabel" :today-classes="todayClasses" />
  </div>
</template>
