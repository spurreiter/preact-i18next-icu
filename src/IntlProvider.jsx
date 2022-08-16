import { h, createContext } from 'preact'
import { useContext, useEffect, useState } from 'preact/hooks'

import i18n from 'i18next'
import HttpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import ICU from 'i18next-icu'

/** @typedef {import('./types').IntlProviderContext} IntlProviderContext */

const defaultOptions = {
  fallbackLng: 'en',
  ns: ['translations'],
  defaultNS: 'translations',
  nsSeparator: false,
  keySeparator: false,
  debug: false
}

const Context = createContext(null)

/**
 * @param {object} props
 * @param {preact.AnyComponent} props.children
 * @param {preact.AnyComponent} props.fallback fallback component which is rendered while new language settings are loading
 * @param {import('i18next').Module[]} [props.backends]
 * @param {object} [props.options] i18next init options
 * @param {string[]} [props.lngs] load languages on start
 * @returns {preact.VNode}
 */
export function IntlProvider (props) {
  const { fallback, backends, lngs, options, children } = props
  const _fallback = fallback || (<div>Loading...</div>)

  const [instance] = useState(i18n.createInstance())
  const [isLoading, setIsLoading] = useState(false)
  const [lng, setLng] = useState('')

  const changeLanguage = async (lng = instance.language) => {
    setIsLoading(true)
    await instance.changeLanguage(lng)
    setLng(lng || instance.language)
    setIsLoading(false)
  }

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      if (!instance.isInitialized) {
        instance
          .use(ICU)
          .use(LanguageDetector)
          .use(HttpBackend)
        if (backends?.length) {
          backends.forEach(backend => instance.use(backend))
        }
        instance.init({ ...defaultOptions, ...options })
      }
      if (lngs && lngs.length) {
        await instance.loadLanguages(lngs)
      }
      // set initial language on load
      await changeLanguage(lng)
    })()
  }, [])

  const value = {
    i18n: instance,
    t: instance.t,
    lng,
    changeLanguage,
    getLanguages: (lng) => getLanguages(instance, lng)
  }
  return (
    <Context.Provider
      // @ts-ignore
      value={value} >
      {isLoading ? _fallback : children}
    </Context.Provider>
  )
}

/**
 * @returns {IntlProviderContext}
 */
export function useTranslation () {
  // @ts-expect-error
  return useContext(Context)
}

/**
 * @param {any} [instance]
 * @param {string} [lng]
 * @returns {string[]}
 */
export function getLanguages (instance = i18n, lng) {
  const lngs = instance?.languages || globalThis?.navigator?.languages
  // @ts-expect-error
  return [lng].concat(lngs).filter(Boolean)
}
