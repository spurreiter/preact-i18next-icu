import { h } from 'preact'
import { render, screen } from '@testing-library/preact'
import { IntlProvider, DateTime } from '../src/index.js'

describe('DateTime', function () {
  it('shall display date in en-US', async function () {
    render(<IntlProvider><DateTime value={new Date('2022-08-15T12:01:02')} lng='en-US' /></IntlProvider>)
    const el = await screen.findByText(/2022/)
    expect(el.textContent).toBe('8/15/2022')
  })

  it('shall display date in en-GB', async function () {
    render(<IntlProvider><DateTime value={new Date('2022-08-15T12:01:02')} lng='en-GB' /></IntlProvider>)
    const el = await screen.findByText(/2022/)
    expect(el.textContent).toBe('15/08/2022')
  })

  it('shall display date and time in en-GB in timezone Asia/Tokyo', async function () {
    render(<IntlProvider><DateTime value={new Date('2022-08-15T12:01:02')} date time timeZone='Asia/Tokyo' lng='en-GB' /></IntlProvider>)
    const el = await screen.findByText(/2022/)
    expect(el.textContent).toBe('15/08/2022, 19:01:02')
  })

  it('shall display date and time in en-GB in timezone Asia/Tokyo as hour12', async function () {
    render(<IntlProvider><DateTime value={new Date('2022-08-15T12:01:02')} date time hour12 timeZone='Asia/Tokyo' lng='en-GB' /></IntlProvider>)
    const el = await screen.findByText(/2022/)
    expect(el.textContent).toBe('15/08/2022, 7:01:02 pm')
  })
})
