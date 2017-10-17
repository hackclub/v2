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

  aside {
    justify-self: end;
  }
`

const Headline = Heading.extend`
  text-transform: uppercase;
  text-align: right;
  line-height: 1.3;
  div {
    color: ${colors.primary};
    font-size: 3rem;

    &:last-of-type {
      position: relative;
      &:after {
        color: ${colors.slate};
        content: '.';
        position: absolute;
      }
    }
  }
  small {
    color: ${colors.slate};
    font-size: 1.5rem;

    &:last-of-type {
      font-size: 2.25rem;
    }
  }
`

const Feat = Box.extend.attrs({ mb: 4 })`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'title desc';
  align-items: center;

  h3 {
    grid-area: title;
  }
  p {
    grid-area: desc;
  }

  &:nth-child(2n) {
    grid-template-areas: 'desc title';
  }
`
const Feature = ({ title, desc, ...props }) => (
  <Feat>
    <Subhead color="primary" f={5} children={title} />
    <Text f={4} color="slate" children={desc} />
  </Feat>
)

export default () => (
  <Base>
    <aside>
      <Headline>
        <small>Start with a</small>
        <div>club</div>
        <small>in a</small>
        <div>box</div>
      </Headline>
    </aside>
    <Box>
      <Feature
        title="Training, assistance, whatever, wherever."
        desc="Meet with our staff, members, or experienced club leaders for advice."
      />
      <Feature
        title="Start from 11."
        desc="We provide you with starter content: workshops, example materials, guides, posters."
      />
      <Feature
        title="A community that cares."
        desc="Talk to thousands of other members at all skill levels 24/7 in our Slack."
      />
    </Box>
  </Base>
)
