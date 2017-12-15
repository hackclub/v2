import React from 'react'
import {
  Provider,
  Heading,
  Lead,
  Container,
  Flex,
  Box,
  Text,
  Subhead,
  Link as A
} from 'rebass'
import theme, { colors, cx, mx } from '../theme'
import { Head } from 'react-static'
import Nav from '../components/Nav'
import CTA from '../components/CTA'
import Icon from '../components/Icon'
import Footer from '../components/Footer'

const Section = Flex.extend.attrs({
  is: 'section',
  align: 'center',
  justify: 'center',
  direction: 'column',
  color: 'white',
  py: [4, 5],
  px: 3
})`
  background-color: ${props => cx(props.hues[1])};
  background-image: linear-gradient(16deg,
    ${props => cx(props.hues[0])} 0%,
    ${props => cx(props.hues[1])} 50%,
    ${props => cx(props.hues[2])} 100%);
  text-align: center;

  h2 img {
    display: inline-block;
  }
`
const One = props => (
  <Section
    hues={['orange.4', 'red.5', 'red.6']}
    style={{ paddingTop: 0 }}
    {...props}
  />
)
const Two = props => (
  <Section hues={['violet.5', 'violet.6', 'indigo.3']} {...props} />
)
const Three = props => (
  <Section hues={['green.4', 'teal.6', 'teal.7']} {...props} />
)
const Four = props => (
  <Section hues={['pink.4', 'fuschia.6', 'fuschia.7']} {...props} />
)

const Modules = Flex.extend.attrs({
  wrap: true,
  justify: 'center',
  mt: 3,
  color: 'white'
})``

const ModuleBase = Flex.extend.attrs({
  w: [1, 1 / 3],
  py: 3,
  px: 2,
  direction: 'column',
  align: 'center'
})`
  img {
    width: 3rem !important;
    height: 3rem !important;
    flex-shrink: 0;
  }

  ${mx[1]} {
    max-width: 20rem;
  }
`

const ModuleHeading = Subhead.extend.attrs({ mt: 0, mb: 1, f: 3 })``
const ModuleBody = Text.extend.attrs({ my: 0, f: 2 })`
  line-height: 1.5;
  position: relative;
`
const ModuleDivider = Box.extend.attrs({ w: 64, bg: 'white', mt: 3 })`
  width: 64px;
  height: 6px;
`

const Module = ({ icon, heading, body, ...props }) => (
  <ModuleBase>
    <Icon name={icon} fill="white" />
    <ModuleHeading children={heading} />
    <ModuleBody children={body} />
    <ModuleDivider />
  </ModuleBase>
)

const CTASection = Box.extend.attrs({ is: 'section', px: 3, my: [3, 5] })`
  text-align: center;
`

export default () => (
  <Provider theme={theme}>
    <Head>
      <title>Start – Hack Club</title>
    </Head>
    <One>
      <Nav />
      <Heading is="h1" f={[5, 6]} mt={[4, 5]}>
        Let’s get your Hack Club started.
      </Heading>
      <Heading f={[3, 4]} my={2} style={{ fontWeight: 'normal' }}>
        The awesome coding club at your high school is coming soon.
      </Heading>
    </One>
    <Two>
      <Heading f={[4, 5]}>
        HQ provides the resources you’ll need to{' '}
        <Icon name="directions_run" fill="white" size={36} />.
      </Heading>
      <Modules>
        <Module
          icon="forum"
          heading="Online community"
          body="Join our Slack and meet thousands of other club leaders and members."
        />
        <Module
          icon="chrome_reader_mode"
          heading="Curriculum"
          body="Give your members dozens of tutorials for making websites, apps, and games."
        />
        <Module
          icon="voice_chat"
          heading="Mentorship"
          body="Talk to our team for guidance and assistance whenever you need help."
        />
        <Module
          icon="description"
          heading="Structure & guidelines"
          body="Learn from hundreds of other clubs—we’ve got advice, docs, and experience."
        />
        <Module
          icon="local_activity"
          heading="Local events"
          body="Attend hackathons, workshops, and other events from Hack Clubs nearby."
        />
        <Module
          icon="wallpaper"
          heading="Marketing"
          body="Get stickers, posters, and ideas for spreading the word about your club."
        />
      </Modules>
    </Two>
    <Footer />
  </Provider>
)
