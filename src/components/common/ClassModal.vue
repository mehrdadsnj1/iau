<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { ClassItem, PersianDay } from '../../types/schedule'
import { formatTime, faDigits, englishDays, currentDay, minutes } from '../../utils/formatters'

interface Props {
  isOpen: boolean
  classItem: (ClassItem & { day: PersianDay }) | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

const route = useRoute()

// GIF url served statically by Vite from public directory
const yesGifUrl = '/images/New%20Years%20Yes%20Sticker%20by%20Nora%20Fikse.gif'

// Force Raha mode if on /raha or user manually toggles
const manualRahaToggle = ref<boolean | null>(null)
const isRahaActive = computed(() => {
  if (manualRahaToggle.value !== null) {
    return manualRahaToggle.value
  }
  return route.path === '/raha'
})

// Toast notification state
const toastMessage = ref<string>('')
const showToast = ref<boolean>(false)
let toastTimeout: number | undefined

function triggerToast(msg: string) {
  toastMessage.value = msg
  showToast.value = true
  if (toastTimeout) window.clearTimeout(toastTimeout)
  toastTimeout = window.setTimeout(() => {
    showToast.value = false
  }, 2200)
}

// Celebration / Sparkle particles effect
interface Particle {
  id: number
  x: number
  y: number
  size: number
  emoji: string
  color: string
}
const particles = ref<Particle[]>([])

function triggerCelebration(event?: MouseEvent | TouchEvent) {
  const emojis = ['✨', '★', '💜', '✦', '🎉', '💫', '🌸']
  const colors = ['#9b6dff', '#47d9ff', '#ff7eb6', '#ffdd57', '#ffffff']
  const newParticles: Particle[] = []

  let originX = window.innerWidth / 2
  let originY = window.innerHeight / 2

  if (event) {
    if ('clientX' in event && typeof event.clientX === 'number' && event.clientX > 0) {
      originX = event.clientX
      originY = event.clientY
    } else if ('touches' in event && event.touches && event.touches[0]) {
      originX = event.touches[0].clientX
      originY = event.touches[0].clientY
    }
  }

  for (let i = 0; i < 24; i++) {
    const angle = Math.random() * Math.PI * 2
    const distance = 30 + Math.random() * 140
    newParticles.push({
      id: Date.now() + i,
      x: Math.max(20, Math.min(window.innerWidth - 20, originX + Math.cos(angle) * distance)),
      y: Math.max(20, Math.min(window.innerHeight - 20, originY + Math.sin(angle) * distance)),
      size: 14 + Math.random() * 18,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      color: colors[Math.floor(Math.random() * colors.length)]
    })
  }

  particles.value = newParticles
  triggerToast('انرژی مثبت و موفقیت در کلاس! ✨')

  setTimeout(() => {
    particles.value = []
  }, 1400)
}

// Course details helpers
const courseIcon = computed(() => {
  if (!props.classItem) return '📚'
  const name = props.classItem.name
  if (name.includes('وب') || name.includes('پیشرفته')) return '💻'
  if (name.includes('موبایل')) return '📱'
  if (name.includes('داده')) return '🗄️'
  if (name.includes('شبکه') || name.includes('امنیت')) return '🛡️'
  if (name.includes('گرافیک') || name.includes('آزمایشگاه')) return '🎨'
  if (name.includes('مدار') || name.includes('گسسته')) return '⚡'
  if (name.includes('سیستم')) return '📊'
  return '🎓'
})

const courseCategory = computed(() => {
  if (!props.classItem) return 'درس تخصصی'
  const name = props.classItem.name
  if (name.includes('آزمایشگاه')) return 'آزمایشگاه و کارگاه تخصصی'
  if (name.includes('مبانی') || name.includes('مدار')) return 'دروس پایه و تخصصی مهندسی'
  return 'دروس تخصصی مهندسی کامپیوتر'
})

// Calculate live status of the class
const classLiveStatus = computed(() => {
  if (!props.classItem) return { text: 'برنامه‌ریزی شده', status: 'upcoming' }
  const today = currentDay()
  if (props.classItem.day !== today) {
    return {
      text: `کلاس روز ${props.classItem.day}`,
      status: 'scheduled'
    }
  }

  const now = new Date()
  const nowMin = now.getHours() * 60 + now.getMinutes()
  const startMin = minutes(props.classItem.start)
  const endMin = minutes(props.classItem.end)

  if (nowMin >= startMin && nowMin < endMin) {
    return { text: 'در حال برگزاری هم‌اکنون', status: 'live' }
  } else if (nowMin > endMin) {
    return { text: 'کلاس امروز برگزار شد', status: 'past' }
  } else {
    const diff = startMin - nowMin
    if (diff <= 60) {
      return { text: `شروع تا ${faDigits(diff)} دقیقه دیگر`, status: 'soon' }
    }
    return { text: 'کلاس بعدی امروز', status: 'upcoming' }
  }
})

// Duration formatted in Persian
const classDuration = computed(() => {
  if (!props.classItem) return '—'
  const diff = minutes(props.classItem.end) - minutes(props.classItem.start)
  const hours = Math.floor(diff / 60)
  const mins = diff % 60
  if (hours > 0 && mins > 0) {
    return `${faDigits(hours)} ساعت و ${faDigits(mins)} دقیقه`
  } else if (hours > 0) {
    return `${faDigits(hours)} ساعت`
  }
  return `${faDigits(diff)} دقیقه`
})

// Quick copy actions
function copyToClipboard(text: string, label: string) {
  navigator.clipboard.writeText(text).then(
    () => triggerToast(`${label} در حافظه کپی شد! ✓`),
    () => triggerToast('خطا در دسترسی به کلیپ‌بورد')
  )
}

function copyFullSummary() {
  if (!props.classItem) return
  const item = props.classItem
  const summary = `🎓 درس: ${item.name}
📅 روز: ${item.day}
⏰ ساعت: ${item.start} الی ${item.end}
📍 مکان: ${item.place}
🔢 کد درس: ${item.code}`
  copyToClipboard(summary, 'مشخصات کامل کلاس')
}

function onBackdropClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}
</script>

<template>
  <div
    class="modal"
    id="modal"
    :class="{
      active: props.isOpen,
      'raha-theme-active': isRahaActive
    }"
    @click="onBackdropClick"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modalCourse"
  >
    <!-- Background Animated GIF and Aura Layer (Active for Raha) -->
    <div v-if="isRahaActive" class="raha-modal-backdrop-fx" aria-hidden="true">
      <!-- Glow Gradients -->
      <div class="raha-glow-circle circle-1"></div>
      <div class="raha-glow-circle circle-2"></div>

      <!-- Animated Yes Sticker floating in Background -->
      <div class="raha-gif-backdrop-frame">
        <img
          :src="yesGifUrl"
          class="raha-gif-backdrop-img"
          alt="New Years Yes Animated Sticker"
        />
      </div>

      <!-- Ambient Background Stars (Viewport perimeter) -->
      <div class="raha-sparkle-stars">
        <span class="sparkle-star star-1">
          <svg viewBox="0 0 24 24" class="star-svg-ambient"><path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="currentColor"/></svg>
        </span>
        <span class="sparkle-star star-2">
          <svg viewBox="0 0 24 24" class="star-svg-ambient"><path d="M12 2L15 8.5L22 9.5L17 14.5L18.5 21.5L12 18L5.5 21.5L7 14.5L2 9.5L9 8.5L12 2Z" fill="currentColor"/></svg>
        </span>
        <span class="sparkle-star star-3">
          <svg viewBox="0 0 24 24" class="star-svg-ambient"><path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="currentColor"/></svg>
        </span>
        <span class="sparkle-star star-4">
          <svg viewBox="0 0 24 24" class="star-svg-ambient"><path d="M12 2L15 8.5L22 9.5L17 14.5L18.5 21.5L12 18L5.5 21.5L7 14.5L2 9.5L9 8.5L12 2Z" fill="currentColor"/></svg>
        </span>
      </div>
    </div>

    <!-- Modal Card Wrapper with Card-Anchored Stars -->
    <div
      class="raha-modal-card-wrapper"
      v-if="props.classItem"
    >
      <!-- Anchored Stars (Always 100% visible on mobile and desktop framing the card) -->
      <div v-if="isRahaActive" class="raha-card-anchored-stars" aria-hidden="true">
        <!-- Top Right Corner Star -->
        <span class="card-star c-star-tr" title="ستاره">
          <svg viewBox="0 0 24 24" class="star-svg"><path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="currentColor"/></svg>
        </span>
        <!-- Top Left Corner Star -->
        <span class="card-star c-star-tl">
          <svg viewBox="0 0 24 24" class="star-svg"><path d="M12 2L15 8.5L22 9.5L17 14.5L18.5 21.5L12 18L5.5 21.5L7 14.5L2 9.5L9 8.5L12 2Z" fill="currentColor"/></svg>
        </span>
        <!-- Bottom Left Corner Star -->
        <span class="card-star c-star-bl">
          <svg viewBox="0 0 24 24" class="star-svg"><path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="currentColor"/></svg>
        </span>
        <!-- Bottom Right Corner Star -->
        <span class="card-star c-star-br">
          <svg viewBox="0 0 24 24" class="star-svg"><path d="M12 2L15 8.5L22 9.5L17 14.5L18.5 21.5L12 18L5.5 21.5L7 14.5L2 9.5L9 8.5L12 2Z" fill="currentColor"/></svg>
        </span>
        <!-- Top Center Glow Star -->
        <span class="card-star c-star-tc">
          <svg viewBox="0 0 24 24" class="star-svg"><path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="currentColor"/></svg>
        </span>
      </div>

      <!-- Modal Card -->
      <div
        class="modal-card"
        :class="{ 'raha-modal-glass-card': isRahaActive }"
      >
        <!-- Raha Special Top Header Badge with Animated Sticker -->
        <div v-if="isRahaActive" class="raha-modal-hero-badge">
          <div class="raha-badge-content">
            <div
              class="raha-sticker-avatar"
              @click="triggerCelebration($event)"
              title="انرژی مثبت! کلیک کن ✨"
            >
              <img
                :src="yesGifUrl"
                class="raha-sticker-thumbnail"
                alt="Yes Sticker"
              />
              <span class="raha-sticker-pulse"></span>
            </div>
            <div class="raha-badge-text-group">
              <div class="raha-badge-top-row">
                <span class="raha-badge-tag">💜 برنامه‌ریزی اختصاصی رها</span>
                <span class="raha-badge-pill">ترم فعال</span>
              </div>
              <div class="raha-badge-sub">انرژی مثبت، پشتکار و موفقیت تحصیلی ✨</div>
            </div>
          </div>

          <button
            class="raha-close-btn"
            id="closeModal"
            @click="emit('close')"
            aria-label="بستن پنجره"
            title="بستن (Esc)"
          >
            ✕
          </button>
        </div>

        <!-- Standard Top Bar for non-Raha mode -->
        <div v-else class="modal-top">
          <div class="modal-title" id="modalTitle">جزئیات کلاس</div>
          <button class="close" id="closeModal" @click="emit('close')">✕</button>
        </div>

        <!-- Main Course Header -->
        <div class="modal-course-hero">
          <div class="modal-course-symbol" :class="props.classItem.color || 'c-purple'">
            <span>{{ courseIcon }}</span>
          </div>
          <div class="modal-course-meta">
            <span class="modal-course-badge">{{ courseCategory }}</span>
            <h2 class="modal-course-title" id="modalCourse">{{ props.classItem.name }}</h2>
          </div>
        </div>

        <!-- Live Status & Duration Bar -->
        <div class="modal-status-strip" :class="'status-' + classLiveStatus.status">
          <div class="status-indicator">
            <span class="status-dot"></span>
            <span class="status-label">{{ classLiveStatus.text }}</span>
          </div>
          <div class="status-duration">
            <span>طول جلسه:</span>
            <strong>{{ classDuration }}</strong>
          </div>
        </div>

        <!-- Modular Info Grid (Replaces plain boring list) -->
        <div class="modal-info-grid">
          <!-- Day & Time Card -->
          <div class="info-tile">
            <div class="tile-icon">⏰</div>
            <div class="tile-body">
              <div class="tile-label">روز و زمان برگزاری</div>
              <div class="tile-val-main" id="modalDay">
                {{ props.classItem.day }}
                <span class="tile-sub">({{ englishDays[props.classItem.day] || '' }})</span>
              </div>
              <div class="tile-val-sub" id="modalTime">
                ساعت {{ formatTime(props.classItem.start) }} الی {{ formatTime(props.classItem.end) }}
              </div>
            </div>
          </div>

          <!-- Location Card -->
          <div class="info-tile">
            <div class="tile-icon">📍</div>
            <div class="tile-body">
              <div class="tile-label">محل و سایت تشکیل</div>
              <div class="tile-val-main" id="modalPlace">
                {{ props.classItem.place }}
              </div>
              <button
                class="tile-copy-btn"
                @click="copyToClipboard(props.classItem.place, 'آدرس کلاس')"
                title="کپی کردن آدرس کلاس"
              >
                ⧉ کپی آدرس
              </button>
            </div>
          </div>

          <!-- Course Code Card -->
          <div class="info-tile">
            <div class="tile-icon">🏷️</div>
            <div class="tile-body">
              <div class="tile-label">کد درس و شناسه سامانه</div>
              <div class="tile-val-main code-font" id="modalCode">
                {{ props.classItem.code }}
              </div>
              <button
                class="tile-copy-btn"
                @click="copyToClipboard(props.classItem.code, 'کد درس')"
                title="کپی کردن کد درس"
              >
                ⧉ کپی کد
              </button>
            </div>
          </div>

          <!-- Course Properties Card -->
          <div class="info-tile">
            <div class="tile-icon">📊</div>
            <div class="tile-body">
              <div class="tile-label">مشخصات تحصیلی</div>
              <div class="tile-val-main">
                ۳ واحد نظری / عملی
              </div>
              <div class="tile-val-sub text-success">
                ✓ دارای سهمیه حضور و غیاب
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Action Buttons -->
        <div class="modal-footer-actions">
          <button
            class="action-btn primary-action"
            @click="copyFullSummary()"
          >
            <span>📋</span>
            کپی مشخصات کلاس
          </button>

          <button
            v-if="isRahaActive"
            class="action-btn celebrate-action"
            @click="triggerCelebration($event)"
          >
            <span>✨</span>
            انرژی مثبت!
          </button>

          <button
            class="action-btn dismiss-action"
            @click="emit('close')"
          >
            بستن
          </button>
        </div>
      </div>
    </div>

    <!-- Floating Celebration Particles -->
    <div
      v-for="p in particles"
      :key="p.id"
      class="celebration-particle"
      :style="{
        left: `${p.x}px`,
        top: `${p.y}px`,
        fontSize: `${p.size}px`,
        color: p.color
      }"
    >
      {{ p.emoji }}
    </div>

    <!-- Toast Notification -->
    <transition name="toast-fade">
      <div v-if="showToast" class="modal-toast-bubble">
        {{ toastMessage }}
      </div>
    </transition>
  </div>
</template>
