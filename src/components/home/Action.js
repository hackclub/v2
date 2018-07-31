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
  border-radius: ${({ theme }) => theme.radii[2]};
  box-shadow: ${({ theme }) => theme.boxShadows[3]};
  background-color: rgba(255, 255, 255, 0.75);
  background-color: ${({ theme }) => theme.colors.snow};
  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    background-color: rgba(255, 255, 255, 0.75);
    -webkit-backdrop-filter: saturate(180%) blur(16px);
  }
  ${({ theme }) => theme.mediaQueries.reduceTransparency} {
    -webkit-backdrop-filter: auto !important;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    br {
      display: none;
    }
  }
`

const PromoHeading = Heading.h2.extend`
  background: linear-gradient(
    48deg,
    ${({ theme }) => theme.colors.orange[4]},
    ${({ theme }) => theme.colors.red[5]},
    ${({ theme }) => theme.colors.red[6]}
  );
  background-repeat: no-repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
`

const Action = LargeButton.withComponent(Link)

const Promo = () => (
  <PromoBox p={[3, 4, 5]}>
    <PromoHeading f={[4, 5, 6]} my={0}>
      Get Started
    </PromoHeading>
    <Text f={[2, 4]} mt={3} mb={2}>
      Start a new chapter or join the network with an existing computer
      science club.
    </Text>
    <Text f={[2, 4]} mb={4}>
      We're excited to get to know you.
    </Text>
    <Action to="/start" chevronRight scale children="Learn About Joining" />
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
