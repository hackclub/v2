import React from 'react'
import styled, { css } from 'styled-components'
import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  LargeButton,
  OutlineButton,
  Link as A,
  Section,
  Text,
  Sheet,
  theme
} from '@hackclub/design-system'
import getSeason from '@hackclub/season'
import Link from 'components/Link'
import Layout from 'components/Layout'
import Nav from 'components/Nav'
import AnnouncementBanner from 'components/AnnouncementBanner'
import Photo from 'components/Photo'
import { Headline, Highlight, Lead } from 'components/Content'
import Footer from 'components/Footer'
import { stats } from 'data.json'

const FeatureLink = styled(A).attrs({
  mt: 3,
  fontSize: 3,
  hoverline: true,
  chevronRight: true
})`
  display: block;
`
FeatureLink.link = FeatureLink.withComponent(Link)

const CTA = styled(LargeButton.withComponent(Link)).attrs({
  chevronRight: true,
  bg: ['warning', 'primary'],
  fontSize: [2, 3],
  m: [1, 2],
  scale: true
})`
  background-image: ${props => theme.gradient(props.bg[0], props.bg[1])};
  text-transform: uppercase;
`
const SecondaryCTA = styled(OutlineButton.withComponent(Link)).attrs({
  chevronRight: true,
  bg: 'white',
  color: 'black',
  fontSize: 2,
  m: [1, 2],
  scale: true
})`
  background-color: rgba(0, 0, 0, 0.325);
  text-transform: uppercase;
`

const shadows = css`
  h1,
  h2,
  h3,
  p,
  li,
  ${FeatureLink} {
    color: ${theme.colors.white};
    text-shadow: 0 1px 4px rgba(0, 0, 0, 1);
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
  background-image: linear-gradient(
      ${props =>
        props.inverted
          ? 'rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)'
          : 'rgba(0, 0, 0, 0.325), rgba(0, 0, 0, 0.5)'}
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
  background-position: 20% top;
  ${photoSection};
  ${theme.mediaQueries.md} {
    background-position: center 20%;
  }
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
    line-height: 1.25;
  }
`
const TextFeature = styled(Sheet)`
  > p {
    font-weight: bold;
    font-size: ${theme.fontSizes[5]}px;
    line-height: 1.25;
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
          background-image: linear-gradient(
              transparent,
              rgba(0, 0, 0, 0.25) 50%,
              rgba(0, 0, 0, 0.5) 100%
            ),
            url(${props.src});
        `
      : css`
          background-image: linear-gradient(
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0) 50%
            ),
            url(${props.src});
        `};
  background-position: center;
  background-size: cover;
  ${shadows};
  + ${Text} {
    color: ${theme.colors.black};
    font-size: ${theme.fontSizes[3]}px;
    margin-top: ${theme.space[3]}px;
  }
`
const BankFeature = styled(Sheet)`
  background-color: ${theme.colors.primary};
  background-image: ${theme.gradient('red.5', 'red.7')};
`
const GrantFeature = styled(Sheet)`
  position: relative;
  overflow: visible;
  background-image: url(${require('../../static/github/swoosh.svg')});
  background-position: bottom right;
  background-size: 22em;
  background-repeat: no-repeat;
  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    background-size: 100%;
    background-repeat: no-repeat;
    bottom: -2rem;
    right: -2rem;
    transform: rotate(24deg);
    background-image: url(${require('../../static/github/jetpacktocat.png')});
    width: 12rem;
    height: 12rem;
  }
  > p {
    font-weight: bold;
    font-size: ${theme.fontSizes[5]}px;
    line-height: 1.25;
  }
`
const PackFeature = styled(Sheet)`
  background-color: ${theme.colors.blue[4]};
  background-image: ${theme.gradient('indigo.3', 'fuschia.6')};
  position: relative;
  overflow: visible;
  &:after {
    content: '';
    z-index: 2;
    display: inline-block;
    position: absolute;
    background-size: 100%;
    background-repeat: no-repeat;
    bottom: -4rem;
    left: 0rem;
    background-image: url(${require('../../static/github/backpack.png')});
    width: 8rem;
    height: 12rem;
  }
`
const MarketingFeature = styled(Sheet)`
  background-color: ${theme.colors.indigo[5]};
  background-image: ${theme.gradient('indigo.4', 'indigo.6')};
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
  section div {
    min-height: 32rem;
    justify-content: flex-start;
  }
  div + p {
    margin-bottom: ${theme.space[4]}px;
  }
`

const ApplyButton = styled(LargeButton).attrs({
  scale: true,
  chevronRight: true
})`
  text-transform: uppercase;
  background-image: ${theme.gradient('warning', 'primary')};
`
const StepOne = styled(Sheet)`
  background-color: ${theme.colors.red[6]};
  background-image: linear-gradient(
    to bottom,
    ${theme.colors.orange[5]},
    ${theme.colors.pink[6]}
  );
`
const StepTwo = styled(Sheet)`
  background-color: ${theme.colors.violet[6]};
  background-image: linear-gradient(
    to bottom,
    ${theme.colors.fuschia[5]},
    ${theme.colors.indigo[6]}
  );
`
const StepThree = styled(Sheet)`
  background-color: ${theme.colors.teal[6]};
  background-image: linear-gradient(
    to bottom,
    ${theme.colors.cyan[5]},
    ${theme.colors.blue[6]}
  );
`

const SectionEyebrow = styled(Text).attrs({
  fontSize: [4, 5],
  bold: true,
  color: 'muted'
})``
const SectionHeadline = styled(Headline).attrs({
  fontSize: [6, 7, 8],
  mt: 2,
  mb: 3
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

const like = { underline: true, target: '_blank' }
A.link = A.withComponent(Link)
const Like = props => <A {...like} {...props} />

const contentContainer = {
  maxWidth: 72,
  width: 1,
  p: 3,
  color: 'black'
}

const title = 'Hack Club'
const desc =
  'Learn how to start a coding club at your high school through Hack Club. Get programming club ideas, curriculum, activities, and more.'

const OnlyDesktop = styled.span`
  display: none;
  ${theme.mediaQueries.md} {
    display: initial;
  }
`

export default () => (
  <iframe src="https://best-veiled-need.glitch.me/" width="100vw" style={{
position:'fixed', top:0, left:0, bottom:0, right:0, width:'100%', height: '100%', border:'none', margin:0, padding:0, overflow:'hidden'
  }}></iframe>
)

const old =  () => (
  <Layout title={title} desc={desc} path="/">
    <Nav color="slate" fixed />
    <Box mt={[44, 55]} p={3} bg="snow">
      <PhotoHeader
        style={{ paddingTop: 48 }}
        py={[3, 5, 6]}
        src={require('../../static/photos/hackpenn_full.jpg')}
        aria-label="Students at a coding event"
        align={['left', 'center']}
        color="white"
      >
        <Container px={3}>
          <AnnouncementBanner href="/covid19/">
            🦠 We’ve released our guidelines for organizers in response to
            COVID-19 →
          </AnnouncementBanner>
        </Container>
        <Container width={1} maxWidth={72} px={3} my={[3, 4]}>
          <Headline maxWidth={48} mx="auto" fontSize={[6, 7, 8]} mb={2}>
            We’re high schoolers leading the best coding clubs
            in&nbsp;the&nbsp;world.
          </Headline>
          <SectionLead fontSize={[3, 4]} mx="auto" mb={0}>
            Hack&nbsp;Club is a global network of programming clubs where
            members learn to code through tinkering and building&nbsp;projects.{' '}
            <OnlyDesktop>
              <br />
            </OnlyDesktop>
            <strong>
              During COVID-19, join the community on Slack to participate.
            </strong>{' '}
            We’re also still accepting club applications on a rolling basis.
          </SectionLead>
          <SecondaryCTA to="https://apply.hackclub.com">Apply now</SecondaryCTA>
          <CTA to="https://hackclub.com/community">Join our Slack</CTA>
        </Container>
      </PhotoHeader>
    </Box>
    <Box bg="white" py={[5, 6]}>
      <Container color="black" px={3}>
        <SectionEyebrow>Clubs in action</SectionEyebrow>
        <SectionHeadline>Build superpowers at your club.</SectionHeadline>
        <SectionLead>
          Hack&nbsp;Clubs{' '}
          <Highlight>
            meet weekly at their high schools, typically for 1.5hrs
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
            <Text>
              <strong>Everyone starts hacking.</strong> At the first few
              meetings, members follow{' '}
              <Like href="/workshops/">our tutorials</Like> as a runway before
              taking off with their own projects.
            </Text>
          </section>
          <section>
            <PhotoFeature src="/start/coding_2.jpg">
              <Text>
                Members work on self-directed coding projects, learning by
                making.
              </Text>
            </PhotoFeature>
            <Text>
              <strong>Members leave every meeting with a project</strong>
              —including their first day. Check out{' '}
              <Like href="https://sohuang.github.io">a first website</Like>
              {' & '}
              <Like href="https://messy-wool.surge.sh/catch.html">
                game
              </Like>{' '}
              built at Hack&nbsp;Clubs.
            </Text>
          </section>
          <section>
            <PhotoFeature src="/photos/hhv_demo_edit.jpg">
              <Text>
                At the end, everyone demos their projects for the club.
              </Text>
            </PhotoFeature>
            <Text>
              <strong>Demos bring the club together.</strong> As the leader,
              you’re cultivating a community of makers. Demos highlight new work
              & momentum.
            </Text>
          </section>
        </HourFeatures>
        <Cols cols="1fr 2fr" mx={-3} mt={[4, 5, 6]}>
          <Headline px={3}>Go beyond club meetings.</Headline>
          <SectionLead pl={[3, 0]} pr={3} mb={0}>
            Hack Clubs attend and run hackathons like{' '}
            <Like href="https://windyhacks.com">
              Windy&nbsp;City&nbsp;Hacks
            </Like>{' '}
            &{' '}
            <Like href="https://www.sfchronicle.com/bayarea/article/Hack-the-Fog-makes-history-as-San-12729895.php">
              Hack the Fog
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
    <Flex flexDirection="column" bg="snow" py={[5, 6]}>
      <Container {...contentContainer}>
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
            <Module
              icon="sticker"
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
        <Cols>
          <GrantFeature>
            <Text>
              Up to <Text.span color="info">$150&nbsp;in&nbsp;grants</Text.span>{' '}
              for clubs and{' '}
              <Text.span color="info">$500&nbsp;in&nbsp;sponsorships</Text.span>{' '}
              for events.
            </Text>
            <FeatureLink
              href="https://medium.com/hackclub/github-hack-club-grants-for-your-club-custom-merch-more-f64d6da0d782"
              color="info"
            >
              GitHub exclusive
            </FeatureLink>
          </GrantFeature>
          <PackFeature>
            <Module
              name="You’ve got the tools."
              body="Rapid access to the GitHub Student Developer Pack with $45,000 in developer tools for everyone in your club."
              color="white"
            />
            <FeatureLink
              href="https://education.github.com/pack"
              color="white"
              ml={7}
            >
              See what’s inside
            </FeatureLink>
          </PackFeature>
        </Cols>
        <Cols cols="3fr 2fr">
          <PhotoFeature src="/start/community.jpg" inverted>
            <Module
              name="Community"
              body="In our Slack, come chat with hundreds of other club leaders and members around the world."
              color="white"
            />
            <FeatureLink.link to="/community/" color="white">
              Join our Slack
            </FeatureLink.link>
          </PhotoFeature>
          <TextFeature>
            <Text>
              Our <Text.span color="info">curriculum</Text.span> gives your
              members dozens of free tutorials for making websites, games, and
              beyond.
            </Text>
            <FeatureLink href="https://workshops.hackclub.com/" color="info">
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
            <FeatureLink to="https://hackathons.hackclub.com/" color="white">
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
            <FeatureLink.link to="/bank/" color="white">
              Learn more
            </FeatureLink.link>
          </BankFeature>
        </Cols>
      </Container>
    </Flex>
    <Container {...contentContainer} maxWidth={64}>
      <Flex
        flexDirection={['column', null, 'row']}
        justify="center"
        py={[5, 6]}
      >
        <Icon glyph="welcome" color="pink.5" size={96} m={[null, null, 3]} />
        <Box align="left">
          <Headline>
            Start a new club, or bring yours. We’re excited to meet you.
          </Headline>
          <Lead fontSize={[3, 4]} mt={3}>
            When established CS clubs join, they get all the benefits of the
            network. While we’re currently optimized for new clubs, we’re
            continually increasing benefits for existing clubs through new
            projects like <A.link to="/bank/">Bank</A.link>
            {' & '}
            <A href="https://hackathons.hackclub.com/">Hackathons</A>.
          </Lead>
        </Box>
      </Flex>
    </Container>
    <Box bg="snow" color="black" py={[5, 6]}>
      <Container px={3}>
        <SectionEyebrow>Philosophy</SectionEyebrow>
        <SectionHeadline>
          By the students,{' '}
          <Text.span color="warning">for the students</Text.span>.
        </SectionHeadline>
        <SectionLead>
          <Highlight>Every Hack&nbsp;Club is always student-led.</Highlight>{' '}
          Students naturally build the culture of empowerment so key to success.
          Teachers can help by marketing the club & getting access to school
          resources.
        </SectionLead>
        <Cols cols="1fr 1fr">
          <Photo
            alt="Building a robot at a Hack Club event"
            src="/photos/hackpenn_focus.jpg"
          />
          <Photo
            alt="Photo by Janet Fang, Los Altos Hacks"
            src="/photos/lah_1.jpg"
          />
        </Cols>
      </Container>
    </Box>
    <Box bg="white" color="black" pt={[5, 6]} pb={3}>
      <Container px={3}>
        <SectionEyebrow>Application</SectionEyebrow>
        <SectionHeadline>
          Apply today to <Text.span color="primary">start your club</Text.span>.
        </SectionHeadline>
        <SectionLead>
          It’s all-online, free, & takes about an hour. We’ll help from there!
        </SectionLead>
        <Steps color="white">
          <StepOne>
            <A href="https://apply.hackclub.com/">
              <Module
                icon="send"
                name="1. Application"
                body="Start by telling us about your ideas for the club."
              />
            </A>
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
              icon="event-check"
              name="3. First meeting"
              body="Schedule your club’s first meeting & get going!"
            />
          </StepThree>
        </Steps>
      </Container>
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
        <Container width={1} maxWidth={72} px={2} mt={[4, 5, 6]} mb={[3, 4, 5]}>
          <Headline>Start leading your club.</Headline>
          <Text fontSize={[3, 5]} my={[1, 2]}>
            Build the class you wish you&nbsp;had.
          </Text>
          <Text fontSize={[3, 5]} my={[1, 2]}>
            Bring the movement to your&nbsp;school.
          </Text>
          <ApplyButton
            href="https://apply.hackclub.com/"
            children="Apply to Hack Club"
            mt={4}
          />
        </Container>
      </MapBox>
    </Box>
    <Footer />
  </Layout>
)
