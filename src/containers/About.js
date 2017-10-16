import React from 'react'
import {
  Provider,
  Banner,
  Heading,
  Badge,
  Lead,
  Container,
  Flex,
  Box,
  Text,
  Subhead,
  Button,
  ButtonOutline,
  Label,
  Input,
  Circle,
  Relative,
  Absolute,
  Image,
  Link,
  Row,
  Column
} from 'rebass'
import theme from '../theme'
import Flag from '../components/Flag'
import Footer from '../components/Footer'

const FONT = "SFMono-Regular, 'Roboto Mono', Menlo, 'Courier New', monospace"

export default () => (
  <Provider theme={theme}>
    <Flag />
    <Container mt={5} py={4} px={3} maxWidth={36 * 16}>
      <Heading color="primary" f={6}>
        Our manifesto.
      </Heading>
      <p>
        Bits are replacing atoms, algorithms are attaining agency, and
        "infrastructure" is coming to mean cloud services, not roads and
        railways. Within the next few years, algorithms will be driving our cars
        and defining our virtual worlds.
      </p>
      <p>
        Yet while the impact of technology is increasing, we are suffering a
        crisis of opportunity: half American high schools don't offer computer
        science courses and the ones that do fail to get beginners excited.
      </p>
      <p>
        We need to change our approach and put students in charge.{' '}
        <strong>
          And that's what Hack Club is, students starting the computer science
          classes their schools should offer.
        </strong>
      </p>
      <style jsx>{`
        p {
          font-family: ${FONT};
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }
      `}</style>
    </Container>
    <Footer />
  </Provider>
)
