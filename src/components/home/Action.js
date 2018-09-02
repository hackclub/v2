import React from 'react'
import styled from 'styled-components'
import { Box, Heading, Text, LargeButton } from '@hackclub/design-system'
import Link from 'gatsby-link'
import Sheet from 'components/Sheet'
import Framed from 'components/Framed'

const PromoBox = styled(Sheet)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: calc(100% - 12vw);
  max-width: 40rem;
  text-align: center;
  z-index: 2;
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

const PromoHeading = styled(Heading.h2)`
  color: ${({ theme }) => theme.colors.primary};
  @supports (-webkit-background-clip: text) {
    background: linear-gradient(
      48deg,
      ${({ theme }) => theme.colors.pink[5]},
      ${({ theme }) => theme.colors.red[5]},
      ${({ theme }) => theme.colors.orange[5]}
    );
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

const Action = styled(LargeButton.withComponent(Link)).attrs({
  chevronRight: true,
  scale: true,
  f: [2, 3]
})`
  background-image: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.pink[5]},
    ${({ theme }) => theme.colors.red[5]}
  );
`

export default () => (
  <Framed
    imageSrc="/action.jpg"
    imageAlt="Group of high school students coding together"
  >
    <PromoBox p={[3, 4, 5]}>
      <PromoHeading f={[4, 5, 6]} my={0}>
        Join Hack Club.
      </PromoHeading>
      <Text f={[2, 4]} mt={3} mb={2}>
        Start a new chapter or join the network with an existing computer
        science club.
      </Text>
      <Text f={[2, 4]} mb={4}>
        We're excited to get to know you.
      </Text>
      <Action to="/start" children="Get Started" />
    </PromoBox>
  </Framed>
)
