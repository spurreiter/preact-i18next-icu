export interface IntlProviderContext {
  /** access to i18next instance */
  i18n: object
  /** translate function */
  t: Function
  /** selected language */
  lng: string
  /** changes current language */
  changeLanguage: (lng: string) => Promise<void>
  /** */
  getLanguages: (lng?: string) => string[]
}

export interface IntlMessageProps {
  label?: string
  lng?: string
  [key: string]: any
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
 */
export interface IntlNumberProps extends Intl.NumberFormatOptions {
  value?: number
  lng?: string
  // currency?: string
  // currencyDisplay?: string
  // currencySign?: string
  // style?: 'currenty'|'unit'|'decimal'|'percent'
  // unit?: string
  // unitDisplay?: 'long'|'short'|'narrow'
  // notation?: string
  // compactDisplay?: string
  // useGrouping?: boolean
  // signDisplay?: string
  // localeMatcher?: string
  // minimumIntegerDigits?: number
  // minimumFractionDigits?: number
  // maximumFractionDigits?: number
  // minimumSignificantDigits?: number
  // maximumSignificantDigits?: number
  // numberingSystem?: string
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
*/
export interface IntlDateTimeProps extends Intl.DateTimeFormatOptions {
  value?: Date
  lng?: string
  date?: boolean
  time?: boolean
  hour12?: boolean
  // weekday?: string
  // era?: string
  // year?: string
  // month?: string
  // day?: string
  // hour?: string
  // minute?: string
  // second?: string
  // hourCycle?: string
  // timeZone?: string
  // timeZoneName?: string
  // localeMatcher?: string
  // formatMatcher?: string
  // numberingSystem?: string
  // calendar?: string
}

export interface IValueUnit {
  value: number
  unit: string
  date?: Date
}

export interface IntlRelativeTimeProps extends Intl.RelativeTimeFormatOptions {
  value?: number|Date
  unit?: Intl.RelativeTimeFormatUnit
  lng?: string
  // localeMatcher?: string
  // style?: string
  // numeric?: string
  // update?: boolean
  // updateUnit?: boolean
}
