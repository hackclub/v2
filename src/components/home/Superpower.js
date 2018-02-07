import React from 'react'
import { Heading, Box, Link as A, mediaQueries } from '@hackclub/design-system'
import Link from 'gatsby-link'

const Base = Box.withComponent('section').extend`
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
    background-position-x: 1rem;
    ${mediaQueries.md} {
      background-position-x: 6rem;
    }
  }

  mark {
    background: transparent url(/underline.svg) bottom left no-repeat;
    background-size: 100% 0.75rem;
    padding-bottom: 0.25rem;
    color: ${props => props.theme.colors.orange[5]};
    text-transform: uppercase;
  }
`

A.link = A.withComponent(Link)

export default () => (
  <Base px={2} py={5} my={[4, 5]}>
    <Heading.h2 f={[5, 6]} mb={3}>
      Coding is a <mark>superpower</mark>.
    </Heading.h2>
    <Heading.h3 color="slate" f={[3, 4]} bold={false} regular>
      So let’s teach it like that at every high school.{' '}
      <A.link color="primary" to="/meetings" underline>
        Explore meetings →
      </A.link>
    </Heading.h3>
  </Base>
)
