import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'
import {
  BackgroundImage,
  Box,
  Container,
  Flex,
  Heading,
  Link as A,
  Section,
  Image,
  Text,
  Icon,
  Button,
  LargeButton
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Nav from 'components/Nav'
import Framed from 'components/Framed'
import Sheet from 'components/Sheet'
import Footer from 'components/Footer'

const shadows = css`
  h2,
  h3,
  p,
  ${FeatureLink} {
    color: ${({ theme }) => theme.colors.white};
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.75);
  }
`
const PhotoSection = styled(Section)`
  position: relative;
  background: linear-gradient(
      ${props =>
        props.inverted
          ? 'rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)'
          : 'rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.5)'}
    ),
    url(${props => props.src});
  background-position: center;
  background-size: cover;
  ${shadows};
`
PhotoSection.defaultProps = {
  py: 4
}

const featureStyles = css`
  min-height: 24rem;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`
const Features = styled(Container)`
  display: grid;
  grid-gap: ${({ theme }) => theme.space[3]}px;
  > div {
    ${featureStyles};
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    grid-gap: ${({ theme }) => theme.space[4]}px;
    grid-template-columns: repeat(5, 1fr);
    > div {
      &:nth-child(1),
      &:nth-child(5) {
        grid-column: 1 / span 3;
      }
      &:nth-child(2),
      &:nth-child(6) {
        grid-column: 4 / span 2;
      }
      &:nth-child(3) {
        grid-column: 1 / span 2;
      }
      &:nth-child(4) {
        grid-column: 3 / span 3;
      }
    }
  }
`
const MarketingFeature = styled(Sheet)`
  background: ${({ theme }) => theme.colors.indigo[5]};
  background: ${({ theme }) => theme.colors.indigo[5]}f0;
  background: linear-gradient(
    32deg,
    ${({ theme }) => theme.colors.indigo[5]}f0,
    ${({ theme }) => theme.colors.violet[5]}c0
  );
`
const TextFeature = styled(Sheet)`
  > p {
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes[5]}px;
    line-height: 1.25;
  }
`
const PhotoFeature = styled(PhotoSection.withComponent(TextFeature))``
A.link = A.withComponent(Link)
const FeatureLink = styled(A.link).attrs({
  mt: 3,
  f: 3,
  bold: true
})`
  &:after {
    content: ' »';
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

const Module = ({ icon, name, body, ...props }) => (
  <Flex flexDirection="column" {...props}>
    <Icon
      size={64}
      mb={2}
      name={icon}
      color="white"
      style={{ flexShrink: 0 }}
    />
    <div>
      <Heading.h3 mb={1} f={5} children={name} />
      <Text f={4} style={{ lineHeight: '1.375' }} children={body} />
    </div>
  </Flex>
)

const TwoUp = styled(Box)`
  display: grid;
  grid-gap: ${({ theme }) => theme.space[3]}px;
  ${({ theme }) => theme.mediaQueries.sm} {
    grid-gap: ${({ theme }) => theme.space[4]}px;
    grid-template-columns: repeat(2, 1fr);
  }
  > div {
    ${featureStyles};
  }
`
const Steps = styled(Box)`
  display: grid;
  grid-gap: ${({ theme }) => theme.space[3]}px;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-gap: ${({ theme }) => theme.space[4]}px;
    grid-template-columns: repeat(3, 1fr);
  }
  > div {
    ${featureStyles};
  }
`

const TextBox = styled(Box).attrs({ maxWidth: 48 })`
  max-width: ${props => props.maxWidth}rem;
`

const StepOne = styled(Sheet)`
  background: ${({ theme }) => theme.colors.red[6]};
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.orange[5]},
    ${({ theme }) => theme.colors.pink[6]}
  );
`
const StepTwo = styled(Sheet)`
  background: ${({ theme }) => theme.colors.teal[6]};
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.cyan[5]},
    ${({ theme }) => theme.colors.blue[6]}
  );
`
const StepThree = styled(Sheet)`
  background: ${({ theme }) => theme.colors.violet[6]};
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.fuschia[5]},
    ${({ theme }) => theme.colors.indigo[6]}
  );
`
const ApplyButton = styled(LargeButton.withComponent(Link)).attrs({
  scale: true,
  chevronRight: true
})`
  text-transform: uppercase;
  background-image: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.orange[5]},
    ${({ theme }) => theme.colors.red[5]}
  );
`

const ImageSheet = styled(Sheet.withComponent(BackgroundImage))`
  width: 100%;
  height: auto;
`

const styles = {
  ultraline: { f: [6, 7], style: { lineHeight: '1.0625' } },
  headline: { f: [5, 6], style: { lineHeight: '1.125' } },
  miniline: { f: [4, 5], mb: 2, style: { lineHeight: '1.25' } },
  lead: { f: [3, 4], my: 3, regular: true, style: { lineHeight: '1.5' } },
  contentContainer: {
    maxWidth: 64,
    w: 1,
    p: 3,
    color: 'black'
  }
}

const title = 'Start – Hack Club'
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
    <PhotoSection inverted src="/start/header.jpg" style={{ padding: 0 }}>
      <Container maxWidth={36} p={[2, 3]} mt={[5, 6]} mb={[4, 5]}>
        <Heading.h1 {...styles.ultraline} color="white">
          Let’s get started.
        </Heading.h1>
        <Heading.h2 {...styles.lead} color="white" mt={3} mb={4}>
          Whether you’re interested in starting a new chapter or joining Hack
          Club’s network with an existing CS club, we should talk.
        </Heading.h2>
      </Container>
    </PhotoSection>
    <Flex flexDirection="column" bg="snow" py={[4, 5]}>
      <Container {...styles.contentContainer}>
        <TextBox>
          <Heading.h2 {...styles.headline}>
            What do meetings look like?
          </Heading.h2>
          <Text {...styles.lead}>
            Hack Clubs meet weekly, typically for 1.5 hours. Meetings resemble
            mini-hackathons, where members learn to code through building
            projects like{' '}
            <A href="https://sohuang.github.io/" target="_blank">
              websites
            </A>{' '}
            and{' '}
            <A href="https://messy-wool.surge.sh/catch.html" target="_blank">
              games
            </A>
            .
          </Text>
          <Text {...styles.lead}>
            Clubs are led by teams of 2-3 students (sorry, no parents or
            teachers). We ask that at least 1 leader be technically adept enough
            to write and customize{' '}
            <A href="/workshops" target="_blank">
              workshops
            </A>
            .
          </Text>
        </TextBox>
        <TwoUp mt={4}>
          <Sheet>
            <Heading.h3 {...styles.miniline}>
              What happens outside of club meetings?
            </Heading.h3>
            <Text f={3}>
              After Hack Clubs establish a dedicated base of members, they begin
              to attend{' '}
              <A href="https://hackathons.hackclub.com" target="_blank">
                nearby hackathons
              </A>{' '}
              and eventually host their own (sometimes with{' '}
              <A href="/bank" target="_blank">
                Hack Club Bank
              </A>
              ).
            </Text>
          </Sheet>
          <ImageSheet src="/start/meeting_1.jpg" />
          <ImageSheet src="/start/meeting_2.jpg" />
          <Sheet>
            <Heading.h3 {...styles.miniline}>
              Will you provide everything to make my club successful?
            </Heading.h3>
            <Text f={3}>
              No. Every school is different and you’re going to need to heavily
              customize our advice and resources. We try our best, but you know
              your school better than we do.
            </Text>
          </Sheet>
        </TwoUp>
      </Container>
      <Container {...styles.contentContainer} mt={[4, 5]}>
        <TextBox maxWidth={48}>
          <Text f={4} caps bold color="muted">
            Resources
          </Text>
          <Heading.h2 {...styles.headline} mb={3}>
            We’ll provide support to get your club{' '}
            <Text.span color="teal.6">going & growing</Text.span>.
          </Heading.h2>
          <Text {...styles.lead}>
            From working with our 200+ Hack Clubs at high schools around the
            world, we’ve assembled the resources you’ll need for a successful
            club.
          </Text>
        </TextBox>
        <Features mt={4}>
          <PhotoFeature src="/start/community.jpg" justify="flex-start">
            <Module
              icon="forum"
              name="Community"
              body="In our Slack, come chat with hundreds of other club leaders and members around the world."
              color="white"
            />
            <FeatureLink to="/slack_invite" color="white">
              Join our Slack
            </FeatureLink>
          </PhotoFeature>
          <TextFeature>
            <Text>
              Our <Text.span color="primary">curriculum</Text.span> gives your
              members dozens of free tutorials for making websites, apps, &
              games.
            </Text>
            <FeatureLink to="/workshops" color="info">
              Check out workshops
            </FeatureLink>
          </TextFeature>
          <TextFeature>
            <Text>
              <Text.span color="warning">Learn from all our clubs</Text.span>
              —we’ve got information, advice, & experience to share.
            </Text>
          </TextFeature>
          <PhotoFeature src="/hacking.png">
            <Text color="white">
              Talk to our team over a call or on Slack for{' '}
              <Text.span color="success">guidance & assistance</Text.span>{' '}
              whenever you need it.
            </Text>
          </PhotoFeature>
          <PhotoFeature src="/start/events.jpg">
            <Icon name="local_activity" size={64} color="white" mb={2} />
            <Text color="white">
              Attend hackathons, workshops, & other{' '}
              <Text.span color="cyan.5">local events</Text.span> from Hack Clubs
              near yours.
            </Text>
            <FeatureLink to="/hackathons" color="white">
              See upcoming events
            </FeatureLink>
          </PhotoFeature>
          <MarketingFeature>
            <Module
              icon="wallpaper"
              name="Marketing"
              body="Get stickers, posters, & ideas for spreading the word about your incredible club meetings."
              color="white"
            />
          </MarketingFeature>
        </Features>
      </Container>
    </Flex>
    <Flex flexDirection={['column', null, 'row']} justify="center" py={[4, 5]}>
      <Icon name="face" color="pink.5" size={128} m={[null, null, 3]} />
      <Container {...styles.contentContainer} maxWidth={48} align="left" mx={0}>
        <Heading.h2 {...styles.headline}>
          Start a new club, or bring your own. We’re excited to meet you.
        </Heading.h2>
        <Text {...styles.lead} mt={3}>
          When established CS clubs join, they get the full benefits of the
          network. While Hack Club is currently optimized for new chapters,
          we’re increasing the benefits for existing clubs every day by
          launching new projects like{' '}
          <A.link to="/challenge" target="_blank">
            Challenge
          </A.link>
          ,{' '}
          <A href="https://hackathons.hackclub.com" target="_blank">
            Hackathons
          </A>
          , &{' '}
          <A.link to="/bank" target="_blank">
            Bank
          </A.link>
          .
        </Text>
      </Container>
    </Flex>
    <Box bg="snow" py={[4, 5]}>
      <Container {...styles.contentContainer}>
        <TextBox maxWidth={48} mb={4}>
          <Text f={4} caps bold color="muted">
            Application
          </Text>
          <Heading.h2 {...styles.headline} mb={3}>
            Apply today to{' '}
            <Text.span color="primary">start your club</Text.span> at your high
            school this fall.
          </Heading.h2>
          <Text {...styles.lead}>
            You’ll be joining hundreds of applicants to our program.
          </Text>
        </TextBox>
        <Steps>
          <StepOne>
            <Module
              icon="assignment"
              name="1. Application"
              body="Submit your info to get the ball rolling, totally free."
              color="white"
            />
          </StepOne>
          <StepTwo>
            <Module
              icon="ring_volume"
              name="2. Training call"
              body="We’ll chat and begin a plan for your club and marketing."
              color="white"
            />
          </StepTwo>
          <StepThree>
            <Module
              icon="event_available"
              name="3. First meeting"
              body="Schedule your first meeting and get ready to lead!"
              color="white"
            />
          </StepThree>
        </Steps>
      </Container>
    </Box>
    <Box p={[3, 4, 5]}>
      <PhotoFeature
        py={[4, 5, 6]}
        src="/lah_1.jpg"
        aria-label="Students at a coding event"
        style={{ maxWidth: '100%', minHeight: '32rem' }}
        align={['left', 'center']}
        color="white"
        mb={0}
      >
        <Heading.h2 {...styles.ultraline}>Begin your application.</Heading.h2>
        <Box
          f={[3, 4, 5]}
          my={3}
          style={{ fontWeight: 'normal', lineHeight: '1.75' }}
        >
          Build the class you wish you had.
          <br />
          Bring the movement to your school.
        </Box>
        <ApplyButton to="/apply" children="Apply to Hack Club" mt={4} />
      </PhotoFeature>
    </Box>
    <Footer />
  </Fragment>
)
