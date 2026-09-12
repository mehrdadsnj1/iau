<script setup lang="ts">
import Sidebar from '../components/layout/Sidebar.vue'
import AppFooter from '../components/layout/AppFooter.vue'
import BackgroundFx from '../components/common/BackgroundFx.vue'
import ClassModal from '../components/common/ClassModal.vue'
import { useSchedule } from '../composables/useSchedule'

const { isModalOpen, selectedClass, closeModal } = useSchedule()
</script>

<template>
  <BackgroundFx />

  <div class="app">
    <Sidebar />

    <main class="main">
      <router-view />
      <AppFooter />
    </main>
  </div>

  <ClassModal
    :is-open="isModalOpen"
    :class-item="selectedClass"
    @close="closeModal"
  />
</template>
