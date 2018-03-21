import React from 'react'
import {
  Container,
  Box,
  Card,
  Flex,
  Heading,
  Text,
  LargeButton
} from '@hackclub/design-system'
import Link from 'gatsby-link'
import Animator from 'components/Animator'
import { times } from 'lodash'

const Base = Flex.withComponent(Container).extend`
  background-image: linear-gradient(
    to bottom,
    ${props => props.theme.colors.white},
    ${props => props.theme.colors.snow}
  );
  position: relative;
`

const PhotoBase = Card.withComponent('img').extend`
  height: min-intrinsic;
`
const Photo = props => (
  <Animator
    is={PhotoBase}
    m={[2, 3]}
    w={[1 / 2, 1 / 5]}
    boxShadowSize="md"
    data={{
      range: [0.75, 0.8],
      opacity: [0.5, 1],
      transform: [{ translateX: '-96px' }, { translateX: '0px' }]
    }}
    {...props}
  />
)

LargeButton.link = LargeButton.withComponent(Link)

const Start = Card.extend`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  margin: 2rem auto;
  max-width: 36rem;
  text-align: center;
  z-index: 2;
  border-radius: ${props => props.theme.radii[2]};
  box-shadow: ${props => props.theme.boxShadows[3]};
  background-color: rgba(255,255,255,.75);
  /* background-color: ${props => props.theme.colors.red[5]}; */
  /* background-image: linear-gradient(
    -48deg,
    ${props => props.theme.colors.orange[4]},
    ${props => props.theme.colors.red[5]},
    ${props => props.theme.colors.red[6]}
  );*/
  -webkit-backdrop-filter: blur(${props => props.theme.space[2]}px);


    line-height: 1.5;
    /*
  ${props => props.theme.mediaQueries.md} {
    margin-left: 12.5vw;
    width: 75vw;
  }
  ${props => props.theme.mediaQueries.lg} {
    margin-left: 25vw;
    width: 50vw;
  }
  */
`

const Promo = () => (
  <Start p={[4, 5]} color="primary">
    <Heading.h2 f={[5, 6]} m={0}>
      Get started.
    </Heading.h2>
    <Text f={[3, 4]} my={2}>
      Build the class you wish you could take.
    </Text>
    <Text color="warning" f={[3, 4]} mb={4}>
      Bring the movement to your school.
    </Text>
    <LargeButton.link to="/start" children="Start a Club »" />
  </Start>
)

export default () => (
  <Box.section my={[4, 5]} py={4} style={{ position: 'relative' }}>
    <Promo />
    <Base wrap justify="center" w={1}>
      <Photo src="/about_hacking.jpg" />
      <Photo src="/about_talking.jpg" />
      <Photo src="/about_group.jpg" />
      <Photo src="/about_all.jpg" />
      <Photo src="/about_all.jpg" />
      <Photo src="/about_all.jpg" />
    </Base>
  </Box.section>
)
