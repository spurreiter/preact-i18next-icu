import { DateTime } from './DateTime.jsx'

export const storyDateTime = {
  title: 'DateTime',
  component: () => {
    return (
      <section>
        <DateTime /><br/>
        <DateTime value="2020-03-12" /><br/>
        <DateTime value="2020-03-12" weekday='short' year='numeric' month='long' day='numeric' /><br/>
        <DateTime value="2020-03-12 12:01:23" hour12 time timeZone="Asia/Tokyo" /><br/>
        <DateTime value="2020-03-12 12:00:00" date time timeZone="Asia/Tokyo" /><br/>
        <DateTime value="2020-03-12 12:00:00" date time timeZone="Foo/Bar" /><br/>
        </section>
    )
  }
}

export const storyDateTimeStatic = {
  title: 'DateTime (with lng)',
  component: () => {
    return (
      <section>
        <DateTime value="2020-03-12" lng="en-US" /><br/>
        <DateTime value="2020-03-12" date weekday="long" month="long" lng="ja" /><br/>
      </section>
    )
  }
}
