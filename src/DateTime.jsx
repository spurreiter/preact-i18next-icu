import { h } from 'preact'
import { useTranslation } from './IntlProvider'

/** @typedef {import('./types').IntlDateTimeProps} IntlDateTimeProps */

const DATE = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
}

const TIME = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {IntlDateTimeProps} props
 * @returns {string|null}
 */
export function DateTime (props) {
  const { lng, value, hour12 = false, ...options } = props
  const lngs = useTranslation().getLanguages(lng)

  if (!options.calendar) {
    options.calendar = 'gregory'
  }
  if (options.date) {
    Object.assign(options, DATE)
  }
  if (options.time) {
    Object.assign(options, TIME, { hour12 })
  }
  if (hour12) {
    // @ts-expect-error
    options.hour12 = !!hour12
  }

  const date = value ? new Date(value) : new Date()

  let transl
  try {
    transl = new Intl.DateTimeFormat(lngs, options).format(date)
  } catch (e) {
    transl = new Intl.DateTimeFormat(lngs).format(date)
    console.error(e)
  }

  return transl
}
