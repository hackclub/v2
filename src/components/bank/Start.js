import React from 'react'
import styled from 'styled-components'
import { Box, Container, Link, theme } from '@hackclub/design-system'
import { Fade } from 'react-reveal'
import { Title, Subhline, Lead } from 'components/Content'
import Sheet from 'components/Sheet'
import Timeline from 'components/bank/Timeline'
import Form from 'components/bank/Signup'
import Stats from 'components/bank/Stats'

const Grid = styled(Container).attrs({ maxWidth: 48 })`
  display: grid;
  grid-gap: ${theme.space[3]}px;
  align-items: start;
  ${theme.mediaQueries.md} {
    grid-gap: ${theme.space[5]}px;
    grid-template-columns: 3fr 2fr;
  }
`

/*
const Timeline = styled(Flex).attrs({
  flexDirection: 'column'
})`
  line-height: 1.125;
  position: relative;
  &:before {
    content: '';
    background-image: linear-gradient(
      to bottom,
      ${theme.colors.dark} 0%,
      ${theme.colors.slate} 15%,
      ${theme.colors.slate} 85%,
      ${theme.colors.dark} 100%
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
const Circle = styled(Box).attrs({ p: 1, bg: 'primary', color: 'white' })`
  border-radius: ${theme.pill};
  display: inline-block;
  line-height: 0;
`

Timeline.Step = ({ name, duration, first = false }) => (
  <Fade top>
    <TimelineStep first={first}>
      <Circle mr={3} />
      <Box align="left">
        <Text color="muted" fontSize={0} caps children={duration} />
        <Text color="smoke" fontSize={3} children={name} />
      </Box>
    </TimelineStep>
  </Fade>
)
*/

export default () => (
  <Box.section bg="darker" py={[5, 6, 7]} id="apply">
    <Container px={3} mb={[4, 5]} align="center">
      <Title color="white" mb={2}>
        Sign up for Hack&nbsp;Club Bank.
      </Title>
      <Lead maxWidth={32} color="muted">
        Open to all US-based registered Hack Clubs, hackathons, and your next
        amazing project.
      </Lead>
    </Container>
    <Timeline />
    <Grid mt={[4, 5]} mb={[3, 4]} px={3}>
      {/* 
      <Timeline>
        <Timeline.Step name="Apply" duration="Right now" first />
        <Timeline.Step name="Interview call" duration="In 2 days" />
        <Timeline.Step name="Sign the contract" duration="Same day" />
        <Timeline.Step name="Receive debit cards" duration="1 week later" />
      </Timeline>
      */}
      <Fade bottom>
        <Sheet bg="#252429" color="snow" maxWidth={32} p={[3, 4, 5]}>
          <Subhline fontSize={[3, 4]} mb={3}>
            Your project
          </Subhline>
          <Form />
        </Sheet>
      </Fade>
      <div>
        <Stats
          color="smoke"
          labelColor="muted"
          fontSize={[7, 8]}
          my={[3, 4]}
          px={[0, 0]}
          width="auto"
          align="left"
        />
        <Lead color="slate" fontSize={2}>
          Starting in February 2020, we started running Hack Club HQ on Bank (&
          we don’t count our numbers in these stats).{' '}
          <Link href="https://bank.hackclub.com/hq" color="primary">
            See our finances here.
          </Link>
        </Lead>
      </div>
    </Grid>
    <Lead maxWidth={36} color="slate" align="center" fontSize={2}>
      Hack Club does not directly provide banking services. Banking services
      provided by Silicon Valley Bank, an FDIC-certified institution.
    </Lead>
  </Box.section>
)
