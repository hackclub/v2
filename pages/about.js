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
import theme from '../src/theme'
import Flag from '../src/Flag'

export default () => (
  <Provider theme={theme}>
    <Flag />
    <Container mt={5} py={4} px={3}>
      <Heading color="primary">A manifesto</Heading>
      <Text my={2}>
        Bits are replacing atoms, algorithms are attaining agency, and
        "infrastructure" is coming to mean cloud services, not roads and
        railways. Within the next few years, algorithms will be driving our cars
        and defining our virtual worlds.
      </Text>
      <Text my={2}>
        Yet while the impact of technology is increasing, we are suffering a
        crisis of opportunity: half American high schools don't offer computer
        science courses and the ones that do fail to get beginners excited.
      </Text>
      <Text my={2}>
        We need to change our approach and put students in charge. And that's
        what Hack Club is, students starting the computer science classes their
        schools should offer.
      </Text>
    </Container>
  </Provider>
)
