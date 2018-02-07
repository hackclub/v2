import React, { Fragment } from 'react'
import {
  ThemeProvider,
  Heading,
  Card,
  Container,
  Flex,
  Box,
  Text,
  Button,
  LargeButton,
  Section,
  Link as A,
  Module,
  mediaQueries,
  cx
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Nav from 'components/Nav'
import Footer from 'components/Footer'

const One = Section.extend`
  padding-top: 0 !important;
  position: relative;
  background-color: ${props => props.theme.colors.green[6]};
  background-image: linear-gradient(
    24deg,
    ${props => props.theme.colors.green[6]} 0%,
    ${props => props.theme.colors.lime[6]} 100%
  );
`
const Two = Section.extend`
  background-color: ${props => props.theme.colors.blue[6]};
  background-image: linear-gradient(
    32deg,
    ${props => props.theme.colors.indigo[5]} 0%,
    ${props => props.theme.colors.cyan[6]} 100%
  );
`
const Three = Section.extend`
  background-color: ${props => props.theme.colors.red[5]};
  background-image: linear-gradient(
    -128deg,
    ${props => props.theme.colors.red[6]} 0%,
    ${props => props.theme.colors.red[5]} 50%,
    ${props => props.theme.colors.pink[5]} 100%
  );
`
const Four = Section.extend`
  background-color: ${props => props.theme.colors.violet[6]};
  background-image: linear-gradient(
    16deg,
    ${props => props.theme.colors.violet[5]} 0%,
    ${props => props.theme.colors.violet[6]} 32%,
    ${props => props.theme.colors.indigo[4]} 100%
  );
`

const Modules = Flex.extend.attrs({
  wrap: true,
  justify: 'center',
  mt: 3
})`
  max-width: 64rem;
`

const OthersCard = Card.extend`
  max-width: 28rem;

  ${mediaQueries[1]} {
    transform: rotate(2deg);
  }

  p {
    color: ${props => props.theme.colors.slate};
    font-size: ${props => props.theme.fontSizes[2]};
    line-height: 1.375;
    margin-top: ${props => props.theme.space[3]};
  }
`

Button.link = Button.withComponent(Link)
LargeButton.link = LargeButton.withComponent(Link)

const CTAContainer = Box.extend`
  height: 0;
  text-align: center;
  a {
    position: relative;
    top: -28px;
  }
`

const title = 'Start Your Hack Club'
const description =
  'Learn how to start a coding club at your high school through Hack Club. ' +
  'Get programming club ideas, curriculum, activities, and more.'

export default () => (
  <ThemeProvider>
    <Helmet
      title={title}
      meta={[
        { name: 'twitter:title', content: title },
        { name: 'description', content: description },
        { name: 'twitter:description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: 'https://hackclub.com/start' }
      ]}
    />
    <One>
      <Nav />
      <Heading.h1 f={[5, 6]} mt={[4, 5]}>
        Let’s get your Hack Club started.
      </Heading.h1>
      <Heading.h2 f={[3, 4]} my={2} normal>
        The awesome coding club at your high school is coming soon.
      </Heading.h2>
    </One>
    <CTAContainer>
      <LargeButton.link to="/apply" inverted f={[3, 4]}>
        Apply to Hack Club
      </LargeButton.link>
    </CTAContainer>
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
    </Two>
    <Three>
      <Flex flexDirection={['column', 'row']} align="center">
        <Container maxWidth={28} align={['center', 'right']} mr={[0, 4]}>
          <Heading.h2 f={[4, 5]}>Hack Clubs are student-led.</Heading.h2>
          <Text f={[3, 4]} my={1}>
            Each club meets weekly after school at their high school.
          </Text>
          <Button.link my={3} inverted to="/meetings" mt={4}>
            What’s a club meeting like?
          </Button.link>
        </Container>
        <OthersCard
          bg="red.0"
          p={3}
          mt={3}
          mx="auto"
          boxShadowSize="md"
          align="left"
        >
          <Heading.h3 color="primary" mt={0} mb={2} f={3}>
            Are you a teacher or parent?
          </Heading.h3>
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
        </OthersCard>
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
          Apply + Start Your Club
        </LargeButton.link>
      </Box>
    </Four>
    <Footer />
  </ThemeProvider>
)
