<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  activeFilter: string
  searchQuery: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:activeFilter', filter: string): void
  (e: 'update:searchQuery', query: string): void
}>()

const searchInput = ref<HTMLInputElement | null>(null)

defineExpose({
  searchInput
})

const filterOptions = [
  { label: 'همه', value: 'all' },
  { label: 'شنبه', value: 'شنبه' },
  { label: 'یکشنبه', value: 'یکشنبه' },
  { label: 'دوشنبه', value: 'دوشنبه' },
  { label: 'سه‌شنبه', value: 'سه‌شنبه' },
  { label: 'چهارشنبه', value: 'چهارشنبه' }
]
</script>

<template>
  <div class="week-toolbar">
    <div class="filters">
      <button
        v-for="opt in filterOptions"
        :key="opt.value"
        class="filter"
        :class="{ active: activeFilter === opt.value }"
        :data-filter="opt.value"
        @click="emit('update:activeFilter', opt.value)"
      >
        {{ opt.label }}
      </button>
    </div>

    <input
      ref="searchInput"
      type="text"
      class="search"
      id="search"
      placeholder="جستجوی درس..."
      :value="searchQuery"
      @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
