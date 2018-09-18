import React from 'react'
import styled from 'styled-components'
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  BackgroundImage,
  Link as A
} from '@hackclub/design-system'
import Link from 'gatsby-link'
import Module from 'components/Module'
import Stat from 'components/Stat'
import Sheet from 'components/Sheet'
import { Featline } from 'components/Content'
import { stats } from 'data.json'

const Grid = styled(Box)`
  display: grid;
  grid-gap: ${({ theme }) => theme.space[3]}px;
  width: 100%;

  > div {
    margin-bottom: 0;
    width: 100%;
    min-height: 16rem;
    max-width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${({ theme }) => theme.space[4]}px;
  }
`

const IntroSheet = styled(Sheet).attrs({ color: 'white' })`
  background: linear-gradient(
    128deg,
    ${({ theme }) => theme.colors.orange[5]},
    ${({ theme }) => theme.colors.red[5]}
  );
`

const ModulesSheet = styled(Sheet).attrs({ color: 'white' })`
  background: linear-gradient(
    32deg,
    ${({ theme }) => theme.colors.indigo[5]},
    ${({ theme }) => theme.colors.blue[5]}
  );
`

const Modules = styled(Box)`
  display: grid;
  grid-gap: ${({ theme }) => theme.space[3]}px;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(2, 1fr);
  }
  svg {
    margin-left: -${({ theme }) => theme.space[1]}px;
  }
`

const Super = styled(Sheet).attrs({ color: 'white' })`
  background: linear-gradient(
    -128deg,
    ${({ theme }) => theme.colors.cyan[6]},
    ${({ theme }) => theme.colors.blue[6]}
  );
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
    background-position-x: 25%;
  }

  > * {
    position: relative;
  }
`

const Graph = styled(Sheet).attrs({ color: 'white' })`
  background: ${({ theme }) => theme.colors.teal[7]} url(/graph.svg) no-repeat;
  background-size: 100% 100%;
`

const Stats = styled(Box)`
  column-count: 2;
  div {
    text-align: left;
  }
  p {
    color: ${({ theme }) => theme.colors.teal[0]};
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

const Photo = styled(BackgroundImage.withComponent(Sheet)).attrs({
  role: 'img',
  scale: true
})``

const action = {
  mt: [2, 3],
  scale: true,
  inverted: true,
  chevronRight: true,
  fontSize: 3
}
const Action = styled(Button.withComponent(Link)).attrs(action)`
  text-transform: uppercase;
`
const ActionLink = styled(Button.withComponent(A)).attrs(action)`
  text-transform: uppercase;
`

export default () => (
  <Container w={1} px={[3, 4, null, 2]} mt={[4, 5]} color="black">
    <Heading.h2 f={[5, 6]} mb={3}>
      Join a nationwide community of students building the class they wish they
      could take.
    </Heading.h2>
    <Container maxWidth={48} mx={0}>
      <Text f={[3, 4]}>
        Hack Clubs are student-led groups dedicated to fostering the{' '}
        <Like href="https://en.wikipedia.org/wiki/Hacker_culture#Ethics_and_principles">
          hacker culture
        </Like>{' '}
        in high schools. In meetings, students learn to code through building
        real-world projects like websites, apps, and games.
      </Text>
    </Container>
    <Grid mt={4} mb={[4, 6]}>
      <IntroSheet>
        <Featline>Go beyond club meetings.</Featline>
        <Text f={3} mt={3}>
          Hack Clubs attend and run hackathons like{' '}
          <Like href="https://hackchicago.io">Hack Chicago</Like> and{' '}
          <Like href="http://outlooknewspapers.com/hackademia-aims-for-young-tech-devotees/">
            Hackademia
          </Like>
          , run summer programs like{' '}
          <Like href="http://thecspn.com/?p=43434">Hack Camp</Like>, and compete
          in competitions like the{' '}
          <Like href="http://www.congressionalappchallenge.us">
            Congressional App Challenge
          </Like>{' '}
          (and <LikeLink to="/challenge">our challenge!</LikeLink>
          ).
        </Text>
        <ActionLink
          href="https://www.sfchronicle.com/bayarea/article/Hack-the-Fog-makes-history-as-San-12729895.php"
          target="_blank"
        >
          Read about a Hack Club
        </ActionLink>
      </IntroSheet>
      <Photo src="/about_1.jpg" scale />
      <Photo src="/about_2.jpg" scale />
      <ModulesSheet>
        <Featline>We help you get started.</Featline>
        <Modules my={3} w={1}>
          <Module
            icon="support"
            name="Online community"
            body="Talk to hundreds of club leaders/members on Slack."
          />
          <Module
            icon="explore"
            name="Curriculum"
            body="Dozens of tutorials for your members to make projects."
          />
          <Module
            icon="message"
            name="Mentorship"
            body="Talk to our team online for guidance anytime."
          />
          <Module
            icon="photo"
            name="Marketing"
            body="Get materials and ideas for spreading your club."
          />
        </Modules>
      </ModulesSheet>
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
          </Like>{' '}
          and provide guidance through mentoring and building a supportive
          community.
        </Text>
      </Container>
    </Box>
    <Grid my={[4, 5]} color="white" pb={3}>
      <Super>
        <Featline>Coding is a superpower.</Featline>
        <Text f={3} my={3}>
          Coding is a superpower and we believe that the way we teach it should
          reflect that. Students should learn through building projects, not
          listening to boring lectures.
        </Text>
        <Action to="/philosophy" bg="info">
          Our philosophy
        </Action>
      </Super>
      <Photo src="/about_3.jpg" scale />
      <Photo src="/about_4.jpg" scale />
      <Graph>
        <Featline>Grassroots & growing.</Featline>
        <Stats mt={3} mb={2}>
          <Stat f={7} value={stats.school_count} label="schools" />
          <Stat f={7} value={stats.country_count} label="countries" />
          <Stat f={7} value={stats.state_count} label="states" />
          <Stat f={7} value={stats.approximate_members} label="members" />
        </Stats>
        <Action to="/hackers" bg="teal.6">
          Our community
        </Action>
      </Graph>
    </Grid>
  </Container>
)
