import React from 'react'
import styled from 'styled-components'
import {
  Box,
  Container,
  Heading,
  BackgroundImage,
  Flex,
  Avatar,
  Icon,
  Text,
  theme
} from '@hackclub/design-system'
import Carousel from 'nuka-carousel'
import { Headline, Subhline, Lead } from 'components/Content'
import { Fade } from 'react-reveal'
import Sheet from 'components/Sheet'
import Stat from 'components/Stat'
import kebabCase from 'lodash/kebabCase'
import { backgroundImages } from 'polished'

const events = [
  {
    name: 'Los Altos Hacks',
    location: 'Sunnyvale, CA',
    organizer: 'Jamsheed Mistri',
    budget: 30,
    attendees: 350,
    testimonial:
      'Hack Club Bank has made it incredibly easy to handle our event’s funds and has provided countless tools to increase our productivity. With Bank, I can focus on making the event the best it can be.'
  },
  {
    name: 'Hack Pennsylvania',
    location: 'State College, PA',
    organizer: 'Joy Liu',
    budget: 15,
    attendees: 115,
    testimonial:
      'I’d never have started organizing hackathons without Hack Club Bank. It solves a critical issue for my team.'
  },
  {
    name: 'SLO Hacks',
    location: 'San Luis Obispo, CA',
    organizer: 'Selynna Sun',
    budget: 50,
    attendees: 300,
    testimonial:
      'Hack Club Bank significantly improved the fiscal sponsorship process for SLO Hacks, through a beautifully-designed platform full of useful features, in addition to a responsive team that made sure our questions were addressed as quickly as possible.'
  }
]

const Base = styled(Box.section).attrs({
  bg: 'darker',
  pt: [5, 6, 7],
  pb: [4, 5, 6]
})``

const Main = styled(Sheet).attrs({
  bg: '#252429',
  color: 'smoke',
  p: 0,
  mt: 2
})`
  border-radius: 0;
  position: relative;
  overflow: hidden;
  ${theme.mediaQueries.md} {
    border-radius: ${theme.radii[2]};
  }
`

const SideControl = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  cursor: pointer;
  display: none;
  ${theme.mediaQueries.md} {
    display: block;
  }
`

const Photo = styled(BackgroundImage)`
  min-height: 20rem;
  border-radius: ${theme.radii[2]};
`

const Details = styled(Box).attrs({ mt: [2, 0], px: [3, 4], pb: [4, 5] })`
  ${theme.mediaQueries.md} {
    display: grid;
    grid-template-columns: 128px 1fr;
    grid-gap: ${theme.space[5]}px;
    align-items: start;
  }
`
const Quote = styled(Text).attrs({ fontSize: [3, 4], color: 'muted' })`
  text-indent: -0.375em;
`
const Stats = styled(Flex).attrs({ wrap: true, justify: 'start' })`
  p {
    color: ${theme.colors.muted};
  }
`
Stats.Item = props => (
  <Stat align={['left', 'right']} mt={0} mb={3} {...props} />
)

const Event = ({
  img,
  name,
  location,
  budget,
  attendees,
  organizer,
  testimonial
}) => [
  <Photo key={img} src={img} />,
  <Box
    px={[3, 4]}
    mt={[3, 4]}
    pl={[null, null, 128 + theme.space[5] + theme.space[4]]}
    key={name}
  >
    <Text fontSize={[4, 5]} bold color="white" children={name} />
  </Box>,
  <Details key={organizer}>
    <Stats>
      <Stats.Item value={attendees} label="attendees" />
      <Stats.Item value={`$${budget}k`} label="budget" />
    </Stats>
    <Box>
      <Quote>“{testimonial}”</Quote>
      <Flex align="center" mt={3}>
        <Avatar
          src={require(`../../../static/hackers/${organizer
            .split(' ')[0]
            .toLowerCase()}.jpg`)}
          size={48}
          mr={2}
        />
        <Text color="white">
          <strong>{organizer}</strong>, Lead Organizer
        </Text>
      </Flex>
    </Box>
  </Details>
]

export default () => (
  <Base>
    <Container align="center" maxWidth={36} mb={[4, 5]} px={3}>
      <Subhline color="white">
        The best events across the country run on Bank.
      </Subhline>
      <Lead color="muted">
        From Philadelphia to Phoenix to Portland, Hack Club Bank is powering
        high school hackathons of all sizes.
      </Lead>
    </Container>
    <Main maxWidth={60}>
      <Carousel
        autoplay
        autoplayInterval={5000}
        wrapAround
        enableKeyboardControls
        renderCenterLeftControls={({ previousSlide }) => (
          <SideControl onClick={previousSlide}>
            <Icon glyph="view-back" color="white" size={48} />
          </SideControl>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <SideControl onClick={nextSlide}>
            <Icon glyph="view-forward" color="white" size={48} />
          </SideControl>
        )}
      >
        {events.map(event => {
          const id = kebabCase(event.name)
          return <Event {...event} img={`/bank/events/${id}.jpg`} key={id} />
        })}
      </Carousel>
    </Main>
  </Base>
)
