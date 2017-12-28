import React from 'react'
import { Container, Provider } from 'rebass'
import theme, { colors, mx } from '../theme'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const Base = Container.extend.attrs({
  py: 4,
  px: 3,
  maxWidth: 40 * 16
})`
  display: grid;
  grid-gap: 1rem;
  ${mx[1]} {
    grid-template-columns: repeat(2, 1fr);
    h2, .textarea { grid-column: 1 / -1; }
  }
`

export default (props) => (
  <Provider theme={theme}>
    <Nav />
    <Base>
      {props.children}
    </Base>
    <Footer />
  </Provider>
)
