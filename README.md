# preact-i18next-icu

> i18next provider with icu syntax for preact

A slim wrapper around [i18next][] for preact Components.

Implements:
- [i18next-browser-languagedetector][]
- [i18next-http-backend][]
- [i18next-icu][]

# ToC

<!-- !toc -->

* [installation](#installation)
* [usage](#usage)
  * [IntlProvider](#intlprovider)
  * [useTranslation](#usetranslation)
  * [Message](#message)
  * [Number](#number)
  * [DateTime](#datetime)
  * [RelativeTime](#relativetime)
* [example and storybook](#example-and-storybook)
* [license](#license)

<!-- toc! -->

# installation

```
npm i preact-i18next-icu
```

# usage

## IntlProvider

Provides the context for [i18next][].

```jsx
import { IntlProvider } from 'preact-i18next-icu'

function App (props) {
  <IntlProvider lngs={['en', 'de']}>
    {props.children}
  </IntlProvider>
}
```

**props**

| property  | type                | description                                                                                |
| --------- | ------------------- | ------------------------------------------------------------------------------------------ |
| fallback? | preact.AnyComponent | fallback component which is rendered while new language settings are loading, e.g. spinner |
| backends? | i18next.Module[]    | Array of i18next backends                                                                  |
| options?  | object              | i18next init options                                                                       |
| lngs?     | string[]            | Array of languages which are loaded on initialization                                      |

## useTranslation

Grants access to the IntlProvider context.

```jsx
import { useTranslation } from 'preact-i18next-icu'

function Test () {
  const { t, changeLanguage, lng, i18n } = useTranslation()

  return (
    <>
      <button onClick={() => changeLanguage('fr')}>{t('Change to french')}</button>
      <p>t('{language} selected', { language: lng })</p>
      <p>t('Available languages: {languages}', { languages: i18n.languages.join(', ') })</p>
    </>
  )
}
```

## Message

Message which supports [ICU message syntax][].

```jsx
import { Message } from 'preact-i18next-icu'

const Hello = () => <Message label="Hello {name}!" name="Elsa" />
```

**props**

| property | type   | description                    |
| -------- | ------ | ------------------------------ |
| label    | string | the translation label          |
| lng?     | string | overrides the default language |
| ...      | string | the placeholder value(s)       |

## Number

Uses `Intl.NumberFormat` to format a number.

```jsx
import { Message } from 'preact-i18next-icu'

const MyNumber = () => <Number value={123456.012} />
// 1,234,567.089 for lng=en
// 1.234.567,089 for lng=de
const MyCurrency = () => <Number value={123456.012} currency="EUR" style="currency" />
// €123,456.01  for lng=en
// 123.456,01 € for lng=de
```

**props**

| property | type   | description                           |
| -------- | ------ | ------------------------------------- |
| value    | number | the number to translate               |
| lng?     | string | overrides the default language        |
| ...      | any    | see [NumberFormat][] for all options. |


## DateTime

Uses `Intl.DateTimeFormat` to format a date or time.

```jsx
import { DateTime } from 'preact-i18next-icu'

const DateTimeShort = () => <DateTime value={new Date('2020-03-12')} />
// 3/12/2022 for lng='en-US'
// 12/03/2022 for lng='en-GB'
const DateTimeLong = () => <DateTime value={new Date() weekday='long' year='numeric' month='long' day='numeric'} />
// Thursday, March 12, 20202 for lng='en-US'
// Thursday, 12 March, 20202 for lng='en-GB'
```

**props**

| property | type    | description                                              |
| -------- | ------- | -------------------------------------------------------- |
| value    | number  | the Date or Time to translate                            |
| lng?     | string  | overrides the default language                           |
| date?    | boolean | if `true` show only date                                 |
| time?    | boolean | if `true` show only time                                 |
| hour12?  | boolean | if `true` show time in in 12 hour format with `am`, `pm` |
| ...      | any     | see [DateTimeFormat][] for all options.                  |

## RelativeTime

Uses `Intl.RelativeTimeFormat` to format a relative date or time.

```jsx
import { DateTime } from 'preact-i18next-icu'

const MyRelativeTime = () => <RelativeTime value="2022-01-01" />
// 7 months ago for lng=en
const MyRelativeTime2 = () => <RelativeTime value="1" unit="day" />
// tomorrow for lng=en
```

**props**

| property | type         | description                             |
| -------- | ------------ | --------------------------------------- |
| value    | Date\|number | the number to translate                 |
| lng?     | string       | overrides the default language          |
| ...      | any          | see [DateTimeFormat][] for all options. |

# example and storybook

````
npm run dev
````

Then access http://localhost:5173

# license

MIT licensed


[ICU message syntax]: https://formatjs.io/docs/core-concepts/icu-syntax
[NumberFormat]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
[DateTimeFormat]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
[DateTime]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
[i18next]: https://www.i18next.com
[i18next-http-backend]: https://npmjs.org/package/i18next-http-backend
[i18next-browser-languagedetector]: https://npmjs.org/package/i18next-browser-languagedetector
[i18next-icu]: https://npmjs.org/package/i18next-icu

