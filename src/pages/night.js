import React from 'react'
import styled from 'styled-components'
import {
  Container,
  BackgroundImage,
  Heading,
  LargeButton,
  theme
} from '@hackclub/design-system'
import { Link } from 'gatsby'
import Layout from 'components/Layout'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import IconButton from 'components/IconButton'
import { Lead } from 'components/Content'

theme.colors.night = '#c57206'
theme.colors.nightMuted = '#a56a3b'

const Hero = styled(BackgroundImage)`
  background-position: 90% center;
`

const Megaline = styled(Heading.h1).attrs({
  color: 'night',
  fontSize: [6, null, 7, 8],
  pb: 2
})`
  line-height: 1.125;
  max-width: 20rem;
  @supports (-webkit-background-clip: text) {
    background-image: linear-gradient(
      to bottom right,
      #d98b38 25%,
      ${theme.colors.night} 50%,
      #7c3b00
    );
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  ${theme.mediaQueries.md} {
    max-width: none;
  }
`

const CTA = styled(IconButton).attrs({
  is: LargeButton.withComponent(Link),
  bg: 'night',
  color: 'white',
  glyph: 'slack-fill'
})`
  background-image: radial-gradient(
    ellipse farthest-corner at top left,
    #d98b38 25%,
    ${theme.colors.night} 50%,
    #7c3b00
  );
`

const title = 'Hack Night – a weekly online hackathon by Hack Club'
const desc =
  'On Saturday nights, the Hack Club community of high school hackers gathers for Hack Night, a distributed nighttime hackathon and hangout.'
const img = 'https://hackclub.com/cards/night.png'

export default () => (
  <Layout>
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
        { property: 'og:url', content: 'https://hackclub.com/night' }
      ]}
    />
    <Nav color={theme.colors.nightMuted} dark />
    <Hero
      src="/night.jpg"
      aria-label="Blood moon & stars in the night sky"
      bg="darker"
    >
      <Container px={3} py={[6, 7, 8]}>
        <Megaline>Join us for Hack Night.</Megaline>
        <Lead
          fontSize={[3, null, 4]}
          color="nightMuted"
          maxWidth={52}
          my={3}
          mx={0}
        >
          On Saturday nights, the Hack Club community of high school hackers
          gathers for Hack Night, a distributed nighttime hackathon and hangout.
        </Lead>
        <Lead color="nightMuted" maxWidth={36} mb={4} mx={0}>
          Meet some new people, build something cool, talk about it. There are
          no prizes or expectations—just have fun!
        </Lead>
        <CTA to="/community/">Join #hack-night on Slack</CTA>
      </Container>
    </Hero>
    <Footer dark />
  </Layout>
)
