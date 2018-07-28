import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Heading, Container, Flex, Button, cx } from '@hackclub/design-system'
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

const ImageSheet = styled(Sheet.withComponent('img'))`
  min-height: 8rem;
`

export default () => (
  <Fragment>
    <Helmet title="Join Our Slack – Hack Club" />
    <style
      children={`
        html {
          background-image: linear-gradient(
            -32deg, ${cx('fuschia.5')}, ${cx('orange.5')}
          );
        }
      `}
    />
    <Nav />
    <Container maxWidth={48} p={3} color="white" align="center">
      <Heading.h1 f={6} mt={[4, 5]} mb={2}>
        Join the Hack Club Slack
      </Heading.h1>
      <Heading.h2 f={4} mb={4} regular>
        Talk to our community, get coding help, have fun.
      </Heading.h2>
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
      <Sheet maxWidth={28} align="left" my={4} mx="auto">
        <SlackForm />
      </Sheet>
      <ImageSheet w={1} bg="smoke" src="" />
      <Button href="https://hackclub.slack.com" inverted>
        Sign in »
      </Button>
    </Container>
  </Fragment>
)
