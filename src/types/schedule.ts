export type PersianDay = 'شنبه' | 'یکشنبه' | 'دوشنبه' | 'سه‌شنبه' | 'چهارشنبه' | 'پنجشنبه' | 'جمعه'

export type ColorToken =
  | 'c-purple'
  | 'c-blue'
  | 'c-green'
  | 'c-orange'
  | 'c-pink'
  | 'c-red'
  | 'c-cyan'
  | 'c-violet'

export interface ClassItem {
  name: string
  start: string
  end: string
  place: string
  code: string
  color: ColorToken | string
  day?: PersianDay
}

export type ScheduleData = Record<string, ClassItem[]>

export type ClassStatus = 'برگزار شد' | 'در حال برگزاری' | 'بعدی'

export interface TodayClassItem extends ClassItem {
  status: ClassStatus
  current: boolean
}

export interface NextClassItem extends ClassItem {
  day: PersianDay
  distance: number
}
