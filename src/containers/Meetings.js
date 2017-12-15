import React from 'react'
import {
  Provider,
  Banner,
  Heading,
  Lead,
  Container,
  Flex,
  Box,
  Text,
  Subhead,
  Absolute,
  Link as A
} from 'rebass'
import theme, { colors, cx, mx, mm } from '../theme'
import { Head } from 'react-static'
import Nav from '../components/Nav'
import Icon from '../components/Icon'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

const Header = Flex.extend.attrs({
  is: 'header',
  align: 'center',
  justify: 'center',
  direction: 'column',
  bg: 'primary',
  px: 3,
  pb: [4, 5]
})`
  background-image: linear-gradient(-16deg, ${cx('orange.4')} 0%, ${cx(
  'red.5'
)} 50%, ${cx('red.6')} 100%);
`

const Headline = Heading.extend.attrs({
  is: 'h1',
  color: 'white',
  f: [4, 5, 6],
  mx: 'auto',
  mt: 4,
  mb: 3
})`
  text-transform: uppercase;
  line-height: 1.25;
  text-align: center;
  max-width: 48rem;
`

const Info = Heading.extend.attrs({
  color: 'white',
  f: [3, 4],
  mx: 'auto'
})`
  font-weight: 400;
  text-align: center;
  max-width: 36rem;
`

const Section = Container.extend.attrs({
  is: 'section',
  p: 3,
  pb: [3, 5]
})`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  position: relative;
`

const CTASection = Box.extend.attrs({
  is: 'section',
  px: 3,
  mb: [3, 5]
})`
  text-align: center;
`

const Module = Flex.extend.attrs({
  w: [1, 1 / 2],
  p: 4,
  pb: [0, 4],
  align: 'center'
})`
  max-width: 32rem;
  text-align: left;

  ${mx[1]} {
    &:nth-of-type(1), &:nth-of-type(3) {
      transform: translateY(4rem);
    }
  }

  /* this is terrible */
  ${mm[1]} {
    &:nth-of-type(1), &:nth-of-type(2) {
      padding-right: 0;
    }
    &:nth-of-type(3), &:nth-of-type(4) {
      padding-left: 0;
    }
  }

  img {
    width: 4rem !important;
    height: 4rem !important;
    flex-shrink: 0;
    &:first-child { margin-right: 2rem; }
    &:last-child { margin-left: 1rem; }
    ${mx[1]} {
      &:first-child { margin-right: 3rem; }
      &:last-child { margin-left: 2rem; }
    }
  }
`

const ModuleHeading = Subhead.extend.attrs({
  mt: 0,
  mb: 1,
  f: [3, 4]
})`
  color: ${colors.black};
  position: relative;
  &:before {
    content: "";
    width: 8px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -1.5rem;
    background-color: ${props => cx(props.color)};
  }
`
const ModuleBody = Text.extend.attrs({ my: 0, f: 3, color: 'slate' })`
  line-height: 1.5;
`

const ModuleFigure = Box.extend.attrs({
  is: 'figure',
  bg: cx('fuschia.0'),
  mr: [4, 5],
  ml: 3
})`
  width: 6rem;
  height: 6rem;
  border-radius: 2rem;
  flex-shrink: 0;
`

export default () => (
  <Provider theme={theme}>
    <Head>
      <title>Meetings – Hack Club</title>
    </Head>
    <Header>
      <Nav />
      <Headline>
        At Hack Club meetings,<br />
        everyone is making.
      </Headline>
      <Info>
        Clubs meet weekly at high schools.
        <br />
        run by their student leaders.
      </Info>
    </Header>
    <Section>
      <Module>
        <Box>
          <ModuleHeading color="blue.5">Get hacking!</ModuleHeading>
          <ModuleBody>
            Unlike a traditional coding class, everyone works on their own
            project at their own pace.
          </ModuleBody>
        </Box>
        <Icon name="memory" fill="blue.4" />
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
        <Icon name="flash_on" fill="yellow.4" />
      </Module>
      <Module>
        <Icon name="gesture" fill="teal.4" />
        <Box>
          <ModuleHeading color="teal.5">
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
        <Icon name="screen_share" fill="violet.4" />
        <Box>
          <ModuleHeading color="violet.5">Demo time!</ModuleHeading>
          <ModuleBody>
            At the end of a meeting, everyone presents what they’ve made in
            front of the group.
          </ModuleBody>
        </Box>
      </Module>
    </Section>
    <CTASection>
      <CTA href="/start">Start a Club</CTA>
    </CTASection>
    <Footer />
  </Provider>
)
