<script setup lang="ts">
import TodayList from './TodayList.vue'
import ProgressRing from './ProgressRing.vue'
import type { TodayClassItem } from '../../types/schedule'

interface Props {
  todayLabel: string
  todayClasses: TodayClassItem[]
}

defineProps<Props>()
</script>

<template>
  <section class="dashboard-grid reveal d2">
    <TodayList :today-label="todayLabel" :classes="todayClasses" />
    <ProgressRing />
  </section>
</template>
