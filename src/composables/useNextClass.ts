import { ref, onMounted, onUnmounted, computed } from 'vue'
import type { NextClassItem, PersianDay } from '../types/schedule'
import { ScheduleService } from '../services/schedule.service'
import { orderedDays, currentDay, minutes, faDigits, formatTime } from '../utils/formatters'

export function useNextClass() {
  const nextClass = ref<NextClassItem | null>(null)
  let intervalId: ReturnType<typeof setInterval> | null = null

  function calculateNextClass(): NextClassItem | null {
    const now = new Date()
    const day = currentDay()
    const currentIndex = orderedDays.indexOf(day)
    const currentMinutes = now.getHours() * 60 + now.getMinutes()

    let best: NextClassItem | null = null
    let bestDistance = Infinity

    const schedule = ScheduleService.getSchedule()

    orderedDays.forEach((dayName, index) => {
      const classes = schedule[dayName] || []

      classes.forEach(item => {
        let dayDistance = index - currentIndex
        if (dayDistance < 0) {
          dayDistance += 5
        }

        const classMinutes = minutes(item.start)
        const distance = dayDistance * 1440 + classMinutes - currentMinutes

        if (dayDistance === 0 && classMinutes < currentMinutes) {
          return
        }

        if (distance >= 0 && distance < bestDistance) {
          bestDistance = distance
          best = {
            ...item,
            day: dayName as PersianDay,
            distance
          }
        }
      })
    })

    return best
  }

  function update() {
    nextClass.value = calculateNextClass()
  }

  const countdownText = computed(() => {
    if (!nextClass.value) return '--'
    const hours = Math.floor(nextClass.value.distance / 60)
    const mins = nextClass.value.distance % 60
    return hours > 0
      ? `${faDigits(hours)}س ${faDigits(mins)}د`
      : `${faDigits(mins)} دقیقه`
  })

  const progressPercent = computed(() => {
    if (!nextClass.value) return 4
    return Math.max(4, Math.min(100, 100 - (nextClass.value.distance / (3 * 60)) * 100))
  })

  const formattedTimeRange = computed(() => {
    if (!nextClass.value) return '...'
    return `${formatTime(nextClass.value.start)} — ${formatTime(nextClass.value.end)}`
  })

  const placeShort = computed(() => {
    if (!nextClass.value) return '...'
    return nextClass.value.place.split('•')[1]?.trim() || 'دانشگاه'
  })

  onMounted(() => {
    update()
    intervalId = setInterval(update, 1000)
  })

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  })

  return {
    nextClass,
    countdownText,
    progressPercent,
    formattedTimeRange,
    placeShort,
    update
  }
}
