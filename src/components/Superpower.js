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
import { Link } from 'react-static'
import { colors } from '../theme'

const Base = Container.extend.attrs({ py: 4, my: 4 })`
  background-color: ${colors.snow};
  border-radius: 4rem;
  text-align: center;
`

const Headline = Heading.extend.attrs({ f: 6 })`
  mark {
    background-color: transparent;
    color: ${colors.orange[4]};
    text-transform: uppercase;
  }
`

const Subheadline = Subhead.extend.attrs({
  color: 'slate',
  f: 4,
  mt: 2
})`
  span {
    font-weight: normal;
  }
  a {
    color: ${colors.primary};
  }
`

export default () => (
  <Base>
    <Headline>
      Coding is a <mark>superpower</mark>.
    </Headline>
    <Subheadline>
      <span children="Let’s teach it like that. " />
      <Link to="/about">Read our manifesto »</Link>
    </Subheadline>
  </Base>
)
