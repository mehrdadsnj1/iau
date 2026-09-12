<script setup lang="ts">
import type { ClassItem, PersianDay } from '../../types/schedule'
import { formatTime } from '../../utils/formatters'

interface Props {
  classItem: ClassItem
  day: PersianDay
  isVisible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isVisible: true
})

const emit = defineEmits<{
  (e: 'select', item: ClassItem, day: PersianDay): void
}>()
</script>

<template>
  <article
    class="class-card"
    :class="[props.classItem.color, { hidden: !props.isVisible }]"
    :data-day="props.day"
    :data-name="props.classItem.name"
    :data-start="props.classItem.start"
    :data-end="props.classItem.end"
    :data-place="props.classItem.place"
    :data-code="props.classItem.code"
    @click="emit('select', props.classItem, props.day)"
  >
    <div class="class-top">
      <div class="class-time">
        ◷
        {{ formatTime(props.classItem.start) }}
        —
        {{ formatTime(props.classItem.end) }}
      </div>
      <span class="class-dot"></span>
    </div>

    <div class="class-name">
      {{ props.classItem.name }}
    </div>

    <div class="class-meta">
      <span>📍 {{ props.classItem.place }}</span>
    </div>

    <span class="code">
      {{ props.classItem.code }}
    </span>
  </article>
</template>
