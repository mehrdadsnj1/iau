<script setup lang="ts">
import NextCard from './NextCard.vue'
import { faDigits } from '../../utils/formatters'
import { ScheduleService } from '../../services/schedule.service'

const courseTotal = faDigits(ScheduleService.getTotalCoursesCount())
</script>

<template>
  <section class="hero reveal d1">
    <div class="hero-grid"></div>

    <div class="hero-content">
      <div>
        <div class="eyebrow">✦ SEMESTER ACTIVE</div>
        <h2>
          برنامه‌ات رو
          <span>تحت کنترل</span>
          داشته باش.
        </h2>
        <p class="hero-desc">
          همه کلاس‌ها، ساعت‌ها و زمان‌بندی ترمت در یک داشبورد. سریع، مرتب و بدون دردسر.
        </p>

        <div class="hero-stats">
          <div class="mini-stat">
            <strong id="courseTotal">{{ courseTotal }}</strong> درس
          </div>
          <div class="mini-stat">
            <strong>۱۴.۵</strong> ساعت
          </div>
          <div class="mini-stat">
            <strong>۴</strong> روز
          </div>
        </div>
      </div>

      <NextCard />
    </div>
  </section>
</template>
