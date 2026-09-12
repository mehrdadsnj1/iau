<script setup lang="ts">
import Topbar from '../components/common/Topbar.vue'
import { ScheduleService } from '../services/schedule.service'
import { formatTime } from '../utils/formatters'
import { useSchedule } from '../composables/useSchedule'

const classes = ScheduleService.getAllClasses()
const { openModal } = useSchedule()
</script>

<template>
  <div id="coursesView" class="view-section active">
    <Topbar title="لیست دروس ترم" />

    <section class="panel week-section reveal d2">
      <div class="panel-title">
        <h3>دروس انتخابی ترم جاری</h3>
        <span>COURSES CATALOG</span>
      </div>

      <div class="week-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; margin-top: 20px;">
        <article
          v-for="item in classes"
          :key="item.code"
          class="class-card"
          :class="item.color"
          @click="openModal(item, item.day)"
          style="cursor: pointer;"
        >
          <div class="class-top">
            <div class="class-time">
              ◷ {{ formatTime(item.start) }} — {{ formatTime(item.end) }}
            </div>
            <span class="class-dot"></span>
          </div>

          <div class="class-name">
            {{ item.name }}
          </div>

          <div class="class-meta">
            <span>📍 {{ item.place }}</span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
            <span class="meta-pill" style="font-size: 9px;">{{ item.day }}</span>
            <span class="code">{{ item.code }}</span>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
