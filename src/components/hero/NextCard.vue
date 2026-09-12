<script setup lang="ts">
import { useNextClass } from '../../composables/useNextClass'

const {
  nextClass,
  countdownText,
  progressPercent,
  formattedTimeRange,
  placeShort
} = useNextClass()
</script>

<template>
  <div class="next-card">
    <div class="next-label">نزدیک‌ترین کلاس</div>
    <div class="next-course" id="nextCourse">
      {{ nextClass?.name || 'در حال محاسبه...' }}
    </div>

    <div class="next-meta">
      <span class="meta-pill" id="nextDay">{{ nextClass?.day || '...' }}</span>
      <span class="meta-pill" id="nextTime">{{ formattedTimeRange }}</span>
      <span class="meta-pill" id="nextPlace">{{ placeShort }}</span>
    </div>

    <div class="countdown">
      <div>
        <div class="countdown-label">شروع کلاس در</div>
        <div class="countdown-value" id="countdown">{{ countdownText }}</div>
      </div>
      <div class="countdown-label">NEXT CLASS</div>
    </div>

    <div class="progress">
      <div
        class="progress-bar"
        id="progressBar"
        :style="{ width: `${progressPercent}%` }"
      ></div>
    </div>
  </div>
</template>
