import React from 'react'
import styled from 'styled-components'
import {
  Container,
  Flex,
  Heading,
  Link as A,
  theme
} from '@hackclub/design-system'
import { Lead } from 'components/Content'
import Possibility from 'components/bank/Possibility'
import Fade from 'react-reveal/Fade'

const Slide = styled(Flex).attrs({
  flexDirection: 'column',
  justify: 'end',
  bg: 'snow',
  width: '100vw'
})`
  background: url('/bank/bg.jpg');
  box-shadow: inset 0 0 4rem 4rem rgba(0, 0, 0, 0.5);
  background-position: center;
  background-size: cover;
  width: 100vw;
  min-height: 100vh;
  position: relative;
  h1 {
    line-height: 1.125;
    letter-spacing: -0.02em;
    text-shadow: 0 0 16px rgba(0, 0, 0, 1);
  }
  p {
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  }
`

const Vignette = styled.div`
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.25) 25%,
    rgba(0, 0, 0, 0.625) 50%,
    rgba(0, 0, 0, 0.75) 100%
  );
  height: 50vh;
  left: 0;
  right: 0;
  position: absolute;
  bottom: 0;
`

const Underline = styled.span`
  background-image: url(${require('../../../static/underline.svg')});
  background-repeat: no-repeat;
  background-size: 100% 1rem;
  background-position: bottom center;
`

const LocationPill = styled(Flex).attrs({
  fontSize: 1,
  py: 1,
  px: 3,
  mb: [3, 4],
  color: 'dark'
})`
  border-radius: ${theme.pill};
  background: rgba(255, 255, 255, 0.875);
  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    background: rgba(255, 255, 255, 0.5) !important;
    -webkit-backdrop-filter: saturate(180%) blur(2px);
  }
  ${theme.mediaQueries.reduceTransparency} {
    background: ${theme.colors.muted} !important;
  }
`

export default () => (
  <Slide>
    <Vignette />
    <Possibility />
    <Container
      pt={[6, 7, 8]}
      pb={[4, 5]}
      px={3}
      align="center"
      color="white"
      mt="auto"
      maxWidth={75}
    >
      <Fade bottom>
        <Heading.h1 fontSize={[5, 6, 7, 8]}>
          The bank for the <Underline>best</Underline> high&nbsp;school
          hackathons <Underline>in the world</Underline>.
        </Heading.h1>
        <Lead maxWidth={48} my={4} fontSize={[3, 4]}>
          The team behind{' '}
          <A
            href="https://www.losaltoshacks.com/?ref=bank"
            color="inherit"
            bold
            hoverline
          >
            Los Altos Hacks
          </A>{' '}
          is one of dozens of teams using <strong>Hack&nbsp;Club Bank</strong>{' '}
          to run world-class hackathons.
        </Lead>
      </Fade>
    </Container>
    <Flex justify={['center', 'flex-end']} px={3}>
      <LocationPill>Sunnyvale, CA</LocationPill>
    </Flex>
  </Slide>
)
