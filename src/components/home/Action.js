import React from 'react'
import styled from 'styled-components'
import {
  Section,
  BackgroundImage,
  Heading,
  Text,
  LargeButton,
  theme
} from '@hackclub/design-system'
import Link from 'gatsby-link'
import Sheet from 'components/Sheet'

const Base = styled(Section.withComponent(BackgroundImage))`
  position: relative;
  min-height: 36rem;
`

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
  ${theme.mediaQueries.reduceTransparency} {
    -webkit-backdrop-filter: auto !important;
  }
  ${theme.mediaQueries.sm} {
    br {
      display: none;
    }
  }
`

const PromoHeading = styled(Heading.h2)`
  color: ${theme.colors.primary};
  @supports (-webkit-background-clip: text) {
    background: linear-gradient(
      48deg,
      ${theme.colors.pink[5]},
      ${theme.colors.red[5]},
      ${theme.colors.orange[5]}
    );
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

const Action = styled(LargeButton.withComponent(Link)).attrs({
  chevronRight: true,
  scale: true,
  fontSize: [2, 3]
})`
  background-image: linear-gradient(
    to bottom,
    ${theme.colors.pink[5]},
    ${theme.colors.red[5]}
  );
`

export default () => (
  <Base
    src="/action.jpg"
    aria-label="Group of high school students coding together"
  >
    <PromoBox py={[4, 5]} px={[3, 5]} style={{ margin: 0 }}>
      <PromoHeading fontSize={[5, 6]} my={0}>
        Join Hack Club.
      </PromoHeading>
      <Text fontSize={[3, 4]} mt={3} mb={2}>
        Start a new chapter or join the network with an existing computer
        science club.
      </Text>
      <Text fontSize={[3, 4]} mb={4}>
        We’re excited to meet you.
      </Text>
      <Action to="/start" children="Get Started" />
    </PromoBox>
  </Base>
)
