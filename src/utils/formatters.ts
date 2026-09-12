import type { PersianDay } from '../types/schedule'

export const orderedDays: PersianDay[] = [
  'شنبه',
  'یکشنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه'
]

export const englishDays: Record<string, string> = {
  'شنبه': 'SATURDAY',
  'یکشنبه': 'SUNDAY',
  'دوشنبه': 'MONDAY',
  'سه‌شنبه': 'TUESDAY',
  'چهارشنبه': 'WEDNESDAY'
}

export const persianDays: PersianDay[] = [
  'یکشنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه',
  'پنجشنبه',
  'جمعه',
  'شنبه'
]

export function currentDay(): PersianDay {
  return persianDays[new Date().getDay()]
}

export function faDigits(value: string | number): string {
  return String(value).replace(
    /\d/g,
    d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]
  )
}

export function minutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export function formatTime(time: string): string {
  return faDigits(time)
}
