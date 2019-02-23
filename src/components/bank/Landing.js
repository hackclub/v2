import React, { Fragment } from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
// import times from 'lodash/times'
import {
  Container,
  Box,
  Flex,
  Heading,
  Text,
  theme
} from '@hackclub/design-system'
import Fade from 'react-reveal/Fade'
import { Lead } from 'components/Content'

const Slide = styled(Flex).attrs({
  flexDirection: 'column',
  justify: 'start',
  bg: 'snow',
  width: '100vw'
})`
  background: url('/bank/bg.jpg');
  box-shadow: inset 0 0 4rem 4rem rgba(0, 0, 0, 0.5);
  background-position: center top;
  background-size: cover;
  width: 100vw;
  min-height: 100vh;
  position: relative;

  h1 {
    line-height: 1.125;
    text-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
  }
  p {
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  }
`

const Vignette = styled.div`
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
  height: 100vh;
  left: 0;
  right: 0;
  position: absolute;
  top: 0;
  border-radius: 0;
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
  color: 'black'
})`
  border-radius: ${theme.pill};
  background: rgba(255, 255, 255, 0.75);
  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    -webkit-backdrop-filter: saturate(180%) blur(2px);
  }
  ${theme.mediaQueries.reduceTransparency} {
    background: ${theme.colors.white} !important;
  }
`

export default () => (
  <Slide>
    <Vignette />
    <Container
      pt={[6, 7, 8]}
      pb={[4, 5, 6, 7]}
      px={3}
      align="center"
      color="white"
    >
      <Fade top>
        <Fragment>
          <Heading.h1 fontSize={[5, 6, 7, 8]}>
            A bank for the <Underline>largest</Underline> high&nbsp;school
            hackathon <Underline>in the world</Underline>!
          </Heading.h1>
          <Lead my={4} fontSize={[3, 4]}>
            The team behind <strong>Los Altos Hacks</strong> is one of hundreds
            of teams around the world using <strong>Hack Club Bank</strong> to
            make their working lives simpler, more pleasant, and more
            productive.
          </Lead>
        </Fragment>
      </Fade>
    </Container>
    {/* <Flex justify={['center']} px={3} style={{ justifySelf: 'flex-end' }}>
      <LocationPill>Mountain View, CA</LocationPill>
    </Flex> */}
  </Slide>
)
