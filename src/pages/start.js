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
  Text,
  LargeButton,
  Icon,
  theme
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Nav from 'components/Nav'
import Sheet from 'components/Sheet'
import { Headline, Featline } from 'components/Content'
import Footer from 'components/Footer'

const shadows = css`
  h2,
  h3,
  p,
  ${FeatureLink} {
    color: ${theme.colors.white};
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
  ${props => props.fixed && { backgroundAttachment: 'fixed' }};
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
  grid-gap: ${theme.space[3]}px;
  > div {
    ${featureStyles};
  }
  ${Icon} {
    margin-left: -${theme.space[2]}px;
  }
  ${theme.mediaQueries.sm} {
    grid-gap: ${theme.space[4]}px;
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
  background: ${theme.colors.indigo[5]};
  background: ${theme.colors.indigo[5]}f0;
  background: linear-gradient(
    32deg,
    ${theme.colors.indigo[5]}f0,
    ${theme.colors.violet[5]}c0
  );
`
const TextFeature = styled(Sheet)`
  > p {
    font-weight: bold;
    font-size: ${theme.fontSizes[5]}px;
    line-height: 1.25;
  }
`
const PhotoFeature = styled(PhotoSection.withComponent(TextFeature))`
  > p {
    color: ${theme.colors.white};
  }
`

A.link = A.withComponent(Link)
const FeatureLink = styled(A.link).attrs({
  mt: [3, 4],
  fontSize: 3,
  underline: true,
  chevronRight: true
})`
  display: block;
`

const Module = ({ icon, name, body, ...props }) => (
  <Flex flexDirection="column" {...props}>
    <Icon
      size={64}
      mb={2}
      glyph={icon}
      color="white"
      style={{ flexShrink: 0 }}
    />
    <Box>
      <Heading.h3 mb={1} fontSize={5} children={name} />
      <Text fontSize={4} style={{ lineHeight: '1.375' }} children={body} />
    </Box>
  </Flex>
)

const TwoUp = styled(Box)`
  display: grid;
  grid-gap: ${theme.space[3]}px;
  ${theme.mediaQueries.sm} {
    grid-gap: ${theme.space[4]}px;
    grid-template-columns: repeat(2, 1fr);
  }
  > div {
    ${featureStyles};
  }
`

const Steps = styled(Box)`
  display: grid;
  grid-gap: ${theme.space[3]}px;
  ${theme.mediaQueries.md} {
    grid-gap: ${theme.space[4]}px;
    grid-template-columns: repeat(3, 1fr);
  }
  > div {
    ${featureStyles};
  }
`
const HourFeatures = styled(Steps)`
  > div {
    min-height: 32rem;
    justify-content: flex-start;
  }
`

const TextBox = styled(Box).attrs({ maxWidth: 48 })`
  max-width: ${props => props.maxWidth}rem;
`

const StepOne = styled(Sheet)`
  background: ${theme.colors.red[6]};
  background: linear-gradient(
    to bottom,
    ${theme.colors.orange[5]},
    ${theme.colors.pink[6]}
  );
`
const StepTwo = styled(Sheet)`
  background: ${theme.colors.teal[6]};
  background: linear-gradient(
    to bottom,
    ${theme.colors.cyan[5]},
    ${theme.colors.blue[6]}
  );
`
const StepThree = styled(Sheet)`
  background: ${theme.colors.violet[6]};
  background: linear-gradient(
    to bottom,
    ${theme.colors.fuschia[5]},
    ${theme.colors.indigo[6]}
  );
`
const ApplyButton = styled(LargeButton.withComponent(Link)).attrs({
  scale: true,
  chevronRight: true
})`
  text-transform: uppercase;
  background-image: linear-gradient(
    to bottom,
    ${theme.colors.orange[5]},
    ${theme.colors.red[5]}
  );
`

const ImageSheet = styled(Sheet.withComponent(BackgroundImage))`
  width: 100%;
  height: auto;
`

const styles = {
  ultraline: { fontSize: [6, 7], style: { lineHeight: '1' } },
  headline: { fontSize: [5, 6], style: { lineHeight: '1.125' } },
  miniline: { fontSize: [4, 5], mb: 2, style: { lineHeight: '1.25' } },
  lead: { fontSize: [3, 4], my: 3, regular: true, style: { lineHeight: '1.5' } },
  contentContainer: {
    maxWidth: 72,
    width: 1,
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
      <Container
        maxWidth={56}
        px={[2, 3]}
        py={[4, 5, 6]}
        mt={[5, 6]}
        mb={[4, 5]}
        color="white"
      >
        <Heading.h1 {...styles.ultraline} fontSize={[6, 7, 8]}>
          You’re about to start an incredible coding club.
        </Heading.h1>
        <Heading.h2
          fontSize={[3, 4]}
          mt={3}
          mx="auto"
          style={{ fontWeight: 'normal', maxWidth: '48rem' }}
        >
          Whether you’re interested in starting a new chapter or joining Hack
          Club’s network with an existing CS club, we should talk.
        </Heading.h2>
      </Container>
    </PhotoSection>
    <Box bg="white" py={[4, 5]}>
      <Container {...styles.contentContainer}>
        <Text fontSize={4} caps bold color="muted">
          Imagine
        </Text>
        <Headline my={3}>
          Here’s <Text.span color="accent">an hour</Text.span> of a club
          meeting.
        </Headline>
        <TextBox mb={4}>
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
        </TextBox>
        <HourFeatures>
          <PhotoFeature src="/start/group.jpg" inverted>
            <Text>
              A group of students come together to start coding. Many are
              beginners.
            </Text>
          </PhotoFeature>
          <PhotoFeature src="/start/coding_2.jpg" inverted>
            <Text>
              Members work on self-directed coding projects, learning by making.
            </Text>
          </PhotoFeature>
          <PhotoFeature src="/start/demo.jpg" inverted>
            <Text>
              At the end, everyone demos their projects for the group.
            </Text>
          </PhotoFeature>
        </HourFeatures>
      </Container>
    </Box>
    <Flex flexDirection="column" bg="snow" py={[4, 5]}>
      <Container {...styles.contentContainer}>
        <TextBox maxWidth={48}>
          <Text fontSize={4} caps bold color="muted">
            Resources
          </Text>
          <Headline my={3}>
            We’ll provide support to get your club{' '}
            <Text.span color="teal.6">going & growing</Text.span>.
          </Headline>
          <Text {...styles.lead}>
            From working with our 200+ Hack Clubs at high schools around the
            world, we’ve assembled the resources you’ll need for a successful
            club.
          </Text>
        </TextBox>
        <Features mt={4}>
          <PhotoFeature src="/start/community.jpg" justify="flex-start">
            <Module
              icon="member-add"
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
            <Icon glyph="idea" size={64} color="warning" mb={2} />
            <Text>
              <Text.span color="warning">Learn from all our clubs</Text.span>
              —we’ve got information, advice, & experience to share.
            </Text>
          </TextFeature>
          <PhotoFeature src="/start/call.jpg">
            <Text color="white">
              Talk to our team over a call or on Slack for{' '}
              <Text.span color="success">guidance & assistance</Text.span>{' '}
              whenever you need it.
            </Text>
          </PhotoFeature>
          <PhotoFeature src="/start/events.jpg">
            <Text>
              Attend hackathons, workshops, & other{' '}
              <Text.span color="cyan.5">local events</Text.span> from Hack Clubs
              near yours.
            </Text>
            <FeatureLink to="/hackathons" color="white">
              See what’s happening nearby
            </FeatureLink>
          </PhotoFeature>
          <MarketingFeature>
            <Module
              icon="photo"
              name="Marketing"
              body="Get stickers, posters, & ideas for spreading the word about your incredible club meetings."
              color="white"
            />
          </MarketingFeature>
        </Features>
      </Container>
    </Flex>
    <Container {...styles.contentContainer} maxWidth={64}>
      <Flex
        flexDirection={['column', null, 'row']}
        justify="center"
        py={[4, 5, 6]}
      >
        <Icon glyph="welcome" color="pink.5" size={96} m={[null, null, 3]} />
        <Box align="left">
          <Headline>
            Start a new club, or bring your own. We’re excited to meet you.
          </Headline>
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
        </Box>
      </Flex>
    </Container>
    <Flex flexDirection="column" bg="snow" py={[4, 5]}>
      <Container {...styles.contentContainer}>
        <TextBox>
          <Text fontSize={4} caps bold color="muted">
            About
          </Text>
          <Headline my={3}>Teach coding, bring together a community.</Headline>
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
            <Featline>What happens outside of club meetings?</Featline>
            <Text fontSize={3}>
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
            <Featline>
              Will you provide everything to make my club a success?
            </Featline>
            <Text fontSize={3}>
              No. Every school is different and you’re going to need to heavily
              customize our advice and resources. We try our best, but you know
              your school better than we do.
            </Text>
          </Sheet>
        </TwoUp>
      </Container>
    </Flex>
    <Box py={[4, 5]}>
      <Container {...styles.contentContainer}>
        <TextBox maxWidth={48} mb={4}>
          <Text fontSize={4} caps bold color="muted">
            Application
          </Text>
          <Headline my={3}>
            Apply today to{' '}
            <Text.span color="primary">start your club</Text.span> at your high
            school.
          </Headline>
          <Text {...styles.lead}>
            You’ll be joining hundreds of other applicants to our program from
            around the world. Your application is all online and totally free.
          </Text>
        </TextBox>
        <Steps>
          <StepOne>
            <Module
              icon="edit"
              name="1. Application"
              body="Submit your info to get the ball rolling, right here."
              color="white"
            />
          </StepOne>
          <StepTwo>
            <Module
              icon="emoji"
              name="2. Training call"
              body="We’ll chat and begin a plan for your club and marketing."
              color="white"
            />
          </StepTwo>
          <StepThree>
            <Module
              icon="checkmark"
              name="3. First meeting"
              body="Schedule your first meeting and get ready to lead!"
              color="white"
            />
          </StepThree>
        </Steps>
      </Container>
    </Box>
    <Flex justify="center" color="muted" mt={-3}>
      <Icon glyph="down-caret" size={64} />
    </Flex>
    <Box p={[3, 4, 5]}>
      <PhotoFeature
        py={[4, 5, 6]}
        fixed
        src="/start/action.jpg"
        aria-label="Students at a coding event"
        style={{ maxWidth: '100%', minHeight: '32rem' }}
        align={['left', 'center']}
        color="white"
        mb={0}
      >
        <Headline>Begin your application.</Headline>
        <Box
          fontSize={[3, 4, 5]}
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
