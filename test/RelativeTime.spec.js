import { h } from 'preact'
import { render, screen } from '@testing-library/preact'
import { IntlProvider, RelativeTime } from '../src/index.js'

describe('RelativeTime', function () {
  it('shall display today in en-US', async function () {
    render(<IntlProvider><RelativeTime value={0} unit='day' numeric="auto" lng='en-US' /></IntlProvider>)
    const el = await screen.findByText(/today/)
    expect(el.textContent).toBe('today')
  })

  it('shall display today in en-US', async function () {
    render(<IntlProvider><RelativeTime value={1} unit='day' numeric="auto" lng='de' /></IntlProvider>)
    const el = await screen.findByText(/morgen/)
    expect(el.textContent).toBe('morgen')
  })
})
