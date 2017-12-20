import React from 'react'
import {
  Heading,
  Badge,
  Lead,
  Container,
  Flex,
  Box,
  Text,
  Subhead
} from 'rebass'
import { Link } from 'react-static'
import { colors } from '../theme'

const Base = Box.extend.attrs({ px: 3, py: 5, my: [4, 5] })`
  background: url(/diagonal.svg) top center repeat-x;
  background-size: auto 100%;
  text-align: center;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: url(/diagonal.svg) top right repeat-x;
    background-size: auto 100%;
    background-position-x: .5rem;
  }
`

const Headline = Heading.extend.attrs({ f: 6, mb: 3 })`
  mark {
    background: transparent url(/underline.svg) bottom left no-repeat;
    background-size: 100% 0.75rem;
    padding-bottom: 0.25rem;
    color: ${colors.orange[5]};
    text-transform: uppercase;
  }
`

const Subheadline = Subhead.extend.attrs({
  color: 'slate',
  f: 4
})`
  font-weight: normal;
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
      So let’s teach it like that at every high school.{' '}
      <Link to="/meetings">Explore meetings →</Link>
    </Subheadline>
  </Base>
)
