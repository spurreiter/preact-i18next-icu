import { h } from 'preact'
import { useTranslation } from './IntlProvider.jsx'

/** @typedef {import('./types').IntlMessageProps} IntlMessageProps */

/**
 * @see https://formatjs.io/docs/core-concepts/icu-syntax
 * @param {IntlMessageProps} props
 * @returns {string|null}
 */
export function Message (props) {
  const { t } = useTranslation()
  const { label, ...options } = props
  const transl = t(label, options)
  return transl ?? null
}
