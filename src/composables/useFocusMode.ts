import { ref } from 'vue'

const isFocusMode = ref(false)

export function useFocusMode() {
  function toggleFocusMode() {
    isFocusMode.value = !isFocusMode.value
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('focus', isFocusMode.value)
      document.body.style.setProperty('--bg', isFocusMode.value ? '#03050a' : '#05070d')
    }
  }

  return {
    isFocusMode,
    toggleFocusMode
  }
}
