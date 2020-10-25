import { screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/tests/helpers'
import 'jest-styled-components'

import Heading from '.'

describe('<Heading />', () => {
  it('should render a white heading by default', () => {
    renderWithTheme(<Heading>PUC</Heading>)
    expect(screen.getByRole('heading', { name: /puc/i })).toHaveStyle({
      color: '#FAFAFA'
    })
  })

  it('should render a black heading by default', () => {
    renderWithTheme(<Heading color="black">PUC</Heading>)
    expect(screen.getByRole('heading', { name: /puc/i })).toHaveStyle({
      color: '#030517'
    })
  })

  it('should render a heading with a line to the left side', () => {
    renderWithTheme(<Heading lineLeft>Won Games</Heading>)
    expect(screen.getByRole('heading', { name: /won games/i })).toHaveStyle({
      'border-left': '0.7rem solid #A1A884'
    })
  })

  it('should render a heading with a line at the bottom', () => {
    renderWithTheme(<Heading lineBottom>Won Games</Heading>)
    expect(screen.getByRole('heading', { name: /won games/i })).toHaveStyleRule(
      'border-bottom',
      '0.5rem solid #B25A42',
      {
        modifier: '::after'
      }
    )
  })
})
