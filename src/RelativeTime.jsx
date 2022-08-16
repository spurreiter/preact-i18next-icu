import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useTranslation } from './IntlProvider.jsx'
import { relativeTime, nextIntervalMs, toNumber, toDate, isDate } from './relativeTimeUtil.js'

/** @typedef {import('./types').IntlRelativeTimeProps} IntlRelativeTimeProps */

/**
 * @param {IntlRelativeTimeProps} props
 * @returns {string}
 */
export function RelativeTime (props) {
  const [timerId, setTimerId] = useState(null)
  const {
    lng,
    value: _value = 0,
    unit: _unit = 'seconds',
    ...options
  } = props
  const lngs = useTranslation().getLanguages(lng)

  const _date = toDate(_value) || toNumber(_value) || 0
  const { value, unit, date } = relativeTime(_date, _unit)
  if (isDate(_date) && !timerId) {
    const timeout = nextIntervalMs({ date, unit })
    const id = setTimeout(() => {
      setTimerId(null)
    }, timeout)
    // @ts-expect-error
    setTimerId(id)
  }
  useEffect(() => {
    if (timerId) {
      return () => {
        clearTimeout(timerId)
      }
    }
  }, [])

  let transl
  try {
    // @ts-expect-error
    transl = new Intl.RelativeTimeFormat(lngs, options).format(value, unit)
  } catch (e) {
    // @ts-expect-error
    transl = new Intl.RelativeTimeFormat(lngs).format(value, unit)
  }

  return transl
}
