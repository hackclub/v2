import React from 'react'
import styled from 'styled-components'
import {
  Box,
  Card,
  Container,
  Flex,
  Heading,
  Text,
  theme,
  cx
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import YouTubePlayer from 'react-player/lib/players/YouTube'
import Layout from 'components/Layout'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import { kebabCase } from 'lodash'

const styles = `
  body {
    width: 100%;
    max-width: 100vw;
    background-color: ${theme.colors.dark};
    color: ${theme.colors.gray[3]};
    background-image: radial-gradient(circle, ${theme.colors.black}, ${
  theme.colors.black
} 1px,
      ${theme.colors.dark} 1px, ${theme.colors.dark});
    background-size: 2rem 2rem;
  }
`

const Calendar = styled(Flex)`
  flex-direction: column;
  flex-shrink: 0;
  text-align: center;
  border-width: 4px;
  width: 96px;
  height: 96px;
  border-color: ${props => cx(props.color)};
  border-style: solid;
  border-radius: 16px;
  font-weight: ${theme.bold};
`
const Year = styled(Text).attrs({
  fontSize: 3,
  py: 1,
  color: 'dark'
})`
  line-height: 1;
`
const Month = styled(Text).attrs({ fontSize: 4, mt: 1 })`
  line-height: 1.5;
`

const Updater = styled(Container.withComponent(Flex))`
  flex-direction: column;
  align-items: center;
  ${theme.mediaQueries.md} {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }
`

const Sheet = styled(Card)`
  box-sizing: border-box;
  width: 100%;
  max-width: 48rem;
  max-height: 24rem;
  position: relative;
  padding-top: 55%;
  overflow: hidden;
  box-shadow: ${theme.boxShadows[1]};
  transition: 0.25s ${theme.transition} box-shadow;
  &:hover {
    box-shadow: ${theme.boxShadows[2]};
  }
  ${theme.mediaQueries.md} {
    padding-top: 41.25%; // NOTE(@lachlanjc): i just guessed until i found this
  }
`
const Player = styled(Box.withComponent(YouTubePlayer))`
  position: absolute;
  top: 0;
  left: 0;
`

const Update = ({ month, year, color = 'primary', url, ...props }) => (
  <Updater
    mb={5}
    px={3}
    className="invert"
    id={kebabCase(`${month.replace('.', '')}-${year}`)}
  >
    <Calendar color={color} mb={3} mr={[null, 3, 4]}>
      <Year bg={color} children={year} />
      <Month color={color} children={month} />
    </Calendar>
    <Sheet>
      <Player
        url={url}
        width="100%"
        height="100%"
        controls
        config={{ youtube: { playerVars: { showinfo: 1 } } }}
      />
    </Sheet>
  </Updater>
)

const title = 'Update Videos – Hack Club'
const desc =
  'Watch all of Hack Club’s update videos on what’s new in our community of high school coding clubs.'
const img = 'https://hackclub.com/cards/updates.png'

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
        { property: 'og:url', content: 'https://hackclub.com/updates' }
      ]}
    />
    <style children={styles} />
    <Nav dark />
    <Box py={[4, 5]} align="center" justify="center">
      <Container pt={[5, 6]} maxWidth={32}>
        <Heading.h1 color="white" fontSize={[6, 7]}>
          Updates
        </Heading.h1>
        <Text fontSize={4} color="muted" style={{ lineHeight: '1.25' }}>
          Every so often we produce video updates with what’s new at Hack Club.
          Here they all are!
        </Text>
      </Container>
    </Box>
    <Container pb={4}>
      <Update
        color="yellow.6"
        month="July"
        year={2018}
        url="https://youtu.be/k8HI0y2CyKI"
      />
      <Update
        color="green.6"
        month="May"
        year={2018}
        url="https://youtu.be/_u8_U52ebao"
      />
      <Update
        color="teal.7"
        month="April"
        year={2018}
        url="https://youtu.be/q1BOuOhPvbg"
      />
      <Update
        color="cyan.8"
        month="March"
        year={2018}
        url="https://youtu.be/Xj32LuE44bU"
      />
    </Container>
    <Footer dark />
  </Layout>
)
