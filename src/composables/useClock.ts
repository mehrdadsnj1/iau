import { ref, onMounted, onUnmounted } from 'vue'
import { faDigits } from '../utils/formatters'

export function useClock() {
  const clock = ref('۰۰:۰۰:۰۰')
  const todayDate = ref('...')
  const now = ref(new Date())
  let timer: ReturnType<typeof setInterval> | null = null

  function updateClock() {
    const current = new Date()
    now.value = current

    const h = String(current.getHours()).padStart(2, '0')
    const m = String(current.getMinutes()).padStart(2, '0')
    const s = String(current.getSeconds()).padStart(2, '0')

    clock.value = `${faDigits(h)}:${faDigits(m)}:${faDigits(s)}`

    todayDate.value = current.toLocaleDateString('fa-IR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    })
  }

  onMounted(() => {
    updateClock()
    timer = setInterval(updateClock, 1000)
  })

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  })

  return {
    clock,
    todayDate,
    now,
    updateClock
  }
}
