<script setup lang="ts">
import Topbar from '../components/common/Topbar.vue'
import { useFocusMode } from '../composables/useFocusMode'

const { isFocusMode, toggleFocusMode } = useFocusMode()
</script>

<template>
  <div id="settingsView" class="view-section active">
    <Topbar title="تنظیمات سیستم" />

    <section class="panel reveal d2" style="padding: 24px; border-radius: 20px;">
      <div class="panel-title">
        <h3>تنظیمات ظاهری و محیطی</h3>
        <span>PREFERENCES</span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 16px; margin-top: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px; background: rgba(255,255,255,0.03); border-radius: 12px;">
          <div>
            <div style="font-weight: 700; color: #fff;">حالت تمرکز (Focus Mode)</div>
            <div style="font-size: 11px; color: var(--muted); margin-top: 4px;">کاهش نور پس‌زمینه برای افزایش تمرکز روی دروس</div>
          </div>
          <button
            class="filter"
            :class="{ active: isFocusMode }"
            @click="toggleFocusMode"
            style="cursor: pointer;"
          >
            {{ isFocusMode ? 'فعال' : 'غیرفعال' }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
