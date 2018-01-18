import React from 'react'
import {
  Section,
  Box,
  Heading,
  LargeButton,
  mediaQueries
} from '@hackclub/design-system'
import { Link } from 'react-static'
import { wk } from '../theme'

const tilt = n =>
  wk(`clip-path: polygon(0% ${100 - n}%, 100% 0, 100% ${n}%, 0 100%)`)

const Base = Section.extend`
  ${tilt(90)};
  background-color: ${props => props.theme.colors.red[5]};
  background-image: linear-gradient(
    -48deg,
    ${props => props.theme.colors.orange[4]} 0%,
    ${props => props.theme.colors.red[5]} 50%,
    ${props => props.theme.colors.red[6]} 100%
  );
  padding: 4rem 0 !important;
  margin-top: -4rem;
  ${mediaQueries[2]} {
    padding-top: 5rem 0 !important;
    ${tilt(85)};
  }
  h3 {
    font-weight: normal;
    line-height: 1.5;
    opacity: 0.9;
  }
`

LargeButton.link = LargeButton.withComponent(Link)

const Start = props => (
  <Base
    justify="space-around"
    flexDirection={['column', null, 'row']}
    {...props}
  >
    <Box p={[2, 3]} align="center">
      <Heading.h2 f={[5, 6]} m={0}>
        Start a Hack Club.
      </Heading.h2>
      <Heading.h3 f={[3, 4]} my={1}>
        Bring the movement to your school.
      </Heading.h3>
      <Heading.h3 f={[3, 4]} m={0}>
        Build the class you wish you could take.
      </Heading.h3>
    </Box>
    <Box p={3}>
      <LargeButton.link to="/start" inverted children="Get started »" />
    </Box>
    <style children="footer{margin-top:-5rem;padding-top:8rem !important}" />
  </Base>
)

export default Start
