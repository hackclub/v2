import React from 'react'
import styled from 'styled-components'
import {
  Section,
  BackgroundImage,
  Text,
  LargeButton,
  theme
} from '@hackclub/design-system'
import { Link } from 'gatsby'
import Sheet from 'components/Sheet'
import { ColoredHeadline } from 'components/Content'

const Base = styled(Section.withComponent(BackgroundImage)).attrs({
  py: [7, 8]
})`
  position: relative;
`

const PromoBox = styled(Sheet).attrs({
  maxWidth: 32,
  align: 'center',
  mb: 0,
  m: 'auto'
})`
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

const Action = styled(LargeButton.withComponent(Link)).attrs({
  chevronRight: true,
  scale: true,
  fontSize: [2, 3]
})`
  background-image: ${theme.gradient('pink.5', 'red.5')};
`

export default () => (
  <Base
    src="/action.jpg"
    aria-label="Group of high school students coding together"
  >
    <PromoBox py={[4, 5]} px={[3, 5]}>
      <ColoredHeadline colors={['pink.5', 'red.5', 'orange.5']} my={0}>
        Join Hack&nbsp;Club.
      </ColoredHeadline>
      <Text fontSize={[3, 4]} mb={2}>
        Start a new chapter or join the network with an existing coding club.
      </Text>
      <Text fontSize={[3, 4]} mb={4}>
        We’re excited to meet you.
      </Text>
      <Action to="/start/" children="Get Started" />
    </PromoBox>
  </Base>
)
