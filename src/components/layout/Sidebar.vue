<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useFocusMode } from '../../composables/useFocusMode'

const route = useRoute()
const router = useRouter()
const { toggleFocusMode } = useFocusMode()

function navigateTo(path: string) {
  router.push(path)
}
</script>

<template>
  <aside class="sidebar">
    <div class="brand">
      <div class="brand-logo">🎓</div>
      <div>
        <div class="brand-title">University OS</div>
        <div class="brand-sub">STUDENT DASHBOARD</div>
      </div>
    </div>

    <div class="nav-label">WORKSPACE</div>
    <nav class="nav">
      <button
        class="nav-item"
        :class="{ active: route.path === '/' || route.path === '/weekly' }"
        id="navWeekly"
        @click="navigateTo('/')"
      >
        <span class="nav-icon">◫</span>
        برنامه هفتگی
      </button>

      <button
        class="nav-item"
        :class="{ active: route.path === '/raha' }"
        id="navRaha"
        @click="navigateTo('/raha')"
      >
        <span class="nav-icon" style="color: #9b6dff;">♥</span>
        برنامه‌ریزی رها
      </button>

      <button
        class="nav-item"
        :class="{ active: route.path === '/today' }"
        id="navToday"
        @click="navigateTo('/today')"
      >
        <span class="nav-icon">◷</span>
        کلاس‌های امروز
      </button>

      <button
        class="nav-item"
        :class="{ active: route.path === '/attendance' }"
        id="navAttendance"
        @click="navigateTo('/attendance')"
      >
        <span class="nav-icon">✓</span>
        حضور و غیاب
      </button>

      <button
        class="nav-item"
        :class="{ active: route.path === '/courses' }"
        id="navCourses"
        @click="navigateTo('/courses')"
      >
        <span class="nav-icon">▣</span>
        دروس
      </button>
    </nav>

    <div class="nav-label">SYSTEM</div>
    <nav class="nav">
      <button class="nav-item" id="themeButton" @click="toggleFocusMode">
        <span class="nav-icon">☼</span>
        تغییر ظاهر
      </button>
      <button class="nav-item" @click="navigateTo('/settings')">
        <span class="nav-icon">⚙</span>
        تنظیمات
      </button>
    </nav>

    <div class="side-spacer"></div>

    <div class="side-profile">
      <div class="profile-top">
        <div class="avatar">👨🏻‍💻</div>
        <div>
          <div class="profile-name">دانشجو</div>
          <div class="profile-status">
            <span>●</span>
            ترم فعال
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
