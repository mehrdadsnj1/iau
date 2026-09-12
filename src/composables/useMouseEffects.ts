import { ref, onMounted, onUnmounted } from 'vue'

export function useMouseEffects() {
  const mouseX = ref(0)
  const mouseY = ref(0)
  const auroraATransform = ref('')
  const auroraBTransform = ref('')

  function handleMouseMove(event: MouseEvent) {
    mouseX.value = event.clientX
    mouseY.value = event.clientY

    const x = event.clientX / window.innerWidth - 0.5
    const y = event.clientY / window.innerHeight - 0.5

    auroraATransform.value = `translate(${x * -35}px, ${y * -25}px)`
    auroraBTransform.value = `translate(${x * 25}px, ${y * 20}px)`
  }

  onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
  })

  return {
    mouseX,
    mouseY,
    auroraATransform,
    auroraBTransform
  }
}
