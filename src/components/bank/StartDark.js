import React, { Fragment } from 'react'
import styled from 'styled-components'
import {
  Box,
  Container,
  Flex,
  Icon,
  Avatar,
  Text,
  Badge,
  theme
} from '@hackclub/design-system'
import { Fade } from 'react-reveal'
import { Headline, Subhline, Lead } from 'components/Content'
import Sheet from 'components/Sheet'
import Form from 'components/challenge/PostForm'

const Grid = styled(Box)`
  display: grid;
  grid-gap: ${theme.space[3]}px;
  align-items: start;
  ${theme.mediaQueries.md} {
    grid-template-columns: 2fr 3fr 1fr;
  }
`

const Row = ({ icon, text }) => (
  <Fade bottom>
    <Flex align="center" mb={[2, 3]}>
      <Icon glyph={icon} size={48} mr={3} />
      <Text align="left" fontSize={[3, 4, 5]} children={text} />
    </Flex>
  </Fade>
)

const Timeline = styled(Flex).attrs({
  flexDirection: 'column'
})`
  position: relative;
  line-height: 1.125;

  &:before {
    content: '';
    background: ${theme.colors.slate};
    height: 100%;
    width: 4px;
    margin-left: 20px;
    position: absolute;
    z-index: 0;
  }
`
const TimelineStep = styled(Flex).attrs({
  pr: 2,
  align: 'center'
})`
  border-radius: ${theme.pill};
  z-index: 2;
  line-height: 1.125;
`
const Circle = styled(Box).attrs({ p: 1, bg: 'primary', color: 'white' })`
  border-radius: ${theme.pill};
  display: inline-block;
  line-height: 0;
`
Timeline.Step = ({ icon, name, duration, mb = [3, 4] }) => (
  <Fade top>
    <TimelineStep mb={mb}>
      <Circle mr={3}>
        <Icon glyph={icon} size={32} />
      </Circle>
      <Box align="left">
        <Text color="muted" fontSize={0} caps children={duration} />
        <Text color="smoke" fontSize={3} children={name} />
      </Box>
    </TimelineStep>
  </Fade>
)

export default () => (
  <Box.section bg="dark" py={[5, 6, 7]}>
    <Container px={3}>
      <Headline color="white" mb={2}>
        Sign up for Hack Club Bank.
      </Headline>
      <Lead color="muted">
        You need to be a student-led STEM activity of a type Zach knows.
      </Lead>
      <Grid mt={[4, 5]}>
        <Timeline>
          <Timeline.Step icon="send" name="Apply" duration="Right now" />
          <Timeline.Step
            icon="welcome"
            name={
              <Fragment>
                Interview call with{' '}
                <Flex align="center">
                  <Avatar
                    src="/hackers/michael.jpg"
                    size={32}
                    alt="Michael’s avatar"
                    mr={1}
                  />
                  Michael
                </Flex>
              </Fragment>
            }
            duration="In 2 days"
          />
          <Timeline.Step
            icon="post"
            name="Sign the contract"
            duration="Same day"
          />
          <Timeline.Step
            icon="card"
            name="Receive debit cards"
            duration="1 week later"
            mb={0}
          />
        </Timeline>
        <Fade bottom>
          <Sheet bg="black" color="snow" p={[3, 4, 5]}>
            <Subhline fontSize={[4, 5]}>Create your account</Subhline>
            <Form />
          </Sheet>
        </Fade>
      </Grid>
    </Container>
  </Box.section>
)
