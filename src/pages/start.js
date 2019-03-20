import React from 'react'
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
import { Link } from 'gatsby'
import Layout from 'components/Layout'
import Nav from 'components/Nav'
import Sheet from 'components/Sheet'
import { Headline, Highlight, Lead } from 'components/Content'
import Footer from 'components/Footer'
import { stats } from 'data.json'

A.link = A.withComponent(Link)
const FeatureLink = styled(A.link).attrs({
  mt: 3,
  fontSize: 3,
  hoverline: true,
  chevronRight: true
})`
  display: block;
`

const Stats = styled(Flex.withComponent('ul')).attrs({
  align: 'center',
  justify: 'center',
  wrap: true
})`
  line-height: 1;
  list-style: none;
  padding: 0;
`
Stats.Stat = styled(Text.withComponent('li')).attrs({
  fontSize: [2, 3],
  color: 'smoke',
  pl: 0
})`
  + li:before {
    content: '\00b7';
    position: relative;
    top: ${theme.space[1]}px;
    margin: 0 ${theme.space[1]}px;
    font-size: ${theme.fontSizes[4]}px;
  }
`

const shadows = css`
  h1,
  h2,
  h3,
  p,
  li,
  ${FeatureLink} {
    color: ${theme.colors.white};
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.75);
  }
`

const photoSection = css`
  border-radius: ${theme.radii[2]};
  background-size: cover;
  @media (hover: hover) {
    background-attachment: fixed;
  }
`
const PhotoHeader = styled(Section).attrs({ px: 0 })`
  background-color: ${theme.colors.primary};
  background: linear-gradient(
      ${props =>
        props.inverted
          ? 'rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)'
          : 'rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.5)'}
    ),
    url(${props => props.src});
  background-position: center;
  ${photoSection};
  ${shadows};
`
const MapBox = styled(PhotoHeader).attrs({ px: 0 })`
  background-color: ${theme.colors.dark};
  background-image: url('/map.svg');
  background-repeat: no-repeat;
  background-position: center top;
  ${photoSection};
`

const featureStyles = css`
  min-height: 24rem;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  p:first-child,
  h3 {
    line-height: 1.125;
  }
`
const TextFeature = styled(Sheet)`
  > p {
    font-weight: bold;
    font-size: ${theme.fontSizes[5]}px;
    line-height: 1.125;
  }
`
const PhotoFeature = styled(TextFeature).attrs({
  color: 'white'
})`
  position: relative;
  ${props =>
    props.inverted
      ? css`
          justify-content: flex-end !important;
          background: linear-gradient(
              transparent,
              rgba(0, 0, 0, 0.25) 50%,
              rgba(0, 0, 0, 0.5) 100%
            ),
            url(${props.src});
        `
      : css`
          background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0) 50%),
            url(${props.src});
        `};
  background-position: center;
  background-size: cover;
  ${shadows};
`
const BankFeature = styled(Sheet)`
  background-color: ${theme.colors.primary};
  background: ${theme.gradient('red.5', 'red.7')};
`
const MarketingFeature = styled(Sheet)`
  background-color: ${theme.colors.indigo[5]};
  background: ${theme.gradient('indigo.4', 'indigo.6')};
  position: relative;
  overflow: visible;
  ${Icon} {
    margin-left: -${theme.space[1]}px;
  }
  &:before,
  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    background-size: 100%;
    background-repeat: no-repeat;
  }
  &:before {
    top: -1rem;
    right: 8rem;
    transform: rotate(12deg);
    background-image: url(${require('../../static/stickers/enjoy.svg')});
    width: 12rem;
    height: 8rem;
  }
  &:after {
    top: -1rem;
    right: 0;
    transform: rotate(-12deg);
    background-image: url(${require('../../static/stickers/mac.svg')});
    width: 6rem;
    height: 8rem;
  }
`

const Module = ({ icon, name, body, color = 'white', ...props }) => (
  <Flex flexDirection="column" color={color} {...props}>
    {icon && (
      <Icon
        size={64}
        mb={2}
        glyph={icon}
        color={props.iconColor || color}
        style={{ flexShrink: 0 }}
      />
    )}
    <Box>
      <Heading.h3 mb={1} fontSize={5} children={name} />
      <Text fontSize={4} style={{ lineHeight: '1.375' }} children={body} />
    </Box>
  </Flex>
)

const Cols = styled(Box)`
  display: grid;
  grid-gap: ${theme.space[3]}px;
  ${theme.mediaQueries.sm} {
    grid-gap: ${theme.space[4]}px;
    grid-template-columns: ${props => props.cols};
  }
  > div,
  > section > div {
    ${featureStyles};
  }
`
Cols.defaultProps = {
  cols: '1fr 1fr',
  my: [3, 4]
}

const Steps = styled(Box).attrs({ color: 'white' })`
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
  section div {
    min-height: 32rem;
    justify-content: flex-start;
  }
  div + p {
    margin-bottom: ${theme.space[4]}px;
  }
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

const SectionEyebrow = styled(Text).attrs({
  fontSize: [4, 5],
  bold: true,
  color: 'muted'
})``
const SectionHeadline = styled(Headline).attrs({
  fontSize: [7, 8],
  mt: 1,
  mb: 4
})`
  line-height: 1;
`
const SectionLead = styled(Lead).attrs({
  fontSize: [3, 4],
  maxWidth: 48,
  mx: 0,
  pb: 3,
  mb: [4, 5]
})``

const like = {
  underline: true,
  target: '_blank'
}
A.link = A.withComponent(Link)
const Like = props => <A {...like} {...props} />
const LikeLink = props => <A.link {...like} {...props} />

const Photo = styled(BackgroundImage.withComponent(Sheet)).attrs({
  role: 'img',
  scale: true
})``

const styles = {
  ultraline: { fontSize: [6, 7, 8], style: { lineHeight: '1' } },
  headline: { fontSize: [5, 6], style: { lineHeight: '1.125' } },
  miniline: { fontSize: [4, 5], mb: 2, style: { lineHeight: '1.25' } },
  lead: {
    fontSize: [3, 4],
    my: 3,
    regular: true,
    style: { lineHeight: '1.5' }
  },
  contentContainer: {
    maxWidth: 72,
    width: 1,
    p: 3,
    color: 'black'
  }
}

const title = 'Start a Club – Hack Club'
const description =
  'Learn how to start a coding club at your high school through Hack Club. Get programming club ideas, curriculum, activities, and more.'

export default () => (
  <Layout>
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
    <Nav color="slate" fixed />
    <Box mt={[44, 55]} p={3} bg="snow">
      <PhotoHeader
        py={[3, 6, 7, 8]}
        src={require('../../static/photos/hackpenn_full.jpg')}
        aria-label="Students at a coding event"
        align={['left', 'center']}
        color="white"
      >
        <Container width={1} maxWidth={72} px={3} mt={[5, 6]} mb={[4, 5]}>
          <Heading.h1 {...styles.ultraline}>
            We’re high schoolers leading the best coding clubs in the world.
          </Heading.h1>
          <SectionLead fontSize={[3, 4]} mt={3} mb={3} mx="auto">
            Hack Club is a global network of programming clubs where members
            learn to code through tinkering and building projects.
          </SectionLead>
          <Stats>
            <Stats.Stat>{stats.school_count}&nbsp;schools</Stats.Stat>
            <Stats.Stat>{stats.state_count}&nbsp;states</Stats.Stat>
            <Stats.Stat>{stats.country_count}&nbsp;countries</Stats.Stat>
          </Stats>
        </Container>
      </PhotoHeader>
      <Flex justify="center" color="muted" mt={3}>
        <Icon glyph="down-caret" size={64} />
      </Flex>
    </Box>
    <Box bg="white" py={[4, 5, 6]}>
      <Container {...styles.contentContainer}>
        <SectionEyebrow>Clubs in action</SectionEyebrow>
        <SectionHeadline>Build superpowers at your club.</SectionHeadline>
        <SectionLead>
          Hack Clubs{' '}
          <Highlight>
            meet weekly at their high schools, typically for 1.5 hours
          </Highlight>{' '}
          after school. There are no teachers or lectures—members work at their
          own pace making websites, apps, & games, and presenting them to the
          group. As a club leader, you act as a{' '}
          <Like href="https://en.wikipedia.org/wiki/Constructionism_(learning_theory)">
            facilitator
          </Like>
          , mentoring members and building a supportive community.
        </SectionLead>
        <HourFeatures>
          <section>
            <PhotoFeature src="/start/group.jpg">
              <Text>
                A group of students gather to start coding. Many are beginners.
              </Text>
            </PhotoFeature>
            <Text color="black" fontSize={3}>
              <strong>Everyone starts hacking.</strong> At the first few
              meetings, members follow{' '}
              <LikeLink to="/workshops/">our tutorials</LikeLink> as a runway
              before taking off with their own projects.
            </Text>
          </section>
          <section>
            <PhotoFeature src="/start/coding_2.jpg">
              <Text>
                Members work on self-directed coding projects, learning by
                making.
              </Text>
            </PhotoFeature>
            <Text color="black" fontSize={3}>
              <strong>Members leave every meeting with a project</strong>
              —including their first day. Check out{' '}
              <Like href="https://messy-wool.surge.sh/catch.html">
                a first website
              </Like>
              {' & '}
              <Like href="https://messy-wool.surge.sh/catch.html">
                game
              </Like>{' '}
              built at Hack Clubs.
            </Text>
          </section>
          <section>
            <PhotoFeature src="/photos/hhv_demo_edit.jpg">
              <Text>
                At the end, everyone demos their projects for the club.
              </Text>
            </PhotoFeature>
            <Text color="black" fontSize={3}>
              <strong>Demos bring the club together.</strong> Presentations
              highlight new work and momentum. As a leader, you’re{' '}
              <Highlight>cultivating a community</Highlight> of makers.
            </Text>
          </section>
        </HourFeatures>
        <Cols cols="1fr 3fr" mx={-3} mt={[4, 5, 6]}>
          <Headline px={3}>Go beyond club&nbsp;meetings.</Headline>
          <SectionLead pl={[3, 0]} pr={3} mb={0}>
            Hack Clubs attend and run hackathons like{' '}
            <Like href="https://windyhacks.com">
              Windy&nbsp;City&nbsp;Hacks
            </Like>{' '}
            &{' '}
            <Like href="http://outlooknewspapers.com/hackademia-aims-for-young-tech-devotees/">
              Hackademia
            </Like>
            , run summer programs like{' '}
            <Like href="http://thecspn.com/?p=43434">Hack Camp</Like>, and
            compete in events like the{' '}
            <Like href="http://www.congressionalappchallenge.us">
              Congressional App Challenge
            </Like>
            . The&nbsp;hack’s the limit.
          </SectionLead>
        </Cols>
      </Container>
    </Box>
    <Flex flexDirection="column" bg="snow" py={[4, 5, 6]}>
      <Container {...styles.contentContainer}>
        <SectionEyebrow>Resources from HQ</SectionEyebrow>
        <SectionHeadline>
          We’ll provide support to get your&nbsp;club{' '}
          <Text.span color="teal.6">going & growing</Text.span>.
        </SectionHeadline>
        <SectionLead>
          From working with our {stats.school_count} clubs at high schools
          around the world, we’ve assembled the resources you’ll need for a
          successful club. Get&nbsp;training, marketing materials (stickers!),
          curriculum, a&nbsp;community of fellow leaders, a network of events,
          and more.
        </SectionLead>
        <Cols cols="2fr 3fr">
          <MarketingFeature>
            {/* TODO: change icon to "sticker" after next @hackclub/icons release */}
            <Module
              icon="challenge"
              name="Stickers!"
              body="We’ll ship your club a box of our famous stickers for successful marketing from day one."
              color="white"
            />
            {/* <FeatureLink to="/stickers" color="white">
              Get a sample pack
            </FeatureLink> */}
          </MarketingFeature>
          <PhotoFeature src="/start/call.jpg" inverted>
            <Text color="white">
              Talk to our team over a call or on Slack for{' '}
              <Text.span color="success">guidance & assistance</Text.span>{' '}
              whenever you need it.
            </Text>
          </PhotoFeature>
        </Cols>
        <Cols cols="3fr 2fr">
          <PhotoFeature src="/start/community.jpg" inverted>
            <Module
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
              Our <Text.span color="info">curriculum</Text.span> gives your
              members dozens of free tutorials for making websites, games, and
              beyond.
            </Text>
            <FeatureLink to="/workshops" color="info">
              Check out workshops
            </FeatureLink>
          </TextFeature>
        </Cols>
        <Cols>
          <PhotoFeature src="/photos/hackpenn_meme.jpg" inverted>
            <Text>
              Attend hackathons, workshops, & other{' '}
              <Text.span color="cyan.5">local events</Text.span> from
              Hack&nbsp;Clubs near yours.
            </Text>
            <FeatureLink to="/hackathons" color="white">
              See nearby events
            </FeatureLink>
          </PhotoFeature>
          <BankFeature>
            <Module
              icon="bank-circle"
              name="Finances: fully accounted for."
              body="Store money in a non-profit bank account, get debit cards, & collect donations online."
              color="white"
            />
            <FeatureLink to="/bank" color="white">
              Learn more
            </FeatureLink>
          </BankFeature>
        </Cols>
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
            When established programming clubs join, they get the full benefits
            of the network. While Hack Club is currently optimized for new
            chapters, we’re increasing the benefits for existing clubs every day
            by launching new projects like{' '}
            <A.link to="/challenge/" target="_blank">
              Challenge
            </A.link>
            ,{' '}
            <A href="https://hackathons.hackclub.com/" target="_blank">
              Hackathons
            </A>
            , &{' '}
            <A.link to="/bank/" target="_blank">
              Bank
            </A.link>
            .
          </Text>
        </Box>
      </Flex>
    </Container>
    <Box bg="snow" pt={[4, 5, 6]} pb={3}>
      <Container {...styles.contentContainer}>
        <SectionEyebrow>Application</SectionEyebrow>
        <SectionHeadline>
          Apply today to{' '}
          <Text.span color="primary">
            start your high&nbsp;school’s club
          </Text.span>
          .
        </SectionHeadline>
        <SectionLead>
          It’s all-online, free, & takes about an hour. We’ll help you from
          there!
        </SectionLead>
        <Steps>
          <StepOne>
            <Module
              icon="send"
              name="1. Application"
              body="Start by telling us about your ideas for the club."
            />
          </StepOne>
          <StepTwo>
            <Module
              icon="emoji"
              name="2. Training call"
              body="We’ll chat and begin a plan for your club & marketing."
            />
          </StepTwo>
          <StepThree>
            <Module
              icon="event-code"
              name="3. First meeting"
              body="Schedule your club’s first meeting & get going!"
            />
          </StepThree>
        </Steps>
      </Container>
      <Flex justify="center" color="muted">
        <Icon glyph="down-caret" size={64} />
      </Flex>
    </Box>
    <Box p={[3, 4, 5]}>
      <MapBox
        py={[3, 5, 6]}
        bg="darker"
        src="/map.svg"
        aria-label="Students at a coding event"
        align={['left', 'center']}
        color="white"
      >
        <Container width={1} maxWidth={72} px={3} mt={[5, 6]} mb={[4, 5]}>
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
        </Container>
      </MapBox>
    </Box>
    <Footer />
  </Layout>
)
