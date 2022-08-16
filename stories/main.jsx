/* eslint-disable react/jsx-key */
import { render } from 'preact'
import { IntlProvider, useTranslation } from '../src/index.js'

import Storybook from './Storybook'

import { storyMessage } from '../src/Message.stories'
import { storyNumber, storyNumberStatic } from '../src/Number.stories'
import { storyDateTime, storyDateTimeStatic } from '../src/DateTime.stories'
import { storyRelativeTime } from '../src/RelativeTime.stories'

function Control () {
  const { changeLanguage } = useTranslation()

  const clear = () => {
    // removeItem i18nextLng to use navigator.language
    Object.keys(localStorage).forEach(key => localStorage.removeItem(key))
    location.reload()
  }

  return (
    <p>
      <button title="en-US" onClick={() => changeLanguage('en-US')}>🇺🇸</button>
      <button title="en-GB" onClick={() => changeLanguage('en-GB')}>🇬🇧</button>
      <button title="de" onClick={() => changeLanguage('de')}>🇩🇪</button>
      <button title='clear localstorage' onClick={() => clear()}>🗑</button>
    </p>
  )
}

const options = { backend: { loadPath: '/stories/locales/{{lng}}/{{ns}}.json' } }

render(
  <IntlProvider lngs={['en', 'de']} options={options}>
    <Storybook
      control={<Control />}
      stories={[
        storyMessage,
        storyNumber,
        storyNumberStatic,
        storyDateTime,
        storyDateTimeStatic,
        storyRelativeTime
      ]}
    />
  </IntlProvider>,
  document.getElementById('app')
)
