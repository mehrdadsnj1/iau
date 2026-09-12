<script setup lang="ts">
import { useClock } from '../../composables/useClock'
import { useFocusMode } from '../../composables/useFocusMode'

interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'برنامه هفتگی'
})

const { clock, todayDate } = useClock()
const { isFocusMode, toggleFocusMode } = useFocusMode()
</script>

<template>
  <div class="topbar reveal d1">
    <div class="page-title">
      <div class="mobile-brand-tag">
        <span class="mobile-brand-icon">🎓</span>
        <span>University OS</span>
      </div>
      <h1>{{ title }}</h1>
      <p id="todayDate">{{ todayDate }}</p>
    </div>

    <div class="top-actions">
      <div class="clock-box">
        <span class="live-dot"></span>
        <span id="clock">{{ clock }}</span>
      </div>

      <button
        class="icon-button"
        id="focusButton"
        :class="{ active: isFocusMode }"
        title="تمرکز"
        @click="toggleFocusMode"
      >
        ✦
      </button>
    </div>
  </div>
</template>
