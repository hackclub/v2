import React, { Fragment } from 'react'
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
import theme, { colors, cx, mx, mm } from '../theme'
import { Head, Link } from 'react-static'
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
  text-align: center;
  h2 img { display: inline-block; }
`
const One = Section.extend`
  padding-top: 0 !important;
  background-color: ${cx('red.5')};
  background-image: linear-gradient(
    16deg,
    ${cx('orange.4')} 0%,
    ${cx('red.5')} 50%,
    ${cx('red.6')} 100%
  );
`
const Two = Section.extend`
  background-color: ${cx('blue.6')};
  background-image: linear-gradient(
    16deg,
    ${cx('blue.6')} 0%,
    ${cx('blue.5')} 50%,
    ${cx('indigo.4')} 100%
  );
`
const Three = Section.extend`
  background-color: ${cx('fuschia.5')};
  background-image: linear-gradient(
    -32deg,
    ${cx('fuschia.5')} 0%,
    ${cx('fuschia.6')} 50%,
    ${cx('pink.4')} 100%
  );
`
const Four = Section.extend`
  background-color: ${cx('violet.6')};
  background-image: linear-gradient(
    48deg,
    ${cx('violet.5')} 0%,
    ${cx('violet.6')} 50%,
    ${cx('indigo.4')} 100%
  );
`

const Modules = Flex.extend.attrs({
  wrap: true,
  justify: 'center',
  mt: 3
})`
  ${mm[1]} {
    text-align: left;
  }
`

const ModuleBase = Flex.extend.attrs({
  w: [1, 1 / 3],
  p: 2,
  direction: ['row', 'column'],
  align: ['flex-start', 'center']
})`
  img {
    width: 3rem !important;
    height: 3rem !important;
    flex-shrink: 0;
    margin-right: 1rem;
  }

  ${mx[1]} {
    max-width: 20rem;
    img { margin-right: 0; }
  }
`

const ModuleHeading = Subhead.extend.attrs({ mt: 0, mb: 1, f: 3 })``
const ModuleBody = Text.extend.attrs({ my: 0, f: 2 })`
  line-height: 1.5;
  position: relative;
`

const Module = ({ icon, heading, body, ...props }) => (
  <ModuleBase>
    <Icon name={icon} fill="white" />
    <div>
      <ModuleHeading children={heading} />
      <ModuleBody children={body} />
    </div>
  </ModuleBase>
)

const LeftCol = Flex.extend.attrs({
  direction: 'column',
  align: ['center', 'flex-end'],
  mr: [0, 4]
})`
  ${mx[1]} { text-align: right; }
`

const MeetingsLink = Box.extend.attrs({
  bg: 'white',
  color: 'fuschia.5',
  f: 4,
  px: 4,
  py: 3,
  my: 3
})`
  border-radius: 4rem;
  font-weight: bold;
  line-height: 1;
  text-decoration: none;
  text-transform: uppercase;
`

const CardBase = Container.extend.attrs({ bg: 'fuschia.0', p: 3, mt: 3 })`
  border-radius: .25rem;
  box-shadow: 0 2px 16px 2px rgba(0,0,0,.1);
  max-width: 28rem;
  text-align: left;

  ${mx[1]} { transform: rotate(2deg); }

  p {
    color: ${cx('slate')};
    font-size: 1rem;
    line-height: 1.375;
    margin-top: .5rem;
  }
`
const Card = ({ name, children, ...props }) => (
  <CardBase {...props}>
    <Subhead color="fuschia.5" m={0} f={3} children={name} />
    {children}
  </CardBase>
)

const CTASection = Box.extend.attrs({ is: 'section', px: 3, mt: 4, mb: 2 })`
  a {
    font-size: 1.5rem;
    ${mx[1]} { font-size: 1.75rem; }
  }
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
          body="Learn from hundreds of other clubs—we’ve got info, advice, and experience."
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
    <Three>
      <Flex direction={['column', 'row']} align="center">
        <LeftCol>
          <Heading f={[4, 5]}>Hack Clubs are student-led.</Heading>
          <Text f={[3, 4]}>
            Each club meets weekly after school<br />at their high school.
          </Text>
          <MeetingsLink is={Link} to="/meetings" mt={4}>
            Explore<br />meetings →
          </MeetingsLink>
        </LeftCol>
        <Card name="Are you a teacher or parent?">
          <Text>
            We hate to say it, but we’re currently only accepting applications
            from students.
          </Text>
          <Text>
            Teachers and parents can help by recruiting students, sharing Hack
            Club with the local PTA, and expressing interest in Hack Club to
            school administration.
          </Text>
          <Text>
            That said, shoot us an email at{' '}
            <A color="primary" href="mailto:contact@hackclub.com">
              contact@hackclub.com
            </A>{' '}
            and we’d really love to help where we can.
          </Text>
        </Card>
      </Flex>
    </Three>
    <Four>
      <Heading f={[4, 5]}>It’s time to submit your application.</Heading>
      <Modules>
        <Module
          icon="assignment"
          heading="Submit your application"
          body="Fill out your contact info and a few questions to get going."
        />
        <Module
          icon="ring_volume"
          heading="Training call"
          body="We’ll start getting to know you and making a plan for your club."
        />
        <Module
          icon="event_available"
          heading="Lead your club!"
          body="Schedule your first meeting, start marketing, and get ready!"
        />
      </Modules>
      <CTASection>
        <CTA to="/apply" bg="white" color="primary">
          Apply to Hack Club
        </CTA>
      </CTASection>
    </Four>
    <Footer />
  </Provider>
)
