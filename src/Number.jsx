import { h } from 'preact'
import { useTranslation } from './IntlProvider.jsx'

/** @typedef {import('./types').IntlNumberProps} IntlNumberProps */

/**
 * @param {IntlNumberProps} props
 * @returns {string|null}
 */
export function Number (props) {
  const { value = 0, lng, ...options } = props
  const lngs = useTranslation().getLanguages(lng)

  let transl = null
  try {
    transl = new Intl.NumberFormat(lngs, options).format(value)
  } catch (e) {
    // on error format without options
    transl = new Intl.NumberFormat(lngs).format(value)
    console.error(e)
  }
  return transl
}
