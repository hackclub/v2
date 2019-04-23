import React from 'react'
import styled from 'styled-components'
import {
  Box,
  Container,
  BackgroundImage,
  Flex,
  Avatar,
  Icon,
  Text,
  theme
} from '@hackclub/design-system'
import Carousel from 'nuka-carousel'
import { Subhline, Lead } from 'components/Content'
import Sheet from 'components/Sheet'
import Stat from 'components/Stat'
import kebabCase from 'lodash/kebabCase'

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
      'For me, Hack Club Bank unlocked organizing hackathons. Even after as a club leader, raising money seemed insurmountable. Bank directly enabled organizing events in my community with event bank accounts & a supportive community. I couldn’t recommend it more highly.'
  },
  {
    name: 'SLO Hacks',
    location: 'San Luis Obispo, CA',
    organizer: 'Selynna Sun',
    budget: 50,
    attendees: 300,
    testimonial:
      'Hack Club Bank significantly improved the fiscal sponsorship process for SLO Hacks, through a beautifully-designed platform full of useful features, in addition to a responsive team that made sure our questions were addressed as quickly as possible.'
  },
  {
    name: 'MAHacks',
    location: 'Boston, MA',
    organizer: 'Kat Huang',
    budget: 1.5,
    attendees: 70,
    testimonial:
      'Hack Club Bank removed the barriers to starting fundraising for MAHacks. In mere days, vs months of nonprofit paperwork, Bank enabled my team to invoice sponsors professionally and manage our finances on a clear, up-to-date dashboard. I highly recommend using Bank & joining the Hack Club community.'
  },
  {
    name: 'DV Hacks',
    location: 'Santa Clara, CA',
    organizer: 'Khushi Wadhwa',
    budget: 12,
    attendees: 150,
    testimonial:
      'Hack Club Bank is an essential platform for any hackathon organizer! It made us look both professional and credible in front of our sponsors and it relieved us of legal/financial burdens. Hack Club Bank was there for us every step of the way and for a first-year hackathon, that support was priceless.'
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
  ul {
    cursor: grab !important;
  }
`

const SideControl = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  cursor: pointer;
  display: inline-block;
  margin: 0;
  svg {
    transform: scale(1);
    transition: ${theme.transition} all;
  }
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  &:hover,
  &:focus {
    svg {
      transform: scale(1.125);
      fill: ${theme.colors.white};
    }
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
const DetailStats = styled(Flex).attrs({
  flexDirection: ['row', null, 'column'],
  justify: ['start', null, 'end']
})`
  p {
    color: ${theme.colors.muted};
  }
`
DetailStats.Item = props => (
  <Stat
    align={['left', null, 'right']}
    fontSize={6}
    width={1}
    mt={0}
    mb={3}
    px={0}
    {...props}
  />
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
    <Text fontSize={5} bold color="white" children={name} />
  </Box>,
  <Details key={organizer}>
    <DetailStats>
      <DetailStats.Item value={attendees} label="attendees" />
      <DetailStats.Item value={`$${budget}k`} label="budget" />
    </DetailStats>
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
        Everywhere from Philadelphia to Phoenix to Portland,
        Hack&nbsp;Club&nbsp;Bank is powering hackathons of all sizes.
      </Lead>
    </Container>
    <Main maxWidth={60}>
      <Carousel
        autoplay
        autoplayInterval={5000}
        wrapAround
        enableKeyboardControls
        renderCenterLeftControls
        renderCenterRightControls
        renderBottomCenterControls
        renderBottomRightControls={({ previousSlide, nextSlide }) => [
          <SideControl onClick={previousSlide} key="prev">
            <Icon glyph="view-back" color="smoke" size={48} pb={3} />
          </SideControl>,
          <SideControl onClick={nextSlide} key="next">
            <Icon glyph="view-forward" color="smoke" size={48} pb={3} pr={3} />
          </SideControl>
        ]}
      >
        {events.map(event => {
          const id = kebabCase(event.name)
          return <Event {...event} img={`/bank/events/${id}.jpg`} key={id} />
        })}
      </Carousel>
    </Main>
  </Base>
)
