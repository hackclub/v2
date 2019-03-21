import React from 'react'
import styled from 'styled-components'
import {
  Avatar,
  BackgroundImage,
  Box,
  Container,
  Flex,
  Heading,
  LargeButton as Button,
  Link as A,
  OutlineButton,
  Text,
  theme,
  hexa
} from '@hackclub/design-system'
import Icon from '@hackclub/icons'
import { Link } from 'gatsby'
import Layout from 'components/Layout'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Sheet from 'components/Sheet'
import GlowingIcon from 'components/GlowingIcon'
import { ColoredHeadline, Subhline, Featline } from 'components/Content'
// import Announcement from 'components/home/Announcement'

const cta = {
  chevronRight: true,
  color: 'white'
}
const CTA = styled(Button.withComponent(Link)).attrs(cta)`
  background: ${theme.gradient('pink.5', 'red.6')};
`
const StartCTA = styled(Button.withComponent(Link)).attrs(cta)`
  background: ${theme.gradient('orange.5', 'red.6')};
`
OutlineButton.link = OutlineButton.withComponent(Link)

const HeadlineIcon = styled(GlowingIcon)`
  top: ${theme.space[1]}px;
  ${theme.mediaQueries.md} {
    top: ${theme.space[2]}px;
    width: 64px;
    height: 64px;
  }
`
const SubhlineIcon = styled(GlowingIcon)`
  top: ${theme.space[1]}px;
  ${theme.mediaQueries.md} {
    top: ${theme.space[2]}px;
    width: 48px;
    height: 48px;
  }
`

const Megaline = styled(Heading.h1).attrs({
  fontSize: [6, 7, 8],
  mx: 'auto'
})`
  line-height: 1.125;
  color: ${theme.colors.success};
  @supports (-webkit-background-clip: text) {
    background: linear-gradient(
      to bottom right,
      ${theme.colors.cyan[5]} 25%,
      ${theme.colors.teal[5]} 50%,
      ${theme.colors.green[5]}
    );
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  ${theme.mediaQueries.md} {
    line-height: 1;
  }
`

const Lead = Container.withComponent(Text)
Lead.defaultProps = { fontSize: 3, mx: 'auto' }

const Quote = styled(Sheet).attrs({ maxWidth: 48, bg: 'primary', fontSize: 3 })`
  border-radius: ${theme.radii[2]};
  position: relative;
  ${GlowingIcon} {
    opacity: 0.75;
    position: absolute;
    left: 0;
    top: 0;
    ${theme.mediaQueries.md} {
      width: 36px;
      height: 36px;
    }
  }
`
const MegaQuote = styled(Quote).attrs({
  px: [3, 4, 5],
  pt: 6,
  pb: [4, 5],
  color: 'white'
})`
  background-image: radial-gradient(
    ellipse farthest-corner at top left,
    ${theme.colors.pink[5]},
    ${theme.colors.fuschia[5]},
    ${theme.colors.indigo[5]}
  );
  &:before {
    color: ${theme.colors.pink[2]};
  }
  ${Text} {
    line-height: 1.125;
    ${theme.mediaQueries.md} {
      line-height: 1.25;
    }
  }
`

const Features = styled(Box)`
  display: grid;
  grid-gap: ${theme.space[3]}px;
  ${theme.mediaQueries.md} {
    grid-gap: ${theme.space[4]}px;
    grid-template-columns: repeat(2, 1fr);
  }
`
const FeatureLine = styled(Box).attrs({
  bg: 'primary',
  width: 1,
  mt: 2,
  mb: -2
})`
  border-radius: ${theme.radius};
  height: 4px;
`
const Photo = styled(Sheet.withComponent(BackgroundImage)).attrs({
  role: 'img',
  p: 0
})`
  min-height: 18rem;
  position: relative;
  ${theme.mediaQueries.md} {
    min-height: 25rem;
  }
  &:after {
    content: attr(aria-label);
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.875);
    border-radius: 0 0 ${theme.radii[2]} ${theme.radii[2]};
    bottom: 0;
    color: ${theme.colors.white};
    display: block;
    font-size: ${theme.fontSizes[2]}px;
    padding: ${theme.space[2]}px ${theme.space[3]}px;
    position: absolute;
    width: 100%;
    max-width: 100%;
    @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
      background-color: rgba(0, 0, 0, 0.75);
      -webkit-backdrop-filter: saturate(180%) blur(16px);
    }
    ${theme.mediaQueries.reduceTransparency} {
      -webkit-backdrop-filter: auto !important;
    }
  }
`
const CommunityLine = styled(FeatureLine)`
  background: linear-gradient(
    to right,
    ${theme.colors.orange[5]},
    ${theme.colors.pink[5]},
    ${theme.colors.red[5]}
  );
`
const ResourcesLine = styled(FeatureLine)`
  background: linear-gradient(
    to right,
    ${theme.colors.fuschia[5]},
    ${theme.colors.violet[5]},
    ${theme.colors.blue[5]}
  );
`

export default () => (
  <Layout bg="dark">
    <Box.main color="white">
      <Helmet>
        <meta
          name="google-site-verification"
          content="f7cxVyFnrTxN9Q-HnpP-ueNWuWF5VgIEKF0C3tSnsnc"
        />
      </Helmet>
      <Nav dark />
      <Box align="center" pt={[4, 5, 6]}>
        <Container maxWidth={72} px={3} py={[5, 6]}>
          <Megaline color="smoke" mt={4} pb={1}>
            Welcome, high school hackers. You’ve found your place.
          </Megaline>
          <Lead
            fontSize={[3, 4]}
            color="smoke"
            maxWidth={44}
            mt={[3, 4]}
            mb={[4, 5]}
          >
            Hack Club is a worldwide community of young hackers and high school
            coding clubs. We make together, learn together, organize hackathons
            together. <strong>This is your home.</strong>
          </Lead>
          <OutlineButton.link bg="orange.1" to="/community" m={[1, 2]}>
            Join the community
          </OutlineButton.link>
          <StartCTA to="/start" m={[1, 2]}>
            Start your club
          </StartCTA>
        </Container>
      </Box>
      <Box bg="darker" py={[5, 6]}>
        <Container px={3}>
          <ColoredHeadline
            fontSize={[6, 7, 8]}
            colors={['orange.5', 'pink.5', 'red.5']}
          >
            Join an incredible global community&nbsp;of hackers.
            <HeadlineIcon
              glyph="like-fill"
              color="pink.5"
              aria-label="heart icon"
              size={36}
              ml={2}
              mt={-4}
            />
          </ColoredHeadline>
          <Text
            color="smoke"
            fontSize={4}
            mt={0}
            mb={3}
            style={{ maxWidth: '48rem' }}
          >
            Hack Club gives you a community of thousands of other young makers
            to talk to. We’re artists, writers, engineers, tinkerers,
            filmmakers, volunteers. We make things. We help one another.
          </Text>
          <Text color="smoke" fontSize={4} mb={4} style={{ maxWidth: '48rem' }}>
            Have a coding question? Looking for feedback on your project? Trying
            to start a local meetup? You’ll find some phenomenal people to talk
            to in our Slack community (online groupchat, Discord-style) with
            3,000+ members around the world, active at all hours.
          </Text>
          <CTA to="/community">Sign me up</CTA>
          <Features mt={[4, 5]}>
            <Box>
              <CommunityLine />
              <Featline color="smoke" mt={5}>
                Join forces with the best hackers.
              </Featline>
              <Lead color="muted">
                Making projects on your own can be isolating—we’ve been there.
                In the Slack community, you’ll find friends, supporters, and
                collaborators for your work.
              </Lead>
            </Box>
            <Box>
              <CommunityLine />
              <Featline color="smoke" mt={5}>
                Meet some truly incredible people.
              </Featline>
              <Lead color="muted">
                You’re going to meet super talented people, who organize
                hackathons, start coding clubs, build apps, lead camps, classes,
                and more.
              </Lead>
            </Box>
            <Photo
              src="/photos/dena_cover.jpg"
              aria-label="A Hack Club meeting near Toronto, Canada"
            />
            <Photo
              src="/photos/hackpenn_crew.jpg"
              aria-label="Organizers of PA’s largest high school hackathon met in our Slack"
            />
          </Features>
        </Container>
      </Box>
      <Box bg="dark" py={[5, 6]}>
        <Container px={3}>
          <ColoredHeadline
            fontSize={[6, 7, 8]}
            colors={['fuschia.5', 'violet.5', 'blue.5']}
          >
            Grow as a programmer & human with our resources.
          </ColoredHeadline>
          <Text color="smoke" fontSize={4} mb={4} style={{ maxWidth: '48rem' }}>
            We offer dozens of{' '}
            <A href="/workshops">free, open-source coding tutorials</A>. We
            write{' '}
            <A
              target="_blank"
              href="https://medium.com/hackclub/how-to-start-a-computer-science-club-at-your-high-school-ff32264f225a"
            >
              articles about running coding clubs
            </A>{' '}
            and student events. We run seasonal{' '}
            <A href="/challenge">Challenges</A>, coding competitions around a
            theme with cash prizes. We’re deeply committed to improving the high
            school hacking community, & are constantly building services to
            help.
          </Text>
          <Features mt={[4, 5, 6]}>
            <Box>
              <ResourcesLine />
              <Subhline color="smoke" mt={5}>
                Learn as you build at hackathons & events.
              </Subhline>
              <Text color="muted" fontSize={4}>
                We maintain an open source, up-to-date list of all the{' '}
                <A href="https://hackathons.hackclub.com">
                  high school hackathons
                </A>{' '}
                happening soon. Check out all those events! (& totally go to
                one.)
              </Text>
            </Box>
            <Box>
              <ResourcesLine />
              <Subhline color="smoke" mt={5}>
                Running an event?
                <br />
                We can help.
                <SubhlineIcon
                  glyph="bank-circle"
                  color="red.5"
                  aria-label="hack club bank icon"
                  size={32}
                  ml={2}
                  mt={-2}
                />
              </Subhline>
              <Text color="muted" fontSize={4}>
                Organizing a hackathon is tough. Luckily,{' '}
                <A href="/bank">Hack&nbsp;Club Bank</A> offers best-in-class
                fiscal sponsorship & support for high school events.
              </Text>
            </Box>
          </Features>
        </Container>
      </Box>
      <Box bg="darker" py={[5, 6, 7]}>
        <Container px={3}>
          <ColoredHeadline
            fontSize={[6, 7, 8]}
            colors={['red.5', 'orange.5', 'yellow.5']}
          >
            Start a coding club at your high&nbsp;school, or bring yours.
          </ColoredHeadline>
          <Text color="smoke" fontSize={4} mb={3} style={{ maxWidth: '48rem' }}>
            Beyond our community, Hack Club is a nonprofit collective of coding
            clubs led by high schoolers everywhere. If you’ve already got a
            coding club, you’re welcome to join our network! If you’re
            interested in starting your own, we’ll help you out every step of
            the way.
          </Text>
          <StartCTA to="/start" mt={3}>
            Start your club
          </StartCTA>
          <MegaQuote mt={6}>
            <GlowingIcon glyph="quote" size={28} />
            <Text fontSize={[5, 6]} mt={[null, 5]} bold>
              Before I started Hack Club in sophomore year, I didn’t believe in
              myself. I didn’t think I could do big things.
            </Text>
            <Flex align="center" mt={[4, 5]}>
              <Avatar src="/hackers/megan.png" size={48} mr={3} />
              <Box align="left" fontSize={3}>
                <Text.span bold>Megan Cui</Text.span>, Cincinnati, OH
                <br />
                <Text fontSize={2} color="smoke">
                  (@megan on Slack)
                </Text>
              </Box>
            </Flex>
          </MegaQuote>
        </Container>
      </Box>
      <Footer dark />
    </Box.main>
  </Layout>
)
