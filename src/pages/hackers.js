import React from 'react'
import styled from 'styled-components'
import {
  Box,
  Flex,
  Container,
  Text,
  Heading,
  LargeButton as Button,
  OutlineButton,
  BackgroundImage,
  Link as A,
  Avatar,
  theme,
  hexa
} from '@hackclub/design-system'
import Icon from '@hackclub/icons'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Sheet from 'components/Sheet'
import {
  ColoredHeadline,
  Headline,
  Subhline,
  Highlight
} from 'components/Content'

const cta = {
  chevronRight: true,
  color: 'white'
}
const CTA = styled(Button.withComponent(Link)).attrs(cta)`
  background: linear-gradient(
    to bottom,
    ${theme.colors.pink[5]},
    ${theme.colors.red[6]}
  );
`
const StartCTA = styled(Button.withComponent(Link)).attrs(cta)`
  background: linear-gradient(
    to bottom,
    ${theme.colors.orange[5]},
    ${theme.colors.red[6]}
  );
`
OutlineButton.link = OutlineButton.withComponent(Link)

const GlowingIcon = styled(Box.withComponent(Icon))`
  filter: drop-shadow(0 0 4px ${({ color }) => hexa(color, 0.75)});
`
const HeadlineIcon = styled(GlowingIcon)`
  position: relative;
  top: ${theme.space[2]}px;
  ${theme.mediaQueries.md} {
    width: 64px;
    height: 64px;
  }
`

const Megaline = styled(Heading.h1).attrs({
  f: [6, 7, 8],
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
`

const Lead = Container.withComponent(Text)
Lead.defaultProps = { f: 3, mx: 'auto' }

const Quote = styled(Sheet).attrs({ maxWidth: 48, bg: 'smoke', f: 3 })`
  position: relative;
  &:before {
    content: '“';
    line-height: 1;
    font-size: ${theme.fontSizes[7]}px;
    padding-left: ${theme.space[1]}px;
    position: absolute;
    left: 0;
    top: 0;
    color: ${theme.colors.muted};
    padding: ${theme.space[3]}px;
  }
`
const FirstLetter = styled(Text)`
  @supports (initial-letter: 1) or (-webkit-initial-letter: 1) {
    &:first-child:first-letter {
      -webkit-initial-letter: 2;
      initial-letter: 2;
      margin-right: ${theme.space[3]}px;
      margin-left: ${theme.space[3]}px;
      font-weight: bold;
    }
  }
`
const MegaQuote = styled(Quote).attrs({
  px: [3, 4, 5],
  py: [5, 6],
  color: 'white'
})`
  background-image: radial-gradient(
    ellipse farthest-corner at top left,
    ${theme.colors.pink[5]},
    ${theme.colors.fuschia[5]},
    ${theme.colors.indigo[5]}
  );
  &:before {
    color: ${theme.colors.snow};
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
const FeatureLine = styled(Box).attrs({ width: 1, mb: -2 })`
  height: 4px;
`
const Photo = styled(Sheet.withComponent(BackgroundImage)).attrs({
  scale: true
})`
  min-height: 24rem;
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

const title = 'Hack Club – a community of high school hackers'
const desc =
  'Get a bank account for your high school coding event or hackathon with the backing of a 501(c)(3) non-profit. Student organizers can invoice sponsors, issue physical debit cards, and get access to their event’s financials through a real-time dashboard.'
const img = 'https://hackclub.com/cards/hackers.png'

export default () => (
  <Box.main color="white">
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: desc },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: desc },
        { name: 'twitter:image', content: img },
        { property: 'og:title', content: title },
        { property: 'og:description', content: desc },
        { property: 'og:image', content: img },
        { property: 'og:url', content: 'https://hackclub.com/hackers' }
      ]}
    />
    <Nav dark />
    <Box bg="dark" align="center" pt={[4, 5]}>
      <Container maxWidth={72} px={3} py={[5, 6]}>
        <Megaline color="snow" mt={4}>
          Welcome, high school hackers. You’ve found your place.
        </Megaline>
        <Lead f={[3, 4]} color="smoke" px={3} maxWidth={48} mt={[3, 4]}>
          Hack Club is a worldwide community of high school hackers and coding
          clubs. We make together, learn together, organize hackathons together.
          This is your home.
        </Lead>
      </Container>
    </Box>
    <Box bg="darker" py={4}>
      <Container px={3} pt={5}>
        <ColoredHeadline colors={['orange.5', 'pink.5', 'red.5']}>
          Join an incredible worldwide community of hackers.
          <HeadlineIcon glyph="like-fill" color="pink.5" size={48} ml={2} />
        </ColoredHeadline>
        <Text color="smoke" f={4} mb={3} style={{ maxWidth: '48rem' }}>
          Hack Club gives you a community of thousands of other young makers to
          talk to. We’re artists, writers, engineers, tinkerers, campers,
          filmmakers, volunteers. We make things. We help one another.
        </Text>
        <Text color="smoke" f={4} mb={4} style={{ maxWidth: '48rem' }}>
          Have a coding question? Looking for feedback on your project? Trying
          to start a local meetup group? You’ll find some phenomenal people to
          talk to in our Slack community with 3,000+ members around the world
          who are active at all hours.
        </Text>
        <CTA to="/slack_invite">Get your invitation</CTA>
        <Features mt={[4, 5]}>
          <Box>
            <CommunityLine />
            <Subhline color="smoke" mt={5}>
              Join the party & show your work.
            </Subhline>
            <Text color="muted" f={4}>
              Making projects alone can be isolating. In the Slack community,
              you’ll find supporters and collaborators for your work.
            </Text>
          </Box>
          <Box>
            <CommunityLine />
            <Subhline color="smoke" mt={5}>
              Meet some truly incredible people.
            </Subhline>
            <Text color="muted" f={4}>
              You’re going to meet super talented people, who organize
              hackathons, start coding clubs, lead camps, classes, and more.
            </Text>
          </Box>
          <Photo
            src="/hackers/pennapps.jpg"
            aria-label="Hack Club members at PennApps"
          />
          <Photo
            src="/hackers/github.jpg"
            aria-lable="Hack Club members posing at GitHub"
          />
        </Features>
      </Container>
      <Quote mt={4}>
        <FirstLetter>
          I discovered Hack Club by accident last year when browsing on GitHub,
          and it is no doubt one of{' '}
          <Highlight>the most fortunate strokes of serendipity</Highlight> to
          have ever happened to me. I was already leading a coding club at my
          school and decided that joining the Hack Club network would help
          improve it further.
        </FirstLetter>
        <Text my={3}>
          Above all, without the community Hack Club provided, I wouldn’t have
          learned a lot of the things I know today. I wouldn’t have understood
          promises in JavaScript. I wouldn’t have discovered hackathons. I
          wouldn’t have met many of the people I call friends today.{' '}
          <Highlight>The community is filled with brilliant people</Highlight>
          —those poised to make an impact on the world and those who already
          have.
        </Text>
        <Text>
          I could have never envisioned how much influence this community would
          have on my life a year ago. There are definitely many, many more lives
          around the globe to be changed like it has to mine.
        </Text>
        <Flex align="center" mt={3}>
          <Avatar src="/hackers/victor.png" size={48} mr={2} />
          <Text f={3} bold>
            Victor Truong
          </Text>
          <Text f={2} color="slate" ml={2}>
            (@ifvictr on Slack)
          </Text>
        </Flex>
      </Quote>
    </Box>
    <Box bg={theme.colors.dark} py={[5, 6]}>
      <Container px={3}>
        <ColoredHeadline colors={['fuschia.5', 'violet.5', 'blue.5']}>
          Grow as a programmer & human with our resources.
        </ColoredHeadline>
        <Text color="smoke" f={4} mb={4} style={{ maxWidth: '48rem' }}>
          We run monthly <A href="/challenge">Challenges</A>, coding
          competitions around a theme with cash prizes. We offer dozens of{' '}
          <A href="/workshops">free, open-source coding tutorials</A>. We{' '}
          <A href="https://medium.com/hackclub/how-to-start-a-computer-science-club-at-your-high-school-ff32264f225a">
            write articles
          </A>{' '}
          about running coding clubs and student events. We’re deeply committed
          to improving the high school hacking community, and are constantly
          launching new services to help.
        </Text>
        <Features mt={[4, 5]}>
          <Box>
            <ResourcesLine />
            <Subhline color="smoke" mt={5}>
              Running an event?
              <br />
              We can help.
            </Subhline>
            <Text color="muted" f={4}>
              Organizing a hackathon is tough. Luckily,{' '}
              <A href="/bank">Hack Club Bank</A> offers best-in-class fiscal
              sponsorship for high school events, and we’ll help you every step
              of the way.
            </Text>
          </Box>
          <Box>
            <ResourcesLine />
            <Subhline color="smoke" mt={5}>
              Learn as you build at hackathons & events.
            </Subhline>
            <Text color="muted" f={4}>
              We maintain an open source, up-to-date list of all the{' '}
              <A href="https://hackathons.hackclub.com">
                high school hackathons
              </A>{' '}
              happening soon. Check out all those events! (And totally go to
              one.)
            </Text>
          </Box>
        </Features>
      </Container>
    </Box>
    <BackgroundImage
      bg="darker"
      src="/hackers/night.jpg"
      style={{ backgroundPosition: 'top center' }}
    >
      <Container px={3} py={[5, 6]}>
        <GlowingIcon glyph="explore" color="#c57206" size={96} ml={-2} />
        <ColoredHeadline colors={['#d98b38', '#c57206', '#7c3b00']}>
          Come to Hack&nbsp;Night, our weekly nighttime hackathons.
        </ColoredHeadline>
        <Text color="#a56a3b" f={4} mb={3} style={{ maxWidth: '48rem' }}>
          Every Saturday night at 6pm PST, a group from our community comes
          together for Hack Night. It’s a remote hackathon, social hangout, and
          a ton of fun. Build, learn, and share together.
        </Text>
        <OutlineButton.link bg="#c57206" to="/night" mt={3}>
          Learn more
        </OutlineButton.link>
      </Container>
    </BackgroundImage>
    <Box bg="dark" py={5}>
      <Container px={3} py={4}>
        <ColoredHeadline colors={['red.5', 'orange.5', 'yellow.5']}>
          Start a coding club at your high school, or bring yours.
        </ColoredHeadline>
        <Text color="smoke" f={4} mb={3} style={{ maxWidth: '48rem' }}>
          Beyond our community, Hack Club is a nonprofit collective of coding
          clubs led by high schoolers everywhere. If you’ve already got a coding
          club, you’re welcome to join our network! If you’re interested in
          starting your own, we’ll help you out every step fo the way.
        </Text>
        <StartCTA to="/start" mt={3}>
          Start your club
        </StartCTA>
        <OutlineButton
          bg="orange.1"
          color="warning"
          href="https://finder.hackclub.com"
          ml={[null, 3]}
          mt={3}
        >
          Explore nearby
        </OutlineButton>
      </Container>
      <MegaQuote mt={5}>
        <Text f={6} bold>
          Before I started Hack Club in sophomore year, I didn’t believe in
          myself. I didn’t think I could do big things.
        </Text>
        <Flex align="center" mt={[4, 5]} mb={[-3, -4]}>
          <Avatar src="/hackers/megan.png" size={48} mr={3} />
          <Box align="left" f={3}>
            <Text.span bold>Megan Cui</Text.span>, Cincinnati
            <br />
            <Text f={2} color="smoke">
              (@megan on Slack)
            </Text>
          </Box>
        </Flex>
      </MegaQuote>
    </Box>
    <Footer dark />
  </Box.main>
)
