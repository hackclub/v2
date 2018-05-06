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
import Framed from 'components/Framed'

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
    <PromoHeading f={[4, 5, 6]} my={0}>
      Get your club started.
    </PromoHeading>
    <Text f={[2, 4]} mt={3} mb={2}>
      Your high school is waiting for your club.
    </Text>
    <Text f={[2, 4]} mb={4}>
      We’ll help you through every step.
    </Text>
    <Action to="/start" children="Start Your Club »" />
  </PromoBox>
)

export default () => (
  <Framed
    imageSrc="/action.jpg"
    imageAlt="Group of high school students coding together"
  >
    <Promo />
  </Framed>
)
