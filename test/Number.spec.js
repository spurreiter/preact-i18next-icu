import { h } from 'preact'
import { render, screen } from '@testing-library/preact'
import { IntlProvider, Number } from '../src/index.js'

describe('Number', function () {
  it('shall display welcome', async function () {
    render(<IntlProvider><Number value="123456.789" lng='en-US' /></IntlProvider>)
    const el = await screen.findByText(/123/)
    expect(el.textContent).toBe('123,456.789')
  })

  it('shall display number in German', async function () {
    render(<IntlProvider><Number value="123456.789" lng='de-DE' /></IntlProvider>)
    const el = await screen.findByText(/123/)
    expect(el.textContent).toBe('123.456,789')
  })

  it('shall display currency in English', async function () {
    render(<IntlProvider><Number value="123456.789" style="currency" currency="GBP" lng='en-GB' /></IntlProvider>)
    const el = await screen.findByText(/123/)
    expect(el.textContent).toBe('£123,456.79')
  })

  it('shall display currency in German', async function () {
    render(<IntlProvider><Number value="123456.789" style="currency" currency="GBP" lng='de' /></IntlProvider>)
    const el = await screen.findByText(/123/)
    expect(el.textContent).toBe('123.456,79 £')
  })
})
