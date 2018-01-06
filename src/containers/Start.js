import React, { Fragment } from 'react'
import {
  ThemeProvider,
  Heading,
  Container,
  Flex,
  Box,
  Text,
  Button,
  LargeButton,
  Section as S,
  Link as A,
  Module,
  mediaQueries,
  cx
} from '@hackclub/design-system'
import { Head, Link } from 'react-static'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

/* will be fixed in next DS release */
const Section = S.extend`
  flex-direction: column;
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
  background-color: ${cx('violet.6')};
  background-image: linear-gradient(
    48deg,
    ${cx('violet.5')} 0%,
    ${cx('violet.6')} 50%,
    ${cx('indigo.4')} 100%
  );
`
const Three = Section.extend`
  background-color: ${cx('blue.6')};
  background-image: linear-gradient(
    -48deg,
    ${cx('blue.7')} 0%,
    ${cx('blue.6')} 50%,
    ${cx('indigo.4')} 100%
  );
`
const Four = Section.extend`
  background-color: ${cx('green.6')};
  background-image: linear-gradient(
    -32deg,
    ${cx('teal.7')} 0%,
    ${cx('lime.6')} 100%
  );
`

const Modules = Flex.extend.attrs({
  wrap: true,
  justify: 'center',
  mt: 3
})`
  max-width: 64rem;
`

const CardBase = Container.extend.attrs({ bg: 'blue.0', p: 3, mt: 3 })`
  border-radius: .25rem;
  box-shadow: 0 2px 16px 2px rgba(0,0,0,.1);
  max-width: 28rem;
  text-align: left;

  ${mediaQueries[1]} { transform: rotate(2deg); }

  p {
    color: ${cx('slate')};
    font-size: 1rem;
    line-height: 1.375;
    margin-top: .5rem;
  }
`
const Card = ({ name, children, ...props }) => (
  <CardBase {...props}>
    <Heading.h3 color="blue.6" m={0} f={3} children={name} />
    {children}
  </CardBase>
)

Button.link = Button.withComponent(Link)
LargeButton.link = LargeButton.withComponent(Link)

export default () => (
  <ThemeProvider>
    <Head>
      <title>Start – Hack Club</title>
    </Head>
    <One>
      <Nav />
      <Heading.h1 f={[5, 6]} mt={[4, 5]}>
        Let’s get your Hack Club started.
      </Heading.h1>
      <Heading.h2 f={[3, 4]} my={2} style={{ fontWeight: 'normal' }}>
        The awesome coding club at your high school is coming soon.
      </Heading.h2>
    </One>
    <Two>
      <Heading.h2 f={[4, 5]}>Students: apply and start your club!</Heading.h2>
      <Modules>
        <Module
          icon="assignment"
          heading="Submit your application"
          body="Fill out a few questions to get going—totally free."
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
      <Box p={3} pb={0} align="center">
        <LargeButton.link to="/apply" inverted>
          Apply to Hack Club
        </LargeButton.link>
      </Box>
    </Two>
    <Three>
      <Flex flexDirection={['column', 'row']} align="center">
        <Container maxWidth={28} align={['center', 'right']} mr={[0, 4]}>
          <Heading.h2 f={[4, 5]}>Hack Clubs are student-led.</Heading.h2>
          <Text f={[3, 4]} my={1}>
            Each club meets weekly after school at their high school.
          </Text>
          <Button.link bg="info" my={3} inverted to="/meetings" mt={4}>
            See what clubs look like »
          </Button.link>
        </Container>
        <Card name="Are you a teacher or parent?">
          <Text m={0}>
            We hate to say it, but we’re currently only accepting applications
            from students.
          </Text>
          <Text m={0}>
            Teachers and parents can help by recruiting students, sharing Hack
            Club with the local PTA, and expressing interest in Hack Club to
            school administration.
          </Text>
          <Text m={0}>
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
      <Heading.h2 f={[4, 5]}>
        HQ provides the resources you’ll need to soar.
      </Heading.h2>
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
      <Box align="center" mt={4}>
        <LargeButton.link to="/apply" inverted f={[3, 4]}>
          Apply to Hack Club
        </LargeButton.link>
      </Box>
    </Four>
    <Footer />
  </ThemeProvider>
)
