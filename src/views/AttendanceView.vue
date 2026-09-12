<script setup lang="ts">
import Topbar from '../components/common/Topbar.vue'
import { ScheduleService } from '../services/schedule.service'
import { formatTime } from '../utils/formatters'

const classes = ScheduleService.getAllClasses()
</script>

<template>
  <div id="attendanceView" class="view-section active">
    <Topbar title="حضور و غیاب" />

    <section class="panel week-section reveal d2">
      <div class="panel-title">
        <h3>وضعیت حضور و غیاب نیم‌سال</h3>
        <span>ATTENDANCE MONITOR</span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 15px;">
        <div
          v-for="item in classes"
          :key="item.code"
          class="today-item"
          style="display: flex; justify-content: space-between; align-items: center;"
        >
          <div>
            <div class="today-course" style="font-weight: 700;">{{ item.name }}</div>
            <div class="today-place" style="font-size: 11px; color: var(--muted);">
              {{ item.day }} • {{ formatTime(item.start) }} — {{ formatTime(item.end) }}
            </div>
          </div>
          <div class="today-status current">
            ✓ مجاز (بدون غیبت)
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
