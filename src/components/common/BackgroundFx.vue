<script setup lang="ts">
import { useMouseEffects } from '../../composables/useMouseEffects'

const { mouseX, mouseY, auroraATransform, auroraBTransform } = useMouseEffects()
</script>

<template>
  <div class="grid-bg"></div>
  <div class="noise"></div>

  <div class="aurora a" :style="{ transform: auroraATransform }"></div>
  <div class="aurora b" :style="{ transform: auroraBTransform }"></div>

  <div
    class="mouse-glow"
    id="mouseGlow"
    :style="{ left: `${mouseX}px`, top: `${mouseY}px` }"
  ></div>
</template>
