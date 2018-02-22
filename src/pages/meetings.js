import React, { Fragment } from 'react'
import {
  Heading,
  Container,
  Flex,
  Box,
  Text,
  LargeButton,
  Icon,
  Section,
  mediaQueries,
  cx
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Nav from 'components/Nav'
import Start from 'components/Start'
import Footer from 'components/Footer'

const Header = Section.withComponent('header').extend`
  padding-top: 0 !important;
  background-color: ${props => props.theme.colors.teal[6]};
  background-image: linear-gradient(
    -32deg,
    ${props => props.theme.colors.green[7]} 0%,
    ${props => props.theme.colors.teal[6]} 50%,
    ${props => props.theme.colors.teal[7]} 100%
  );
  clip-path: polygon(0% 0%, 100% 0, 100% 100%, 0% 90%);

  h1 {
    line-height: 1.125;
    max-width: 48rem;
  }
  h2 {
    max-width: 36rem;
  }
`

const Module = Flex.extend.attrs({
  w: [1, 1 / 2],
  p: 4,
  pl: [0, 4],
  pb: [0, 4],
  alignItems: ['flex-start', 'center']
})`
  max-width: 32rem;
  text-align: left;

  ${mediaQueries[1]} {
    &:nth-of-type(1), &:nth-of-type(3) {
      transform: translateY(4rem);
    }
  }

  svg {
    width: 4rem !important;
    height: 4rem !important;
    flex-shrink: 0;
    ${mediaQueries[1]} {
      &:first-child { margin-right: 3rem; }
      &:last-child { margin-left: 2rem; }
    }
    /* this is terrible */
    @media screen and (max-width:32em) {
      order: -1 !important;
      margin-left: 0;
      margin-right: 1rem;
    }
  }
`

const ModuleHeading = Heading.h3.extend.attrs({
  mt: 0,
  mb: 1,
  f: [3, 4],
  bold: true
})`
  color: ${props => props.theme.colors.black};
  position: relative;
  ${mediaQueries[1]} {
    &:before {
      content: "";
      width: 8px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: -1.5rem;
      background-color: ${props => cx(props.color)};
    }
  }
`
const ModuleBody = Text.extend.attrs({ my: 0, f: 3, color: 'slate' })`
  line-height: 1.5;
`

const ModuleFigure = Box.withComponent('figure').extend.attrs({
  bg: 'fuschia.0',
  mr: [4, 5],
  ml: 3
})`
  width: 6rem;
  height: 6rem;
  border-radius: 2rem;
  flex-shrink: 0;
`

LargeButton.link = LargeButton.withComponent(Link)

const title = 'Hack Club Meetings'
const description =
  'Learn about meetings at Hack Clubs, high school programming clubs at schools around the world. ' +
  'Get coding club activities and programming curriculum to start a high school computer science club.'

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
        { property: 'og:url', content: 'https://hackclub.com/meetings' }
      ]}
    />
    <Header color="white" pb={4}>
      <Nav />
      <Heading.h1 align="center" f={[5, 6]} mx="auto" mt={4} mb={3}>
        At Hack Club meetings,<br />
        everyone is making.
      </Heading.h1>
      <Heading f={[3, 4]} mx="auto" align="center" bold={false} regular>
        Clubs meet weekly at high schools,
        <br />
        all run by their student leaders.
      </Heading>
    </Header>
    <Flex
      wrap
      justify="space-around"
      p={2}
      pb={[5, 6]}
      mx="auto"
      style={{ position: 'relative', maxWidth: '64rem' }}
    >
      <Module>
        <Box>
          <ModuleHeading color="blue.5">Get hacking!</ModuleHeading>
          <ModuleBody>
            Unlike a traditional coding class, everyone works on their own
            project at their own pace.
          </ModuleBody>
        </Box>
        <Icon name="memory" color="blue.4" />
      </Module>
      <Module>
        <Box>
          <ModuleHeading color="yellow.5">
            You can feel the energy.
          </ModuleHeading>
          <ModuleBody>
            Meetings run like mini-hackathons: members are coming up with
            creative projects to showcase.
          </ModuleBody>
        </Box>
        <Icon name="flash_on" color="yellow.4" />
      </Module>
      <Module>
        <Icon name="gesture" color="teal.5" />
        <Box>
          <ModuleHeading color="teal.6">
            No experience required.
            <br />
            Maybe even encouraged.
          </ModuleHeading>
          <ModuleBody>
            You’re not behind if you’re new to coding—everyone is learning along
            the way.
          </ModuleBody>
        </Box>
      </Module>
      <Module>
        <Icon name="screen_share" color="indigo.4" />
        <Box>
          <ModuleHeading color="indigo.5">Demo time!</ModuleHeading>
          <ModuleBody>
            At the end of a meeting, everyone presents what they’ve made in
            front of the group.
          </ModuleBody>
        </Box>
      </Module>
    </Flex>
    <Start />
    <Footer />
  </Fragment>
)
