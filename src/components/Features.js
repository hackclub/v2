import React from 'react'
import {
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
  Row,
  Column
} from 'rebass'
import { colors } from '../theme'
import styled from 'styled-components'

const Base = Container.extend`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: 1fr 3fr;
  max-width: 64rem;
  margin-top: 4rem;
`

const Headline = Heading.extend`
  color: ${colors.slate};
  text-transform: uppercase;
  text-align: right;
  line-height: 1.3;
  div {
    color: ${colors.red};
    font-size: 3rem;
  }
  small {
    color: ${colors.slate};
    font-size: 1.5rem;

    &:last-of-type {
      font-size: 2.25rem;
    }
  }
`

const Feat = Box.extend`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;

  &:nth-child(2n) > :first-child {
    grid-column: 2;
  }
`
const Feature = ({ title, desc, ...props }) => (
  <Feat mb={3}>
    <Heading color="primary" children={title} />
    <Text f={4} color="slate" children={desc} />
  </Feat>
)

export default () => (
  <Base>
    <Box>
      <Headline>
        <small>Start with a</small>
        <div>club</div>
        <small>in a</small>
        <div>box</div>
      </Headline>
    </Box>
    <Box>
      <Feature
        title="Training, assistance, whatever, wherever."
        desc="Stuff goes here."
      />
      <Feature title="Start from 11." desc="Stuff goes here." />
      <Feature title="A community that cares." desc="Stuff goes here." />
    </Box>
  </Base>
)
