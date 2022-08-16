import { h } from 'preact'
import { render, screen, waitFor } from '@testing-library/preact'
import { IntlProvider, Message } from '../src/index.js'

const options = {
  resources: {
    de: {
      translations: {
        'Hi {name}!': 'Hallo {name}!'
      }
    }
  }
}

describe('Message', function () {
  it('shall display fallback', function () {
    const context = render(<IntlProvider><Message /></IntlProvider>)
    expect(context.container.innerHTML).toBe('<div>Loading...</div>')
  })

  it('shall display welcome', async function () {
    const exp = 'Hi Elsa!'
    render(<IntlProvider><Message label='Hi {name}!' name='Elsa'/></IntlProvider>)
    await screen.findByText(exp)
    expect(screen.getByText(exp).innerHTML).toBe(exp)
  })

  it('shall translate to german', async function () {
    const exp = 'Hallo Elsa!'
    render(<IntlProvider options={options}><Message label='Hi {name}!' name='Elsa' lng='de'/></IntlProvider>)
    await waitFor(() => {
      expect(screen.getByText(exp).innerHTML).toBe(exp)
    })
  })
})
