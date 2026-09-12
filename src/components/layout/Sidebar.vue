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
        <span class="nav-text">
          <span class="nav-text-desktop">برنامه هفتگی</span>
          <span class="nav-text-mobile">هفتگی</span>
        </span>
      </button>

      <button
        class="nav-item"
        :class="{ active: route.path === '/raha' }"
        id="navRaha"
        @click="navigateTo('/raha')"
      >
        <span class="nav-icon" style="color: #9b6dff;">♥</span>
        <span class="nav-text">
          <span class="nav-text-desktop">برنامه‌ریزی رها</span>
          <span class="nav-text-mobile">رها</span>
        </span>
      </button>

      <button
        class="nav-item"
        :class="{ active: route.path === '/today' }"
        id="navToday"
        @click="navigateTo('/today')"
      >
        <span class="nav-icon">◷</span>
        <span class="nav-text">
          <span class="nav-text-desktop">کلاس‌های امروز</span>
          <span class="nav-text-mobile">امروز</span>
        </span>
      </button>

      <button
        class="nav-item"
        :class="{ active: route.path === '/attendance' }"
        id="navAttendance"
        @click="navigateTo('/attendance')"
      >
        <span class="nav-icon">✓</span>
        <span class="nav-text">
          <span class="nav-text-desktop">حضور و غیاب</span>
          <span class="nav-text-mobile">حضور</span>
        </span>
      </button>

      <button
        class="nav-item"
        :class="{ active: route.path === '/courses' }"
        id="navCourses"
        @click="navigateTo('/courses')"
      >
        <span class="nav-icon">▣</span>
        <span class="nav-text">
          <span class="nav-text-desktop">دروس</span>
          <span class="nav-text-mobile">دروس</span>
        </span>
      </button>
    </nav>

    <div class="nav-label">SYSTEM</div>
    <nav class="nav">
      <button class="nav-item nav-item-theme" id="themeButton" @click="toggleFocusMode">
        <span class="nav-icon">☼</span>
        <span class="nav-text">تغییر ظاهر</span>
      </button>
      <button
        class="nav-item"
        :class="{ active: route.path === '/settings' }"
        id="navSettings"
        @click="navigateTo('/settings')"
      >
        <span class="nav-icon">⚙</span>
        <span class="nav-text">
          <span class="nav-text-desktop">تنظیمات</span>
          <span class="nav-text-mobile">تنظیمات</span>
        </span>
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
