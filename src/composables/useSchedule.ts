import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { ClassItem, PersianDay, TodayClassItem } from '../types/schedule'
import { ScheduleService } from '../services/schedule.service'
import { currentDay, minutes } from '../utils/formatters'

// Shared reactive state
const activeFilter = ref<string>('all')
const searchQuery = ref<string>('')
const selectedClass = ref<(ClassItem & { day: PersianDay }) | null>(null)
const isModalOpen = ref<boolean>(false)

export function useSchedule() {
  const searchInputRef = ref<HTMLInputElement | null>(null)
  const rawSchedule = ScheduleService.getSchedule()

  function openModal(classItem: ClassItem, day: PersianDay) {
    selectedClass.value = { ...classItem, day }
    isModalOpen.value = true
  }

  function closeModal() {
    isModalOpen.value = false
    selectedClass.value = null
  }

  function setFilter(filter: string) {
    activeFilter.value = filter
  }

  function isDayVisible(day: string): boolean {
    if (activeFilter.value === 'all') return true
    return activeFilter.value === day
  }

  function isClassVisible(classItem: ClassItem): boolean {
    const query = searchQuery.value.trim().toLowerCase()
    if (!query) return true
    const text = `${classItem.name} ${classItem.place}`.toLowerCase()
    return text.includes(query)
  }

  // Today's classes with live status
  const todayDayName = computed<PersianDay>(() => currentDay())

  const todayLabel = computed(() => {
    const day = todayDayName.value
    return day === 'جمعه' || day === 'پنجشنبه' ? 'روز آزاد' : day
  })

  const todayClasses = computed<TodayClassItem[]>(() => {
    const day = todayDayName.value
    const classes = rawSchedule[day] || []
    if (!classes.length) return []

    const now = new Date()
    const nowMinutes = now.getHours() * 60 + now.getMinutes()

    return classes.map(item => {
      const startMin = minutes(item.start)
      const endMin = minutes(item.end)

      let status: 'برگزار شد' | 'در حال برگزاری' | 'بعدی' = 'بعدی'
      let current = false

      if (nowMinutes >= startMin && nowMinutes < endMin) {
        status = 'در حال برگزاری'
        current = true
      } else if (nowMinutes > endMin) {
        status = 'برگزار شد'
      }

      return {
        ...item,
        status,
        current
      }
    })
  })

  // Keyboard handler for ESC and /
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isModalOpen.value) {
      closeModal()
    }
    if (event.key === '/' && document.activeElement?.tagName !== 'INPUT') {
      event.preventDefault()
      const searchEl = document.getElementById('search') as HTMLInputElement | null
      if (searchEl) {
        searchEl.focus()
      }
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })

  return {
    rawSchedule,
    activeFilter,
    searchQuery,
    selectedClass,
    isModalOpen,
    searchInputRef,
    todayLabel,
    todayClasses,
    todayDayName,
    openModal,
    closeModal,
    setFilter,
    isDayVisible,
    isClassVisible
  }
}
