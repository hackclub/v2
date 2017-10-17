import React from 'react'
import {
  Provider,
  Heading,
  Lead,
  Container,
  Flex,
  Box,
  Text,
  Subhead
} from 'rebass'
import theme, { colors } from '../theme'
import Flag from '../components/Flag'
import Footer from '../components/Footer'

const Base = Container.extend.attrs({
  mt: 5,
  py: 4,
  px: 3,
  maxWidth: 36 * 16
})``

const Headline = Heading.extend.attrs({
  color: 'primary',
  mb: 3,
  align: 'center'
})`
  text-transform: uppercase;
  letter-spacing: .1em;
`

const P = Text.extend.attrs({ f: 3, mb: 2 })`
  &:first-of-type:first-letter {
    initial-letter: 2;
    -webkit-initial-letter: 2;
    color: ${colors.slate};
    font-weight: bold;
    margin-right: .5rem;
  }
`

export default () => (
  <Provider theme={theme}>
    <Flag />
    <Base>
      <Headline>
        <Box f={4}>The Hack Club</Box>
        <Box f={6}>Manifesto</Box>
      </Headline>
      <P>
        Bits are replacing atoms, algorithms are attaining agency, and
        "infrastructure" is coming to mean cloud services, not roads and
        railways. Within the next few years, algorithms will be driving our cars
        and defining our virtual worlds.
      </P>
      <P>
        Yet while the impact of technology is increasing, we are suffering a
        crisis of opportunity: half American high schools don't offer computer
        science courses and the ones that do fail to get beginners excited.
      </P>
      <P>
        We need to change our approach and put students in charge.{' '}
        <strong>
          And that's what Hack Club is, students starting the computer science
          classes their schools should offer.
        </strong>
      </P>
    </Base>
    <Footer />
  </Provider>
)
