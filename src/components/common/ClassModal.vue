<script setup lang="ts">
import type { ClassItem, PersianDay } from '../../types/schedule'
import { formatTime } from '../../utils/formatters'

interface Props {
  isOpen: boolean
  classItem: (ClassItem & { day: PersianDay }) | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

function onBackdropClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}
</script>

<template>
  <div
    class="modal"
    id="modal"
    :class="{ active: props.isOpen }"
    @click="onBackdropClick"
  >
    <div class="modal-card" v-if="props.classItem">
      <div class="modal-top">
        <div class="modal-title" id="modalTitle">جزئیات کلاس</div>
        <button class="close" id="closeModal" @click="emit('close')">✕</button>
      </div>

      <div class="modal-content">
        <div class="modal-row">
          <span class="modal-label">درس</span>
          <span class="modal-value" id="modalCourse">{{ props.classItem.name }}</span>
        </div>

        <div class="modal-row">
          <span class="modal-label">روز</span>
          <span class="modal-value" id="modalDay">{{ props.classItem.day }}</span>
        </div>

        <div class="modal-row">
          <span class="modal-label">ساعت</span>
          <span class="modal-value" id="modalTime">
            {{ formatTime(props.classItem.start) }} — {{ formatTime(props.classItem.end) }}
          </span>
        </div>

        <div class="modal-row">
          <span class="modal-label">مکان</span>
          <span class="modal-value" id="modalPlace">{{ props.classItem.place }}</span>
        </div>

        <div class="modal-row">
          <span class="modal-label">کد درس</span>
          <span class="modal-value" id="modalCode">{{ props.classItem.code }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
