import React from 'react'
import {
  Box,
  Heading,
  Container,
  Text,
  Flex,
  Button,
  BackgroundImage,
  Link as A
} from '@hackclub/design-system'
import Link from 'gatsby-link'
import Module from 'components/Module'
import Stat from 'components/Stat'
import { stats } from 'data.json'

const Grid = Box.extend`
  display: grid;
  grid-gap: ${({ theme }) => theme.space[2]}px;
  width: 100%;

  > div {
    width: 100%;
    box-shadow: ${({ theme }) => theme.boxShadows[3]};
    border-radius: ${({ theme }) => theme.radius};
    max-width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${({ theme }) => theme.space[4]}px;
  }
`

const Super = Box.extend`
  background: ${({ theme }) => theme.colors.warning} url(/diagonal.svg) top
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

const Graph = Box.extend`
  background: ${({ theme }) => theme.colors.accent} url(/graph.svg) no-repeat;
  background-size: 100% 100%;
`

const Modules = Box.extend`
  display: grid;
  grid-gap: ${({ theme }) => theme.space[3]}px;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`

const Stats = Box.extend`
  column-count: 2;
  div {
    text-align: left;
  }
`

const like = {
  underline: true,
  color: 'inherit',
  target: '_blank'
}
A.link = A.withComponent(Link)
const Like = props => <A {...like} {...props} />
const LikeLink = props => <A.link {...like} {...props} />

const Photo = BackgroundImage.extend.attrs({ role: 'img' })`
  overflow: hidden;
  transition: all 0.125s ease-out;
  background-size: auto 100%;
  &:hover {
    background-size: auto 108%;
  }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    background-size: cover !important;
  }
`

const Action = Button.withComponent(Link).extend.attrs({mt: [2, 3]})`
  transition: transform 0.125s ease-out;
  will-change: transform;
  transform: scale(1);
  &:hover,
  &:focus {
    transform: scale(1.06);
  }
  @media (prefers-reduced-motion: reduce) {
    transform: none !important;
  }
`

const ActionLink = Action.withComponent(A)

export default () => (
  <Container w={1} px={[3, 4, null, 2]} mt={[4, 5]}>
    <Box mx={0} mt={5} color="black">
      <Heading.h2 f={[5, 6]} mb={3}>
        Join the largest community of students building the class they wish they
        had.
      </Heading.h2>
      <Container maxWidth={48} mx={0}>
        <Text f={[3, 4]}>
          Hack Clubs are student-led groups dedicated to fostering the{' '}
          <Like href="https://en.wikipedia.org/wiki/Hacker_culture#Ethics_and_principles">
            hacker culture
          </Like>
          {' '}at high schools worldwide. In meetings, students learn to code
          through building real-world projects like websites, apps, and
          games.
        </Text>
      </Container>
    </Box>
    <Grid mt={4} mb={[4, 6]} color="white">
      <Box bg="primary" p={[3, 4]}>
        <Heading.h3 f={4} my={0} caps>
          Beyond club meetings
        </Heading.h3>
        <Text f={3} mt={3}>
          Hack Clubs attend and run hackathons like{' '}
          <Like href="https://hackchicago.io">
            Hack Chicago
          </Like> and{' '}
          <Like href="http://outlooknewspapers.com/hackademia-aims-for-young-tech-devotees/">
            Hackademia
          </Like>. They run summer programs like{' '}
          <Like href="http://thecspn.com/?p=43434">Hack Camp</Like>. They
          compete in competitions like the{' '}
          <Like href="http://www.congressionalappchallenge.us">
            Congressional App Challenge
          </Like>{' '}
          (and <LikeLink to="/challenge">our challenge!</LikeLink>). Hack Clubs are no ordinary clubs.
        </Text>
        <ActionLink href="https://www.sfchronicle.com/bayarea/article/Hack-the-Fog-makes-history-as-San-12729895.php" target="_blank" inverted>
          Read about a Hack Club »
        </ActionLink>
      </Box>
      <Photo src="/about_1.jpg" scale />
      <Photo src="/about_2.jpg" scale />
      <Box bg="info" p={[3, 4]}>
        <Heading.h3 f={4} my={0} caps>
          We help you get started
        </Heading.h3>
        <Modules my={3} w={1}>
          <Module
            icon="forum"
            heading="Online community"
            body="Talk to hundreds of club leaders/members on Slack."
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
    <Box mx={0} mt={5} color="black">
      <Heading.h2 f={[5, 6]} mb={3}>
        We believe people learn best when they take control of their own
        education.
      </Heading.h2>
      <Container maxWidth={48} mx={0}>
        <Text f={[3, 4]}>
          Hack Club is heavily inspired by unschooling. At Hack Club, there are
          no teachers or lectures—members work at their own pace on their own
          projects. Club leaders act as{' '}
          <Like href="https://en.wikipedia.org/wiki/Constructionism_(learning_theory)">
            facilitators
          </Like>
          {' '}and provide guidance through mentoring and building a
          supportive community.
        </Text>
      </Container>
    </Box>
    <Grid my={[4, 5]} color="white" pb={3}>
      <Super p={[3, 4]}>
        <Heading.h3 f={4} my={0} caps>
          Coding is a superpower
        </Heading.h3>
        <Text f={3} my={3}>
          Coding is a superpower and we believe that the way we teach it
          should reflect that. Students should learn through building
          projects, not listening to boring lectures.
        </Text>
        <Action to="/philosophy" bg="warning" inverted>
          Our philosophy »
        </Action>
      </Super>
      <Photo src="/about_3.jpg" scale />
      <Photo src="/about_4.jpg" scale />
      <Graph p={[3, 4]}>
        <Heading.h3 f={4} my={0} caps>
          Grassroots and growing
        </Heading.h3>
        <Stats mb={2}>
          <Stat f={7} value={stats.school_count} label="schools" />
          <Stat f={7} value={stats.country_count} label="countries" />
          <Stat f={7} value={stats.state_count} label="states" />
          <Stat f={7} value={stats.approximate_members} label="members" />
        </Stats>
        <Action to="/team" bg="accent" inverted>
          Our team »
        </Action>
      </Graph>
    </Grid>
  </Container>
)
