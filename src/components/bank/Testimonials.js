import React from 'react'
import styled from 'styled-components'
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Image,
  Text,
  theme
} from '@hackclub/design-system'
import { Headline, Subhline, Lead } from 'components/Content'
import Sheet from 'components/Sheet'
import Stat from 'components/Stat'
import kebabCase from 'lodash/kebabCase'
import { Slide } from 'react-reveal'

const events = [
  {
    transparency: 'hackpenn',
    name: 'Hack Pennsylvania',
    location: 'State College, PA',
    organizer: 'Joy Liu',
    budget: 15,
    attendees: 115,
    testimonial:
      'For me, Hack Club Bank unlocked organizing hackathons. Even after as a club leader, raising money seemed insurmountable. Bank directly enabled organizing events in my community with event bank accounts & a supportive community. I couldn’t recommend it more highly.'
  },
  {
    name: 'Teenhacks LI',
    location: 'Long Island, NY',
    organizer: 'Wesley Pergament',
    budget: 35,
    attendees: 300,
    testimonial:
      'For our hackathon, Hack Club Bank has given us the tools to make sure our organization is professional with sponsors. Bank and their team have created an easily manageable resource to make sure any event is run successfully. We would highly recommend any organization be a part of the Hack Club ecosystem.'
  },
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
    name: 'SLO Hacks',
    location: 'San Luis Obispo, CA',
    organizer: 'Selynna Sun',
    budget: 50,
    attendees: 300,
    testimonial:
      'Hack Club Bank significantly improved the fiscal sponsorship process for SLO Hacks, through a beautifully-designed platform full of useful features, in addition to a responsive team addressed our questions as quickly as possible.'
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

const Main = styled(Container).attrs({
  color: 'smoke',
  px: [3, null, 4],
  mt: 2,
  maxWidth: 84
})`
  border-radius: 0;
  position: relative;
  overflow: hidden;
  display: grid;
  grid-gap: ${theme.space[3]}px;
  ${theme.mediaQueries.md} {
    border-radius: ${theme.radii[2]};
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${theme.space[5]}px;
  }
`

const EventHeader = styled(Box).attrs({ mb: [3, 0] })`
  display: grid;
  aside {
    display: flex;
  }
  aside div:last-child {
    margin-left: ${theme.space[3]}px;
  }
  ${theme.mediaQueries.md} {
    grid-template-columns: 1fr auto;
  }
`

const Photo = styled(Image).attrs({ width: 1 })`
  max-height: 20rem;
  object-fit: cover;
  border-radius: ${theme.radii[2]};
`

const Quote = styled(Text).attrs({ fontSize: 2, color: 'muted' })`
  text-indent: -0.375em;
`
const DetailStat = styled(Box.withComponent(Stat)).attrs({
  align: 'left',
  fontSize: 5,
  px: 0,
  mb: 0
})``

const Event = ({
  img,
  name,
  location,
  budget,
  attendees,
  organizer,
  testimonial,
  transparency
}) => (
  <Slide bottom>
    <Sheet bg="#252429" color="smoke" p={0} mb={0}>
      <Photo alt={location} src={img} />
      <Box p={[3, 4]}>
        <EventHeader>
          <Subhline align="left" color="white" children={name} />
          <aside>
            <DetailStat value={attendees} label="attendees" />
            <DetailStat value={`$${budget}k`} label="budget" />
          </aside>
        </EventHeader>
        <Quote>“{testimonial}”</Quote>
        <Flex align="center" mt={3} wrap>
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
          {transparency && (
            <Button
              href={`https://bank.hackclub.com/${transparency}`}
              target="_blank"
              ml={[0, 'auto']}
              mt={[2, 0]}
            >
              See Finances
            </Button>
          )}
        </Flex>
      </Box>
    </Sheet>
  </Slide>
)

export default () => (
  <Base>
    <Container align="center" maxWidth={42} mb={[4, 5]} px={3}>
      <Headline color="white" mb={2}>
        The best events across the country run on Bank.
      </Headline>
      <Lead maxWidth={40} color="muted">
        Everywhere from Philadelphia to Phoenix to Portland,
        Hack&nbsp;Club&nbsp;Bank powers events of all sizes.
      </Lead>
    </Container>
    <Main>
      {events.map(event => {
        const id = kebabCase(event.name)
        return <Event {...event} img={`/bank/events/${id}.jpg`} key={id} />
      })}
    </Main>
  </Base>
)
