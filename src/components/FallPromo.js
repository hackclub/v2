import React from 'react'
import styled from 'styled-components'
import {
  Box,
  Flex,
  Text,
  Sheet,
  LargeButton,
  theme
} from '@hackclub/design-system'
import { Subhline, Lead } from 'components/Content'
import { Link } from 'gatsby'
import { Fade } from 'react-reveal'

const Base = styled(Sheet).attrs({
  my: [5, 6],
  p: 0,
  color: 'white',
  align: 'center'
})`
  display: grid;
  grid-gap: ${theme.space[3]}px;
  align-items: start;
  ${theme.mediaQueries.md} {
    grid-gap: ${theme.space[5]}px;
    grid-template-columns: 2fr 1fr;
  }
`

const CTAButton = styled(LargeButton).attrs({
  scale: true,
  chevronRight: true
})`
  text-transform: uppercase;
  color: ${theme.colors.primary};
  background: white;
`
const section = { px: [3, 4, 5], py: [4, 5] }
const Red = styled(Box).attrs(section)`
  height: 100%;
  background-color: ${theme.colors.primary};
  background-image: radial-gradient(
    ellipse farthest-corner at top left,
    ${theme.colors.warning},
    ${theme.colors.primary},
    rgb(162, 31, 19)
  );
`
const White = styled(Flex).attrs({
  ...section,
  flexDirection: 'column',
  justify: 'center',
  bg: 'white'
})`
  height: 100%;
`

const Timeline = styled(Flex).attrs({
  flexDirection: 'column'
})`
  line-height: 1.125;
  position: relative;
  &:before {
    content: '';
    background-image: linear-gradient(
      to bottom,
      ${theme.colors.white} 0%,
      ${theme.colors.smoke} 15%,
      ${theme.colors.smoke} 85%,
      ${theme.colors.white} 100%
    );
    height: 100%;
    width: 3px;
    margin-left: 4px;
    position: absolute;
  }
`
const TimelineStep = styled(Flex).attrs({
  align: 'center',
  pt: props => (props.first ? 0 : [2, 3])
})`
  line-height: 1.125;
`
const Circle = styled(Box).attrs({
  p: 1,
  bg: 'rgb(241, 139, 107)',
  color: 'white'
})`
  border-radius: ${theme.pill};
  display: inline-block;
  line-height: 0;
`

Timeline.Step = ({ name, duration, first = false }) => (
  <Fade bottom>
    <TimelineStep first={first}>
      <Circle mr={3} />
      <Box align="left">
        <Text color="muted" fontSize={0} caps children={duration} />
        <Text color="rgb(236, 102, 71)" fontSize={3} children={name} />
      </Box>
    </TimelineStep>
  </Fade>
)

LargeButton.link = LargeButton.withComponent(Link)

const FallPromo = ({ buttonProps = {}, ...props }) => (
  <Base {...props}>
    <Red>
      <Subhline maxWidth={28} mx="auto">
        Start a club in the&nbsp;fall.
      </Subhline>
      <Lead maxWidth={36} mx="auto" color="white" fontSize={[3, 4]} my={2}>
        Launching a club at the start of the school year is tough—so get a head
        start by joining our waitlist. We'll send you resources to plan, from
        marketing to running your first meeting, over summer.
      </Lead>
      <CTAButton
        href="https://apply.hackclub.com"
        children="Join the waitlist"
        mt={[0, 2]}
      />
    </Red>
    <White>
      <Timeline>
        <Timeline.Step
          icon="send"
          name="Join the list"
          duration="Right now"
          first
        />
        <Timeline.Step name="Plan your club" duration="Over summer" />
        <Timeline.Step name="Apply to Hack Club" duration="Next fall" />
        <Timeline.Step name="Interview call" duration="Within 2 days" />
        <Timeline.Step
          name="Run your first meeting"
          duration="Within 2 weeks"
        />
      </Timeline>
    </White>
  </Base>
)

export default FallPromo
