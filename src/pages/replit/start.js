import React, { Component } from 'react'
import {
  ThemeProvider,
  Heading,
  Box,
  Flex,
  Text,
  LargeButton,
  Section,
  Link as A,
  Card,
  Container,
  Module as DSModule,
  colors,
  theme,
  mediaQueries
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import About from 'components/About'
import Flag from 'components/Flag'
import Stat from 'components/Stat'
import Footer from 'components/Footer'
import { stats } from 'data.json'

const Header = Section.extend.attrs({
  px: [3, 0],
  py: [5, 3]
})`
  background: ${props => props.theme.colors.blue[5]} url('/map.svg') no-repeat;
  background-size: cover;
  background-position: 33% top;
  text-align: center;
  position: relative;
  ${mediaQueries[1]} {
    background-position: center top;
    min-height: 75vh !important;
  }
  a:first-of-type {
    position: absolute;
    top: 0;
    left: ${props => props.theme.space[2]}px;
  }
  mark {
    background-color: rgba(250, 247, 133, 0.8);
    color: ${props => props.theme.colors.black} !important;
    padding-left: 0.125em;
    padding-right: 0.125em;
    line-height: 1.35;
    width: 100%;
  }
`

const Tagline = Text.extend.attrs({ f: 3, mb: 2 })`
  text-transform: uppercase;
`

const Grid = Container.extend`
  display: grid;
  grid-gap: ${props => props.theme.space[3]}px;
  ${mediaQueries[1]} {
    grid-gap: ${props => props.theme.space[4]}px;
    grid-template-columns: repeat(5, 1fr);
    section:nth-of-type(1) {
      grid-column: 1 / span 2;
    }
    section:nth-of-type(2) {
      grid-column: 3 / span 3;
    }
    section:nth-of-type(3) {
      grid-column: 1 / span 3;
    }
    section:nth-of-type(4) {
      grid-column: 4 / span 2;
    }
  }
  div div {
    align-items: flex-start;
    margin: 0;
    text-align: left;
  }
`

Card.s = Card.withComponent('section')
Flex.s = Flex.withComponent('section')

const GridCard = props => <Card.s boxShadowSize="lg" p={[3, 4]} {...props} />

const Module = props => <DSModule w={[1, 0.5]} m={2} {...props} />

LargeButton.link = LargeButton.withComponent(Link)
A.link = A.withComponent(Link)

class StartRepl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paramString: ''
    }
  }

  componentDidMount() {
    if (!window) {
      return
    }

    this.setState({
      paramString: window.location.search
    })
  }

  render() {
    const { paramString } = this.state

    return (
      <ThemeProvider>
        <Helmet title="Start Your Hack Club" />
        <ReplAnalytics paramString={paramString} />
        <Header>
          <Flag />
          <Tagline>
            <mark>You know the power of coding</mark>
          </Tagline>
          <Heading.h1 f={[5, 6]}>
            <mark>Start a Hack Club.</mark>
          </Heading.h1>
          <Text f={[3, 4]} mt={3} mb={4}>
            <mark>
              Hack Club is a global network of high school coding clubs.
            </mark>
          </Text>
          <LargeButton.link bg="primary" to="/apply">
            Get started »
          </LargeButton.link>
        </Header>
        <About />
        <Grid px={[3, 0]} mt={[4, 6]} mb={5}>
          <GridCard
            bg="white"
            align={['left', 'right']}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Heading.h2 color="primary" f={5}>
              Build the class you wish you could take.
            </Heading.h2>
          </GridCard>
          <GridCard bg="accent" color="white" align="left">
            <Heading.h2 f={5}>Be part of a movement.</Heading.h2>
            <Text f={3} mt={1} mb={3}>
              Hack Club is more than just you.
            </Text>
            <Flex wrap>
              <Stat
                align="left"
                f={6}
                value={stats.school_count}
                label="schools"
              />
              <Stat
                align="left"
                f={6}
                value={stats.country_count}
                label="countries"
              />
              <Stat
                align="left"
                f={6}
                value={stats.state_count}
                label="states"
              />
              <Stat
                align="left"
                f={6}
                value={stats.approximate_members}
                label="members"
              />
            </Flex>
          </GridCard>
          <GridCard bg="info" color="white">
            <Heading.h2 f={5}>Start with a club in a box.</Heading.h2>
            <Text f={3} mt={1}>
              Hack Club HQ gives you everything you need to get going.
            </Text>
            <Flex wrap mt={0} mx={-2}>
              <Module
                icon="forum"
                heading="Online community"
                body="Talk to thousands of club leaders and members on Slack."
              />
              <Module
                icon="chrome_reader_mode"
                heading="Curriculum"
                body="Dozens of tutorials for making projects for your members."
              />
              <Module
                icon="voice_chat"
                heading="Mentorship"
                body="Talk to our team for guidance and assistance whenever."
              />
              <Module
                icon="wallpaper"
                heading="Marketing"
                body="Get stickers, posters, and ideas for spreading your club."
              />
            </Flex>
          </GridCard>
          <Flex.s align="center" py={3} w={1} flex="1 1 auto">
            <LargeButton.link f={4} to="/apply">
              Join the movement »
            </LargeButton.link>
          </Flex.s>
        </Grid>
        <Footer />
      </ThemeProvider>
    )
  }
}

class ReplAnalytics extends Component {
  componentDidUpdate() {
    const paramString = decodeURI(this.props.paramString)
    const paramArray = paramString.split(/\?|&/)
    paramArray.forEach(param => {
      let kv = param.split('=')
      if (kv[0] == 'i') {
        const cValue = `replit_user_id=${kv[1]}`
        const cPath = 'path=/'
        document.cookie = `${cValue}; ${cPath}`

        window.analytics.identify(kv[1])
      }
    })
  }

  render() {
    return ''
  }
}

export default StartRepl
