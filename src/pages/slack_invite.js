import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Box, Heading, Container, Flex, Button, cx } from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Sheet from 'components/Sheet'
import SlackForm from 'components/SlackForm'
import LiveStat from 'components/LiveStat'

const Stats = styled(Flex)`
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

const BackgroundContainer = styled(Box)`
  & > * {
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
  }
`

const BackgroundGradient = styled(Box)`
  // Support for browsers that don't support alpha hex codes
  background: ${cx('fuschia.5')};
  // Support for browsers that don't support gradients
  background: ${cx('fuschia.5')}f0;

  background: linear-gradient(
    -32deg, ${cx('fuschia.5')}f0, ${cx('orange.5')}c0
  );
`

const BackgroundVideo = () => (
  <video autoPlay muted loop playsInline>
    <source src="https://hackclub.github.io/slack-invite-background-video/slack.mp4" type="video/mp4" />
  </video>
)

export default () => (
  <Fragment>
    <Helmet title="Join Our Slack – Hack Club" />
    <BackgroundContainer>
      <BackgroundVideo />
      <BackgroundGradient />
    </BackgroundContainer>
    <Nav />
    <Container maxWidth={48} p={3} color="white" align="center">
      <Heading.h1 f={6} mt={[4, 5]} mb={2}>
        Join the Hack Club Slack
      </Heading.h1>
      <Heading.h2 f={4} mb={4} regular>
        Talk to our community, get coding help, have fun.
      </Heading.h2>
      {/* NOTE(@MaxWofford): Love the idea here, but it looks like stats aren't finished, so I'm commenting it for now
      <Stats>
        <LiveStat
          url=""
          path="total_members"
          f={7}
          mx={2}
          fallback="2K"
          label="total members"
        />
        <LiveStat
          url=""
          path="new_members_this_month"
          f={7}
          mx={2}
          fallback="2K"
          label="new members this month"
        />
        <LiveStat
          url=""
          path="new_messages_this_week"
          f={7}
          mx={2}
          fallback="10K"
          label="messages this week"
        />
      </Stats>
      */}
      <Sheet maxWidth={28} align="left" my={4} mx="auto">
        <SlackForm />
      </Sheet>
      <Button href="https://hackclub.slack.com" inverted target="_blank">
        Already have an account? Sign in »
      </Button>
    </Container>
  </Fragment>
)
