import './app.css'
import { render } from 'preact'
import { IntlProvider, useTranslation } from '../src/index.js'
// import { IntlProvider } from 'preact-i18next-icu'
import { Content } from './content.jsx'

const options = { backend: { loadPath: '/example/locales/{{lng}}/{{ns}}.json' } }

export function App () {
  return (
    <IntlProvider lngs={['en', 'de']} options={options}>
      <LngSwitch />
      <Content />
    </IntlProvider>
  )
}

// requires translation in `/locales/{lng}/translations.json
function LngSwitch () {
  const { changeLanguage } = useTranslation()
  return (
    <>
      <button onClick={() => changeLanguage('en-US')}>🇺🇸 en-US</button>
      <button onClick={() => changeLanguage('en-GB')}>🇬🇧 en-GB</button>
      <button onClick={() => changeLanguage('de')}>🇩🇪 de</button>
      <button onClick={() => changeLanguage('es')}>🇪🇸 es</button>
    </>
  )
}

render(
  <App/>,
  document.getElementById('app')
)
