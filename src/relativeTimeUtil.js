/** @typedef {import('./types.js').IValueUnit} IValueUnit */

const UNITS = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second']

const LOWER = [12, 4, 7, 24, 60, 60]

const MINUTE = 60
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY
const MONTH = 30 * DAY
const QUARTER = 4 * MONTH
const YEAR = 365 * DAY

const INTERVALS = {
  year: YEAR,
  quarter: QUARTER,
  month: MONTH,
  week: WEEK,
  day: DAY,
  hour: HOUR,
  minute: MINUTE
}

/**
 * @param {any} val
 * @returns {boolean}
 */
export const isDate = (val) => (val instanceof Date) && !isNaN(val.getTime())

/**
   * @param {any} val
   * @returns {number|undefined}
   */
export const toNumber = (val) => {
  const n = Number(val)
  if (!isNaN(n)) return n
}

const RE_DATE = /^\d{4}-\d{2}-\d{2}/

/**
 * @param {Date|string|number|any} val
 * @returns {Date|undefined}
 */
export const toDate = (val) => {
  if (typeof val === 'string') {
    const date = new Date(val)
    if (RE_DATE.test(val) && isDate(date)) {
      return date
    }
  }
  if (isDate(val)) {
    return val
  }
}

/**
 * @private
 * @param {string} [unit]
 * @returns {string}
 */
export const toUnit = (unit) => {
  unit = String(unit).trim()
  return UNITS.indexOf(unit) !== -1 ? unit : 'second'
}

/**
 * @param {{day?: number, [key: string]: any}} [diff]
 * @param {Date} now
 * @returns {number}
 */
export const weekDiff = (diff = {}, now = new Date()) => {
  const dayOfWeek = now.getDay()
  const { day = 0 } = diff
  const realdays = day < 0 ? day + dayOfWeek - 7 : day - dayOfWeek + 7
  const realweeks = day < 0 ? Math.ceil(realdays / 7) : Math.floor(realdays / 7)
  return realweeks
}

/**
 * @param {Date} end
 * @param {Date} start
 * @param {number} [divider=1]
 * @returns {number}
 */
const inUnit = (end, start, divider = 1) =>
  Math.trunc((end.getTime() - start.getTime()) / 1000 / divider)

/**
 * @param {Date} end
 * @param {Date} start
 * @param {number} days
 * @returns {number}
 */
const inMonths = (end, start, days) => {
  if (Math.abs(days) < 31) return 0
  return Math.trunc(end.getMonth() + 12 * end.getFullYear() - (start.getMonth() + 12 * start.getFullYear()))
}

/**
 * @param {Date|number} [date]
 * @param {string} [unit]
 * @returns {IValueUnit}
 */
export const relativeTime = (date = 1, unit = 'second') => {
  if (typeof date === 'number') {
    const ms = (nextIntervalMs({ unit }, true) * date) + Date.now()
    return { value: toNumber(date) || 0, unit, date: new Date(ms) }
  } else if (isDate(date)) {
    const now = new Date()
    const day = inUnit(date, now, INTERVALS.day)
    const month = inMonths(date, now, day)

    const diff = {
      year: Math.trunc(month / 12),
      month,
      week: inUnit(date, now, INTERVALS.week),
      day,
      hour: inUnit(date, now, INTERVALS.hour),
      minute: inUnit(date, now, INTERVALS.minute),
      second: inUnit(date, now)
    }
    for (let i = 0; i < UNITS.length; i++) {
      const unit = UNITS[i]
      let value = diff[unit]
      if (value !== 0) {
        if (unit === 'week') {
          value = weekDiff(diff, now)
        }
        return { value, unit, date }
      }
    }
    return { value: 0, unit: 'second', date: new Date() }
  } else {
    return { value: 1, unit }
  }
}

/**
 * @param {object} param0
 * @param {Date} [param0.date]
 * @param {string} [param0.unit]
 * @param {boolean} [exact]
 * @returns {number}
 */
export const nextIntervalMs = ({ date = new Date(), unit }, exact = false) => {
  const interval = (INTERVALS[unit] || 1)
  const delta = inUnit(date, new Date())
  let diff = ((interval + delta) % interval) || interval
  if (diff < 0) {
    diff = (interval + diff) || 1
  }
  if (!exact) {
    diff = Math.trunc(diff / 6) || 1
  }
  return diff * 1000
}

/**
 * @param {IValueUnit} param0
 * @returns {IValueUnit}
 */
export const lowerUnit = ({ value, unit }) => {
  if (value === 1) {
    const i = UNITS.indexOf(unit)
    value = LOWER[i] || value
    unit = (i !== -1 && UNITS[i + 1]) || 'second'
  }
  return { value, unit }
}
