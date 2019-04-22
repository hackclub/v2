import React from 'react'
import styled from 'styled-components'
import {
  BackgroundImage,
  Box,
  Heading,
  Container,
  Flex,
  Text,
  Link as A,
  OutlineButton,
  Icon,
  theme,
  cx
} from '@hackclub/design-system'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from 'components/Layout'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Sheet from 'components/Sheet'
import GlowingIcon from 'components/GlowingIcon'
import SlackForm from 'components/SlackForm'
import { ColoredHeadline } from 'components/Content'

const BackgroundGradient = styled(Box)`
  position: relative;
  overflow: hidden;
  // Support for browsers that don’t support alpha hex codes
  background-color: ${theme.colors.fuschia[5]};
  // Support for browsers that don’t support gradients
  background-color: ${theme.colors.fuschia[5]}f0;
  background-image: linear-gradient(
    -32deg,
    ${theme.colors.fuschia[5]}f0,
    ${theme.colors.orange[5]}c0
  );
`

const BackgroundVideoBase = styled.video`
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
`

const BackgroundVideo = () => (
  <BackgroundVideoBase autoPlay muted loop playsInline>
    <source
      src="https://hackclub.github.io/slack-invite-background-video/slack.mp4"
      type="video/mp4"
    />
  </BackgroundVideoBase>
)

const Announcement = styled(Sheet).attrs({
  width: 1,
  maxWidth: 28,
  p: 2,
  px: [3, 2],
  mt: [null, -3, -4],
  mb: 3,
  color: 'slate'
})`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.96875);
  border-radius: ${theme.radii[2]};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.0625);
`

OutlineButton.link = OutlineButton.withComponent(Link)

const Grid = styled(Container.withComponent(Flex)).attrs({
  px: [3, 4],
  wrap: true
})`
  display: grid;
  grid-gap: ${theme.space[3]}px;
  ${theme.mediaQueries.md} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${theme.space[4]}px;
  }
`
const Channel = styled(Sheet).attrs({
  width: 1,
  color: 'white',
  mb: 0
})`
  background-image: radial-gradient(
    ellipse farthest-corner at top left,
    ${({ bg }) => cx(`${bg}.5`)},
    ${({ bg }) => cx(`${bg}.8`)}
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 6rem;
  text-align: center;
  position: relative;
  &:nth-of-type(4) img,
  &:nth-of-type(5) img,
  &:nth-of-type(9) img {
    left: auto;
    right: 0;
  }
  &:nth-of-type(12) img {
    top: 0;
  }
  &:nth-of-type(6) img {
    left: auto;
    right: 0;
    bottom: 0;
  }
`
const ChannelName = styled(Heading.h3).attrs({
  fontSize: [4, 5],
  bold: true
})`
  + p {
    opacity: 0.875;
    font-size: ${theme.fontSizes[3]}px;
    line-height: 1.25;
    max-width: 24rem;
    margin: ${theme.space[2]}px auto;
  }
`
const ChannelArt = styled(Box.withComponent('img'))`
  position: absolute;
  height: 100%;
  opacity: 0.25;
  left: 0;
  bottom: -20%;
`

const channels = [
  {
    name: 'ship',
    desc: 'Show your work! Post your latest projects & get feedback.',
    color: 'red'
  },
  {
    name: 'code',
    desc: 'Get help, ask questions, share resources.',
    color: 'gray'
  },
  {
    name: 'lounge',
    desc: 'Hang out & get to know people.',
    color: 'teal'
  },
  {
    name: 'music',
    desc: 'Share & find new songs.',
    color: 'pink'
  },
  {
    name: 'linux',
    desc:
      'Share your setup, find ideas, & get help with a community of enthusiasts.',
    color: 'blue'
  },
  {
    name: 'hack-night',
    desc: 'Our weekly Saturday night distributed hackathons/hangouts.',
    color: 'violet'
  },
  {
    name: 'lgbtq',
    color: 'orange'
  },
  {
    name: 'photography',
    color: 'cyan'
  },
  {
    name: 'support',
    color: 'fuschia'
  },
  {
    name: 'challenges',
    color: 'yellow'
  },
  {
    name: 'blockchain',
    color: 'indigo'
  },
  {
    name: 'counttoamillion',
    color: 'red'
  }
]

const title = 'Hack Club – Join our Slack'
const desc =
  'Hack Club’s Slack community is a group of high school hackers around the world. Chat, meet new friends, code together, share your work.'
const img = 'https://hackclub.com/cards/slack_invite.png'

export default () => (
  <Layout bg="dark">
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
        { property: 'og:url', content: 'https://hackclub.com/community' }
      ]}
    />
    <Nav dark />
    <BackgroundGradient>
      <BackgroundVideo />
      <Container px={3} pt={[6, 7]} color="white" align="center">
        <Announcement>
          <Icon size={24} glyph="history" color="slate" />
          <Text color="black" fontSize={2} ml={1}>
            Already have an account?
          </Text>
          <A
            caps
            color="accent"
            fontSize={2}
            px={2}
            bold
            ml="auto"
            href="https://hackclub.slack.com"
            target="_blank"
            chevronRight
          >
            Sign in
          </A>
        </Announcement>
        <Heading.h1 fontSize={[6, 7]} mt={[3, 4]} mb={2}>
          Join the Hack Club Slack
        </Heading.h1>
        <Heading.h2 color="pink.0" fontSize={[4, 5]} mb={4} regular>
          Talk to our community, get coding help, have fun.
        </Heading.h2>
        <Sheet maxWidth={28} align="left" my={4} mx="auto">
          <SlackForm />
        </Sheet>
      </Container>
      <Text color="pink.0" align="center" fontSize={[4, 5]} bold mt={[3, 4, 5]}>
        Explore
      </Text>
      <Flex align="center" justify="center" color="pink.1" mt={-2} pb={[3, 4]}>
        <Icon glyph="down-caret" size={48} />
      </Flex>
    </BackgroundGradient>
    <Box py={[5, 6]}>
      <Container maxWidth={36} px={3} mb={5} align="center">
        <ColoredHeadline colors={['fuschia.5', 'pink.5', 'orange.5']} mb={2}>
          Channels galore.
        </ColoredHeadline>
        <Text fontSize={[3, 4]} color="muted">
          Here are just a few of the most popular channels. Join in, or create
          your own.
        </Text>
      </Container>
      <Grid>
        {channels.map(channel => (
          <Channel bg={channel.color} key={channel.name}>
            <ChannelArt src={`/slacks/${channel.name}.png`} />
            <ChannelName>#{channel.name}</ChannelName>
            {channel.desc && <Text children={channel.desc} />}
          </Channel>
        ))}
      </Grid>
    </Box>
    <BackgroundImage
      bg="darker"
      src="/photos/night.jpg"
      style={{ backgroundPosition: 'top center' }}
    >
      <Container px={3} py={[5, 6]}>
        <GlowingIcon glyph="explore" color="#c57206" size={96} ml={-2} />
        <ColoredHeadline colors={['#d98b38', '#c57206', '#7c3b00']}>
          Come to Hack&nbsp;Night, our weekly nighttime hackathon.
        </ColoredHeadline>
        <Text color="#a56a3b" fontSize={4} mb={3} maxWidth={48}>
          On Saturday nights at 6pm PST, a group from our community comes
          together for Hack Night. It’s a remote hackathon, social hangout, and
          a ton of fun. Build, learn, and share together.
        </Text>
        <OutlineButton.link bg="#c57206" to="/night" mt={3}>
          Learn more
        </OutlineButton.link>
      </Container>
    </BackgroundImage>
    <Footer dark />
  </Layout>
)
