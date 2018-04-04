import React, { Fragment } from 'react'
import {
  Heading,
  Card,
  Container,
  Flex,
  Box,
  Text,
  Button,
  LargeButton,
  Section,
  Link as A
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Nav from 'components/Nav'
import Animator from 'components/Animator'
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
const PhotoSection = Section.extend`
  position: relative;
  background: linear-gradient(rgba(0, 0, 0, 0.325), rgba(0, 0, 0, 0.125)),
    url(${props => props.image});
  background-position: center;
  background-size: cover;
  ${shadows};
`

const Modules = Container.extend`
  display: grid;
  grid-gap: ${props => props.theme.space[3]}px;
  ${props => props.theme.mediaQueries.md} {
    grid-template-columns: repeat(3, 1fr);
  }
  > div {
    align-items: flex-start;
    padding: 0;
    text-align: left;
    width: 100% !important;
    &:nth-child(1) {
      color: ${props => props.theme.colors.indigo[6]};
    }
    &:nth-child(2) {
      color: ${props => props.theme.colors.teal[7]};
    }
    &:nth-child(3) {
      color: ${props => props.theme.colors.red[6]};
    }
    &:nth-child(4) {
      color: ${props => props.theme.colors.blue[7]};
      svg {
        margin-left: -6px;
      }
    }
    &:nth-child(5) {
      color: ${props => props.theme.colors.cyan[8]};
    }
    &:nth-child(6) {
      color: ${props => props.theme.colors.orange[6]};
    }
  }
`

const FramedContent = Container.extend([], shadows)
const OthersCard = Box.extend`
  background-color: rgba(255, 255, 255, 0.625);
  width: 100vw;
  left: 0;
  position: absolute;
  max-width: 28rem;
  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    -webkit-backdrop-filter: blur(8px);
  }
  ${props => props.theme.mediaQueries.md} {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    border-radius: ${props => props.theme.radius};
  }
  p {
    color: ${props => props.theme.colors.black};
    font-size: ${props => props.theme.fontSizes[2]};
    line-height: 1.375;
    text-shadow: none;
  }
`

Button.link = Button.withComponent(Link)
LargeButton.link = LargeButton.withComponent(Link)

const CTA = LargeButton.withComponent(Link).extend`
  transition: transform 0.125s ease-out;
  will-change: transform;
  transform: scale(1);
  &:hover,
  &:focus {
    transform: scale(1.06);
  }
  @media (prefers-reduced-motion: reduce) {
    transform: none !important;
  }
`

const Row = Container.extend.attrs({ px: 3, py: [3, 4] })`
  display: grid;
  grid-gap: ${props => props.theme.space[3]}px;
  text-align: left;
  ${props => props.theme.mediaQueries.md} {
    grid-template-columns: ${props => props.cols || '2fr 3fr'};
    grid-gap: ${props => props.theme.space[4]}px;
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
  'Learn how to start a coding club at your high school through Hack Club. ' +
  'Get programming club ideas, curriculum, activities, and more.'

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
    <Animator
      is={PhotoSection}
      data={{
        opacity: [1, 0.75],
        transform: [{ translateY: '0px' }, { translateY: '-96px' }]
      }}
      image="/lah_1.jpg"
      style={{ padding: 0 }}
    >
      <Nav />
      <Container maxWidth={56} p={[2, 3]} mt={3} mb={[4, 5]}>
        <Heading.h1 {...styles.ultraline} color="white">
          Learn how to start a coding club at your high school.
        </Heading.h1>
        <Heading.h2 {...styles.subhline} color="white" f={[4, 5]} mt={3} mb={4}>
          We’ll help every step of the way.
        </Heading.h2>
        <LargeButton.link to="/apply" f={[3, 4]}>
          Begin Your Application
        </LargeButton.link>
      </Container>
    </Animator>
    <Row cols="2fr 3fr" my={[4, 5]}>
      <Box color="black" mt={-4}>
        <Text color="accent" f={4} bold caps>
          Students!
        </Text>
        <Heading.h2 {...styles.headline}>Apply and start your club.</Heading.h2>
      </Box>
      <Modules align="left">
        <Module
          icon="assignment"
          heading="Apply"
          body="Submit your information to start—totally free."
        />
        <Module
          icon="ring_volume"
          heading="Training call"
          body="We’ll chat and begin a plan for your club."
        />
        <Module
          icon="event_available"
          heading="Lead your club!"
          body="Schedule your first meeting and get ready!"
        />
      </Modules>
    </Row>
    <Framed
      imageSrc="/lah_2.jpg"
      imageAlt="Students stacking cups together"
      py={[4, 5]}
      imageStyle={{
        filter: 'brightness(0.75)'
      }}
    >
      <FramedContent maxWidth={36} my={[4, 5]} align="center">
        <Heading.h2 {...styles.headline} mb={2}>
          Hack Clubs are entirely led by students.
        </Heading.h2>
        <Text {...styles.subhline}>
          As a club leader, you’ll find 2-3 (student) co-leads to help run your
          club. You’ll hold meetings together.
        </Text>
      </FramedContent>
      <OthersCard
        maxWidth={28}
        py={3}
        px={[4, 3]}
        align="left"
        boxShadowSize="md"
      >
        <Heading.h3 f={4} color="primary" mt={0} mb={2}>
          Are you a teacher or parent?
        </Heading.h3>
        <Text>
          We hate to say it, but we’re currently only accepting applications
          from students.
        </Text>
        <Text my={1}>
          Teachers and parents can help by recruiting students, sharing Hack
          Club with the local PTA, and expressing interest in Hack Club to
          school administration.
        </Text>
        <Text>
          That said, shoot us an email at{' '}
          <A color="primary" href="mailto:contact@hackclub.com">
            contact@hackclub.com
          </A>{' '}
          and we’d really love to help where we can.
        </Text>
      </OthersCard>
    </Framed>
    <Row my={[3, 4]}>
      <Box color="black">
        <Heading.h2 {...styles.headline} mb={3}>
          HQ provides the resources you’ll need to soar.
        </Heading.h2>
        <Text {...styles.subhline}>
          We know what great programming clubs need to succeed.
        </Text>
      </Box>
      <Modules>
        <Module
          icon="forum"
          heading="Online community"
          body="Join our Slack and meet thousands of other club leaders and members around the world."
        />
        <Module
          icon="chrome_reader_mode"
          heading="Curriculum"
          body="Give your members dozens of free tutorials for making websites, apps, and games."
        />
        <Module
          icon="voice_chat"
          heading="Mentorship"
          body="Talk to our team for guidance and assistance whenever you need help."
        />
        <Module
          icon="description"
          heading="Guidelines"
          body="Learn from hundreds of other clubs—we’ve got information, advice, and experience."
        />
        <Module
          icon="local_activity"
          heading="Local events"
          body="Attend hackathons, workshops, and other events from Hack Clubs near yours."
        />
        <Module
          icon="wallpaper"
          heading="Marketing"
          body="Get stickers, posters, and ideas for spreading the word about your amazing club meetings."
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
