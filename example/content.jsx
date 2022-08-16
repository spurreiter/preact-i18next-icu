import { useReducer } from 'preact/hooks'
import { Message, Number, DateTime, RelativeTime, useTranslation } from '../src/index.js'
import { reducer } from './globalState.js'
import styles from './content.module.css'

export function Content () {
  const { t, lng } = useTranslation()
  const [name, setName] = useReducer(...reducer('name', 'Elsa'))
  const [persons, setPersons] = useReducer(...reducer('persons', 0))
  const [date] = useReducer(...reducer('date', new Date(Date.now() + 30e3)))

  return (
    <div className={styles.content}>
      <p>Selected language: {lng}</p>
      <h2>Message</h2>
      <div>
        <Message label="Hello {name}!" name={name} /><br/>
        <input defaultValue={name} onInput={(ev) => setName(ev.currentTarget.value)}/>
      </div>
      <div>
        <Message label="{value, plural, =0 {no Person} =1 {one Person} other {# Persons}}" value={persons} /><br/>
        <button onClick={() => setPersons((persons + 1) % 3)}>{t('Increment')}</button>
      </div>
      <div>
        Message: <Message label="{value, date, full}" value={new Date()} />
        <p>Better use DateTime instead of <code>{'<Message label="{value, date, full}"...'}</code> as en-US is rendered false!</p>
        DateTime: <DateTime value={new Date()} weekday='long' year='numeric' month='long' day='numeric'/><br/>
      </div>
      <h2>Number</h2>
      <div>
        <Number value={1234567.089} /><br/>
        <Number value={123456.012} currency="EUR" style="currency"/>
      </div>
      <h2>DateTime</h2>
      <div>
        <DateTime value="2020-03-12" /><br/>
        <DateTime value="2020-03-12" weekday='short' year='numeric' month='long' day='numeric' />
      </div>
      <h2>RelativeTime</h2>
      <div>
        <RelativeTime value={date} />
      </div>
    </div>
  )
}
