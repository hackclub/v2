import React, { Fragment } from 'react'
import {
  BackgroundImage,
  Box,
  Container,
  Flex,
  Heading,
  Link as A,
  Section,
  Text
} from '@hackclub/design-system'
import styled, { css } from 'styled-components'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Nav from 'components/Nav'
import Module from 'components/Module'
import Framed from 'components/Framed'
import Start from 'components/Start'
import Footer from 'components/Footer'

const shadows = `
  h1,
  h2 {
    color: #fff;
    text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
  }
`
const PhotoSection = styled(Section)`
  position: relative;
  background: linear-gradient(rgba(0, 0, 0, 0.325), rgba(0, 0, 0, 0.125)),
    url(${props => props.src});
  background-position: center;
  background-size: cover;
  ${shadows};
`
PhotoSection.defaultProps = {
  py: 4
}

const Modules = styled(Box)`
  display: grid;
  grid-gap: ${({ theme }) => theme.space[3]}px;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, 1fr);
  }
  > div {
    align-items: flex-start;
    padding: 0;
    text-align: left;
    width: 100% !important;
  }
  p {
    color: ${({ theme }) => theme.colors.slate};
    line-height: 1.375;
  }
`

const Notification = styled(Flex)`
  border-radius: ${({ theme }) => theme.radius};
  background-color: rgba(255, 255, 255, 0.9375);
  strong {
    font-weight: bold;
  }
`
Notification.defaultProps = {
  py: 3,
  px: 4,
  mb: 3,
  mt: 5,
  mx: 2,
  align: 'center',
  justify: 'center',
  color: 'gray.9',
  flexDirection: 'column'
}

const Row = Container.extend.attrs({ color: 'black', px: 3, py: [3, 4] })`
  display: grid;
  grid-gap: ${({ theme }) => theme.space[3]}px;
  text-align: left;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: ${props => props.cols || '2fr 3fr'};
    grid-gap: ${({ theme }) => theme.space[4]}px;
  }
`

const styles = {
  ultraline: { f: [6, 7], style: { lineHeight: '1.0625' } },
  headline: { f: [5, 6], style: { lineHeight: '1.125' } },
  subhline: {
    f: [3, 4],
    color: 'black',
    regular: true,
    style: { lineHeight: '1.375' }
  },
  contentContainer: {
    maxWidth: 64,
    w: 1,
    p: [3, 2]
  }
}

const title = 'Start Your Hack Club | Hack Club'
const description =
  'Learn how to start a coding club at your high school through Hack Club. Get programming club ideas, curriculum, activities, and more.'

export default () => (
  <Fragment>
    <Helmet
      title={title}
      meta={[
        { name: 'twitter:title', content: title },
        { name: 'description', content: description },
        { name: 'twitter:description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: 'https://hackclub.com/start' }
      ]}
    />
    <Nav />
    <PhotoSection src="/lah_2.jpg">
      <Notification>
        <Text f={3} bold>
          Fall 2018 applications due by September 30th
        </Text>
        <Text f={2}>
          Applications are open and accepted on a rolling basis.
        </Text>
      </Notification>
      <Container maxWidth={56} p={[2, 3]} mb={[5, 6]}>
        <Heading.h1 {...styles.ultraline} color="white">
          Let’s get started.
        </Heading.h1>
        <Heading.h2 {...styles.subhline} color="white" f={[4, 5]} mt={3}>
          Whether you're interested in starting a new chapter or joining Hack
          Club with an existing CS club, we should talk.
        </Heading.h2>
      </Container>
    </PhotoSection>
    <Row my={[3, 4]}>
      <Box color="black">
        <Heading.h2 {...styles.headline} mb={3}>
          HQ provides the support to get you started
        </Heading.h2>
        <Text {...styles.subhline}>
          Get your club started with our resources used by 200+ Hack Clubs.
        </Text>
      </Box>
      <Modules>
        <Module
          icon="forum"
          heading="Community"
          body="Join our Slack and meet hundreds of other club leaders and members around the world."
          color="red.5"
        />
        <Module
          icon="pages"
          heading="Curriculum"
          body="Give your members dozens of free tutorials for making websites, apps, and games."
          color="orange.5"
        />
        <Module
          icon="voice_chat"
          heading="Mentorship"
          body="Talk to our team over a call or on Slack for guidance and assistance whenever you need help."
          color="yellow.7"
        />
        <Module
          icon="chrome_reader_mode"
          heading="Guidelines"
          body="Learn from hundreds of other clubs—we’ve got information, advice, and experience."
          color="teal.7"
        />
        <Module
          icon="local_activity"
          heading="Local events"
          body="Attend hackathons, workshops, and other events from Hack Clubs near yours."
          color="blue.5"
        />
        <Module
          icon="wallpaper"
          heading="Marketing"
          body="Get stickers, posters, and ideas for spreading the word about your amazing club meetings."
          color="indigo.5"
        />
      </Modules>
    </Row>
    <Container px={3} mt={[0, 0, -75]} mb={[3, 5]}>
      <Box color="black">
        <Heading.h3 f={[4, 5]} mt={4}>
          Already have a club?
        </Heading.h3>
        <Text f={[3, 4]} my={3}>
          Great! When established CS clubs join, they get the full benefits
          of the network. Hack Club is currently optimized for new chapters,
          but we're increasing the benefits for existing clubs every day with
          launches like{' '}
          <A href="https://hackathons.hackclub.com" target="_blank">hackathons</A>
          {' '}and{' '}
          <A href="/bank" target="_blank">bank</A>.
        </Text>
      </Box>
    </Container>
    <Container px={3} my={[3, 5]}>
      <Box color="black">
        <Heading.h2 f={[5, 6]} mt={5} mb={4}>
        What do meetings look like?
        </Heading.h2>
        <Container maxWidth={48} mx={0}>
          <Text f={[3, 4]}>
            Hack Clubs meet weekly, typically for 1.5 hours. Meetings
            resemble mini-hackathons, where members learn to code through
            building projects like{' '}
            <A href="https://sohuang.github.io/" target="_blank">websites</A>
            {' '}and{' '}
            <A href="https://messy-wool.surge.sh/catch.html" target="_blank">games</A>.
          </Text>
          <Text f={[3, 4]} my={3}>
            Clubs are led by teams of 2-3 students (sorry, no parents or
            teachers). We ask that at least 1 leader be technically adept
            enough to write and customize <A href="/workshops" target="_blank">workshops</A>.
          </Text>
          <Heading.h3 f={[4, 5]} mt={4}>
            What happens outside of club meetings?
          </Heading.h3>
          <Text f={[3, 4]} my={3}>
            After Hack Clubs establish a dedicated base of members, they begin
            to attend{' '}
            <A href="https://hackathons.hackclub.com" target="_blank">nearby hackathons</A>
            {' '}and eventually host their own (sometimes with{' '}
            <A href="/bank" target="_blank">Hack Club Bank</A>).
          </Text>
          <Heading.h3 f={[4, 5]} mt={4}>
            Will you provide everything to make my club successful?
          </Heading.h3>
          <Text f={[3, 4]} my={3}>
            No. Every school is different and you're going to need to heavily
            customize our advice and resources. We try our best, but you know
            your school better than we do.
          </Text>
        </Container>
      </Box>
    </Container>
    <Row my={[4, 5]}>
      <Box mt={-4}>
        <Text color="accent" f={4} bold caps>
          here's the process
        </Text>
        <Heading.h2 {...styles.headline}>Apply and start your club.</Heading.h2>
      </Box>
      <Modules w={1}>
        <Module
          icon="assignment"
          heading="1. Apply"
          body="Submit your information to start—totally free."
          color="primary"
        />
        <Module
          icon="ring_volume"
          heading="2. Training call"
          body="We’ll chat and begin a plan for your club."
          color="teal.7"
        />
        <Module
          icon="event_available"
          heading="3. Lead your club!"
          body="Schedule your first meeting and get ready!"
          color="info"
        />
      </Modules>
    </Row>
    <Start
      mt={4}
      buttonProps={{ children: 'Begin Your Application', to: '/apply' }}
    />
    <PhotoSection
      src="/lah_1.jpg"
      aria-label="Students stacking cups together"
      py={[0, 250, 350]}
      my={[0, -50]}
      style={{zIndex: -1}}
    >
    </PhotoSection>
    <Footer />
  </Fragment>
)
