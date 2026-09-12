import { scheduleData } from '../data/schedule.data'
import type { ScheduleData, ClassItem, PersianDay } from '../types/schedule'
import { orderedDays } from '../utils/formatters'

export class ScheduleService {
  static getSchedule(): ScheduleData {
    return scheduleData
  }

  static getClassesForDay(day: PersianDay | string): ClassItem[] {
    return scheduleData[day] || []
  }

  static getAllClasses(): (ClassItem & { day: PersianDay })[] {
    const list: (ClassItem & { day: PersianDay })[] = []
    orderedDays.forEach(day => {
      const classes = scheduleData[day] || []
      classes.forEach(c => {
        list.push({ ...c, day })
      })
    })
    return list
  }

  static getTotalCoursesCount(): number {
    return this.getAllClasses().length
  }
}
