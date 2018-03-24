import React from 'react'
import {
  Container,
  Box,
  Flex,
  Heading,
  Text,
  LargeButton
} from '@hackclub/design-system'
import Link from 'gatsby-link'
import Animator from 'components/Animator'

const Base = Box.extend`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 36rem;
`

const Photo = Box.withComponent('img').extend`
	position: absolute;
	z-index: 1;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	object-fit: cover;
`

const PromoBox = Box.extend`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: calc(100% - 12vw);
  max-width: 40rem;
  text-align: center;
  z-index: 2;
  border-radius: ${props => props.theme.radii[2]};
  box-shadow: ${props => props.theme.boxShadows[3]};
  background-color: rgba(255, 255, 255, 0.75);
  background-color: ${props => props.theme.colors.snow};
  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    background-color: rgba(255, 255, 255, 0.75);
    -webkit-backdrop-filter: saturate(180%) blur(16px);
  }
  @media screen and (prefers-reduced-transparency: reduce) {
    -webkit-backdrop-filter: auto !important;
  }
  ${props => props.theme.mediaQueries.sm} {
    br {
      display: none;
    }
  }
`

const PromoHeading = Heading.h2.extend`
  background: linear-gradient(
    48deg,
    ${props => props.theme.colors.orange[4]},
    ${props => props.theme.colors.red[5]},
    ${props => props.theme.colors.red[6]}
  );
  background-repeat: no-repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: ${props => props.theme.colors.primary};
`

const Action = LargeButton.withComponent(Link).extend`
  transition: transform 0.125s ease-out;
  will-change: transform;
  transform: scale(1);
  &:hover,
  &:focus {
    transform: scale(1.06);
  }
  @media (prefers-reduced-motion: reduce) {
    transform: none !important;
  }
`

const Promo = () => (
  <PromoBox p={[3, 4, 5]}>
    <PromoHeading f={[4, 5, 6]} m={0}>
      Get your club started.
    </PromoHeading>
    <Text f={[2, 4]} my={2}>
      Build the class you wish you could take.
    </Text>
    <Text f={[2, 4]} mb={4}>
      Bring the movement to your school.
    </Text>
    <Action to="/start" children="Start Your Club »" />
  </PromoBox>
)

const Frame = Box.extend`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 8;
  pointer-events: none;
`

const BorderBase = Box.extend`
  position: absolute;
  z-index: 4;
  background: white;
`

const BorderTop = BorderBase.extend`
  top: 0;
  left: 0;
  width: 100%;
  height: 5vw;
  min-height: ${props => props.theme.space[4]}px;
  transform-origin: center top;
`

const BorderRight = BorderBase.extend`
  top: 0;
  right: 0;
  width: 5vw;
  height: 100%;
  min-width: ${props => props.theme.space[4]}px;
  transform-origin: right center;
`

const BorderBottom = BorderBase.extend`
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5vw;
  transform-origin: center bottom;
`

const BorderLeft = BorderBase.extend`
  top: 0;
  left: 0;
  width: 5vw;
  height: 100%;
  transform-origin: left center;
`

const BorderX = props => (
  <Animator
    data={{
      transform: [{ scaleX: 1 }, { scaleX: 0 }]
    }}
    {...props}
  />
)

const BorderY = props => (
  <Animator
    data={{
      transform: [{ scaleY: 1 }, { scaleY: 0 }]
    }}
    {...props}
  />
)

export default () => (
  <Base>
    <Frame>
      <BorderY is={BorderTop} />
      <BorderX is={BorderRight} />
      <BorderY is={BorderBottom} />
      <BorderX is={BorderLeft} />
    </Frame>
    <Photo
      src="/action.jpg"
      alt="Group of high school students coding together"
    />
    <Promo />
  </Base>
)
