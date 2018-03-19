import React from 'react'
import { Box, Flex, Heading, Text, LargeButton } from '@hackclub/design-system'
import Link from 'gatsby-link'
import { random, times } from 'lodash'
import { keyframes } from 'styled-components'

const Base = Box.extend`
  width: 100vw;
  overflow: hidden;
  position: relative;
`

const pan = keyframes`
  from { transform: translateX(-100vw) }
  to { transform: translateX(100vw) }
`

const Grid = Box.extend`
  display: grid;
  grid-template-columns: repeat(5, 20vw);
  grid-template-rows: repeat(5, 20vw);
  grid-gap: 0;
  background-image: linear-gradient(
    to bottom,
    ${props => props.theme.colors.white},
    ${props => props.theme.colors.snow}
  );
  position: relative;
  overflow: hidden;

  ${props => props.theme.mediaQueries.md} {
    grid-template-rows: repeat(5, 10vw);
    span {
      filter: saturate(125%) blur(21px);
    }
  }

  span {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: inline-block;
    filter: saturate(125%) blur(14px);
    z-index: 1;
    margin: 0;

    &:nth-of-type(1) {
      grid-column: 1;
      grid-row: 1 / span 2;
    }
    &:nth-of-type(2) {
      grid-column: 2;
      grid-row: 2 / span 2;
    }
    &:nth-of-type(3) {
      grid-column: 3;
      grid-row: 3 / span 2;
    }
    &:nth-of-type(4) {
      grid-column: 4;
      grid-row: 1 / span 2;
    }
    &:nth-of-type(5) {
      grid-column: 5;
      grid-row: 2 / span 4;
    }
    &:nth-of-type(6) {
      grid-column: 4;
      grid-row: 4 / span 2;
    }
    &:nth-of-type(7) {
      grid-column: 1;
      grid-row: 4 / span 2;
    }
  }
`

const reduceMotion =
  window.matchMedia('prefers-reduced-motion: reduce').matches || true

const Img = ({ i, style }) => (
  <span
    style={{
      backgroundImage: `url(/mosaic/${i + 1}.jpg)`,
      animation: reduceMotion
        ? `${pan} ${random(32, 48)}s linear infinite`
        : 'none',
      ...style
    }}
  />
)

LargeButton.link = LargeButton.withComponent(Link)

const Start = Box.extend`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  border-radius: ${props => props.theme.radii[2]};
  box-shadow: ${props => props.theme.boxShadows[3]};
  background-color: ${props => props.theme.colors.red[5]};
  background-image: linear-gradient(
    -48deg,
    ${props => props.theme.colors.orange[4]} 0%,
    ${props => props.theme.colors.red[5]} 50%,
    ${props => props.theme.colors.red[6]} 100%
  );
  margin: 12.5vw;
  width: 75vw;
  ${props => props.theme.mediaQueries.lg} {
    margin-left: 25vw;
    width: 50vw;
  }
`

const Promo = () => (
  <Start p={[4, 5]} color="white">
    <Heading.h2 f={[5, 6]} m={0}>
      Get started.
    </Heading.h2>
    <Text color="red.0" f={[3, 4]} my={2}>
      Build the class you wish you could take.
    </Text>
    <Text color="red.0" f={[3, 4]} mb={[3, 4]}>
      Bring the movement to your school.
    </Text>
    <LargeButton.link to="/start" inverted children="Start a Club »" />
  </Start>
)

export default () => (
  <Base w={1} mt={3}>
    <Promo />
    <Grid py={4}>{times(12, i => <Img i={i} />)}</Grid>
  </Base>
)
