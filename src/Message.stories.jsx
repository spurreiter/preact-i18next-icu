import { Message } from './Message.jsx'

export const storyMessage = {
  title: 'Message',
  component: () => {
    return (
      <section>
        <Message label="My title" /><br/>
        <Message label="Welcome, {name}!" name="Elsa" /><br/>
        <Message label="I have {value, number} cats." value={7} /><br/>
        <Message label="Almost {value, number, ::percent} of them are black." value={0.285} /><br/>
        <Message label="The price of this bagel is {value, number, ::sign-always compact-short currency/GBP}" value={1.99}/><br/>
        <Message label="Sale begins {value, date, medium}" value={new Date()} /><br/>
        <Message label="{value, plural, =0 {no Person} =1 {one Person} other {# Persons}}" value={0} /><br/>
        <Message label="{value, plural, =0 {no Person} =1 {one Person} other {# Persons}}" value={1} /><br/>
        <Message label="{value, plural, =0 {no Person} =1 {one Person} other {# Persons}}" value={2} /><br/>
        <Message label='{gender, select, male {He} female {She} other {They}} will respond shortly.' gender='male' /><br/>
        <Message label='{gender, select, male {He} female {She} other {They}} will respond shortly.' gender='other' /><br/>
        <Message label='Born on {birthdate, date, full}' birthdate={new Date()} /><br/>
        <p>{'With "lng". Requires '}<code>{'<IntlProvider lngs={[\'en\', \'de\', ...]}>'}</code> {'being set to load all available languages on startup.'}</p>
        <Message label="My title" lng='de' /><br/>
      </section>
    )
  }
}
