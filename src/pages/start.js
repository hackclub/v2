import React, { Fragment } from 'react'
import {
  BackgroundImage,
  Box,
  Card,
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
  h2,
  p {
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

const FramedContent = styled(Container)([], shadows)
const OthersCard = styled(Box)`
  background-color: rgba(255, 255, 255, 0.625);
  width: 100vw;
  left: 0;
  position: absolute;
  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    -webkit-backdrop-filter: blur(8px);
  }
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 28rem;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    border-radius: ${({ theme }) => theme.radius};
  }
  p {
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.fontSizes[2]}px;
    line-height: 1.25;
    text-shadow: none;
  }
`

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

const title = 'Start Your Hack Club'
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
    <PhotoSection src="/lah_1.jpg" style={{ padding: 0 }}>
      <Container maxWidth={56} p={[2, 3]} mt={[5, 6]} mb={[4, 5]}>
        <Heading.h1 {...styles.ultraline} color="white">
          Buckle up your bootstraps.
        </Heading.h1>
        <Heading.h2 {...styles.subhline} color="white" f={[4, 5]} mt={3} mb={4}>
          Whether you're interested in starting a new chapter or joining Hack
          Club with an existing CS club, we should talk.
        </Heading.h2>
      </Container>
    </PhotoSection>
    <Container px={3} my={[3, 5]}>
      <Box color="black">
        <Heading.h2 f={[5, 6]} mb={3}>
          So what does this actually look like?
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
            No. Every school is very different and you're going to need to
            heavily customize our advice and resources. We try our best, but
            you know your school better than we do.
          </Text>
          <Heading.h3 f={[4, 5]} mt={4}>
            What if I already run a computer science club?
          </Heading.h3>
          <Text f={[3, 4]} my={3}>
            Existing CS clubs are welcome to become Hack Clubs. You get the
            full benefits of the network, though we'll probably be less
            helpful than with new clubs.
          </Text>
        </Container>
      </Box>
    </Container>
    <Row my={[3, 4]}>
      <Box color="black">
        <Heading.h2 {...styles.headline} mb={3}>
          HQ provides the resources to get you started
        </Heading.h2>
        <Text {...styles.subhline}>
          We have a bunch of experience helping start 200+ clubs and will
          help you get off the ground.
        </Text>
      </Box>
      <Modules>
        <Module
          icon="forum"
          heading="Community"
          body="Join our Slack and meet thousands of other club leaders and members around the world."
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
          body="Talk to our team for guidance and assistance whenever you need help."
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
    <PhotoSection
      src="/lah_2.jpg"
      aria-label="Students stacking cups together"
      py={[50, 250, 350]}
    >
    </PhotoSection>
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
    <Footer />
  </Fragment>
)
