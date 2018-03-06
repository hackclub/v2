import React from 'react'
import {
  Box,
  Heading,
  Container,
  Card,
  Text,
  Flex,
  Module,
  Button,
  LargeButton,
  mediaQueries,
  cx
} from '@hackclub/design-system'
import Link from 'gatsby-link'
import Stat from 'components/Stat'
import { stats } from 'data.json'

const Grid = Box.extend`
  width: 100%;

  > div,
  > img {
    width: 100%;
    box-shadow: ${props => props.theme.boxShadows[3]};
    border-radius: ${props => props.theme.radius};
    max-width: 100%;
    margin-top: ${props => props.theme.space[2]}px;
    margin-bottom: ${props => props.theme.space[2]}px;
  }

  ${props => props.theme.mediaQueries.md} {
    column-count: 2;
    column-gap: ${props => props.theme.space[4]}px;
    max-height: 56rem;
    > div,
    > img {
      margin-top: ${props => props.theme.space[3]}px;
      margin-bottom: ${props => props.theme.space[3]}px;
    }
  }
`

const Super = Box.extend`
  background: ${props => props.theme.colors.warning} url(/diagonal.svg) top
    center repeat-x;
  background-size: auto 100%;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(/diagonal.svg) top right repeat-x;
    background-size: auto 100%;
    background-position-x: 32%;
  }

  > * {
    position: relative;
  }
`

const Modules = Box.extend`
  display: grid;
  grid-gap: ${props => props.theme.space[3]}px;
  ${props => props.theme.mediaQueries.md} {
    grid-template-columns: repeat(2, 1fr);
  }
  div {
    align-items: flex-start;
    padding: 0;
    text-align: left;
    width: 100% !important;
  }
`

const Stats = Box.extend`
  column-count: 2;
  div {
    text-align: left;
  }
`

const Image = Box.withComponent('img')

Button.link = Button.withComponent(Link)
LargeButton.link = LargeButton.withComponent(Link)

export default () => (
  <Container w={1} px={[3]} mt={[4, 5]}>
    <Container maxWidth={48} mx={0}>
      <Heading.h2 f={[4, 5]} mb={3} bold>
        Join the largest community of students building the class they wish they
        could take.
      </Heading.h2>
      <Text f={[3, 4]}>
        A Hack Club is a high school club. Every week, you and around 20 other
        students come together to build. Meetings are buzzing: people working on
        projects, learning is self-guided through workshops, leaders are
        constantly mentoring. Your members start with no experience.
      </Text>
    </Container>
    <Grid mt={3} color="white">
      <Box bg="primary" p={[3, 4]}>
        <Heading.h2 f={4} my={0} caps>
          Ready to get started?
        </Heading.h2>
        <Text f={3} my={3}>
          You, a student who knows how to code, get 1-2 others to start a Hack
          Club. You apply, we accept you, you use our resouces to start your
          club at your high school.
        </Text>
        <LargeButton.link to="/start" inverted>
          Start your Club
        </LargeButton.link>
      </Box>
      <Image src="/about_talking.jpg" />
      <Image src="/about_hacking.jpg" />
      <Box bg="info" p={[3, 4]}>
        <Heading.h2 f={4} my={0} caps>
          Start with a club in a box.
        </Heading.h2>
        <Modules my={3} w={1}>
          <Module
            icon="forum"
            heading="Online community"
            body="Talk to thousands of club leaders/members on Slack."
          />
          <Module
            icon="chrome_reader_mode"
            heading="Curriculum"
            body="Dozens of tutorials for your members to make projects."
          />
          <Module
            icon="voice_chat"
            heading="Mentorship"
            body="Talk to our team online for guidance anytime."
          />
          <Module
            icon="wallpaper"
            heading="Marketing"
            body="Get materials and ideas for spreading your club."
          />
        </Modules>
      </Box>
    </Grid>
    <Container maxWidth={48} mx={0} mt={[5, null, -5]} mb={4}>
      <Heading.h2 f={[4, 5]} mb={3} bold>
        We think people learn best when they take control of their own
        education.
      </Heading.h2>
      <Text f={[3, 4]}>
        A Hack Club is a high school club. Every week, you and around 20 other
        students come together to build. Meetings are buzzing: people working on
        projects, learning is self-guided through workshops, leaders are
        constantly mentoring. Your members start with no experience.
      </Text>
    </Container>
    <Grid pb={[5, 2]} color="white">
      <Super p={[3, 4]}>
        <Heading.h2 f={4} my={0} caps>
          Coding is a superpower.
        </Heading.h2>
        <Text f={3} my={3}>
          Learning to code is uniquely empowering: you go from a consumer to a
          creator. The goal of Hack Club is to help you become that hacker. We
          want a space at every high school where people are making interesting
          things with code, every week.
        </Text>
        <Button.link to="/philosophy" bg="warning" inverted>
          Our philosophy
        </Button.link>
      </Super>
      <Image src="/about_working.jpg" />
      <Image src="/about_group.jpg" />
      <Box bg="accent" p={[3, 4]}>
        <Heading.h2 f={4} my={0} caps>
          Be part of a movement.
        </Heading.h2>
        <Stats mt={2} mb={3}>
          <Stat f={7} value={stats.school_count} label="schools" />
          <Stat f={7} value={stats.country_count} label="countries" />
          <Stat f={7} value={stats.state_count} label="states" />
          <Stat f={7} value={stats.approximate_members} label="members" />
        </Stats>
        <Button href="/donate" bg="accent" inverted>
          Donate
        </Button>
      </Box>
    </Grid>
  </Container>
)
