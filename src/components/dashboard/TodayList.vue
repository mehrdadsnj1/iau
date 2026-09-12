<script setup lang="ts">
import type { TodayClassItem } from '../../types/schedule'
import { formatTime } from '../../utils/formatters'

interface Props {
  todayLabel: string
  classes: TodayClassItem[]
}

defineProps<Props>()
</script>

<template>
  <div class="panel">
    <div class="panel-title">
      <h3>کلاس‌های امروز</h3>
      <span id="todayLabel">{{ todayLabel }}</span>
    </div>

    <div class="today-list" id="todayList">
      <div
        v-if="!classes.length"
        style="color: var(--muted); font-size: 10px; padding: 20px 0; text-align: center;"
      >
        🎉 امروز کلاس نداری
      </div>

      <div
        v-else
        v-for="item in classes"
        :key="item.code"
        class="today-item"
      >
        <div class="today-time">
          {{ formatTime(item.start) }} — {{ formatTime(item.end) }}
        </div>

        <div>
          <div class="today-course">{{ item.name }}</div>
          <div class="today-place">{{ item.place }}</div>
        </div>

        <div class="today-status" :class="{ current: item.current }">
          {{ item.status }}
        </div>
      </div>
    </div>
  </div>
</template>
