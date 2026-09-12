<script setup lang="ts">
import { ref } from 'vue'
import WeekToolbar from './WeekToolbar.vue'
import ClassCard from './ClassCard.vue'
import type { ClassItem, PersianDay, ScheduleData } from '../../types/schedule'
import { orderedDays, currentDay, faDigits } from '../../utils/formatters'

interface Props {
  schedule: ScheduleData
  activeFilter: string
  searchQuery: string
  isDayVisible: (day: string) => boolean
  isClassVisible: (classItem: ClassItem) => boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:activeFilter', filter: string): void
  (e: 'update:searchQuery', query: string): void
  (e: 'selectClass', item: ClassItem, day: PersianDay): void
}>()

const toolbarRef = ref<InstanceType<typeof WeekToolbar> | null>(null)

defineExpose({
  toolbarRef
})
</script>

<template>
  <section class="panel week-section reveal d3">
    <div class="panel-title">
      <h3>تقویم کلاس‌ها</h3>
      <span>WEEKLY SCHEDULE</span>
    </div>

    <WeekToolbar
      ref="toolbarRef"
      :active-filter="activeFilter"
      :search-query="searchQuery"
      @update:active-filter="emit('update:activeFilter', $event)"
      @update:search-query="emit('update:searchQuery', $event)"
    />

    <div class="week-scroll">
      <div class="week-grid" id="weekGrid">
        <section
          v-for="day in orderedDays"
          :key="day"
          class="day"
          :class="{
            today: currentDay() === day,
            hidden: !isDayVisible(day)
          }"
          :data-day="day"
        >
          <div class="day-head">
            <div>
              <div class="day-name">{{ day }}</div>
            </div>

            <div class="day-count">
              {{ faDigits((schedule[day] || []).length) }}
            </div>
          </div>

          <div class="day-list">
            <template v-if="(schedule[day] || []).length">
              <ClassCard
                v-for="item in schedule[day]"
                :key="item.code"
                :class-item="item"
                :day="day"
                :is-visible="isClassVisible(item)"
                @select="emit('selectClass', $event, day)"
              />
            </template>
            <div v-else class="empty-day">
              ✦ روز آزاد
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>
