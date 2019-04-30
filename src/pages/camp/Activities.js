import React from 'react'
import styled from 'styled-components'
import {
  BackgroundImage,
  Box,
  Flex,
  Container,
  Text
} from '@hackclub/design-system'
import { Link } from 'gatsby'
import { Section, SectionTitle, Cols, theme } from './style'
import { Headline, Subhline, Featline, Title, Lead } from 'components/Content'
import Photo from 'components/Photo'
import Schedule from './Schedule'

const FullBleed = styled(BackgroundImage)`
  position: relative;
  width: 100%;
  min-height: 24rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.75);
`
const FullBleedCaption = styled(Flex).attrs({
  fontSize: 1,
  py: 1,
  px: 3,
  m: [3, 4],
  align: 'center',
  color: 'dark'
})`
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: ${theme.pill};
  background: rgba(255, 255, 255, 0.875);
  text-shadow: none;
  line-height: 1.75;
  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    background: rgba(255, 255, 255, 0.75) !important;
    -webkit-backdrop-filter: saturate(180%) blur(2px);
  }
  ${theme.mediaQueries.reduceTransparency} {
    background: ${theme.colors.muted} !important;
  }
`

const Gallery = styled(Container).attrs({ maxWidth: 84, px: [3, 4] })`
  display: grid;
  grid-gap: ${theme.space[3]}px;
  ${theme.mediaQueries.md} {
    grid-template-columns: repeat(8, 1fr);
    > div {
      grid-column: span 4;
      min-height: 32rem;
      &[data-vertical] {
        grid-column: span 2;
      }
    }
  }
`

export default () => (
  <Section bg="darker">
    <Container maxWidth={61.25} px={3}>
      <SectionTitle>Activities</SectionTitle>
      <Headline mb={4}>Schedule</Headline>
      <Schedule
        events={[
          { start: '7:30am', color: 'white', name: 'Wake up' },
          {
            start: '8:30am',
            length: 0.5,
            color: 'yellow',
            name: 'Travel to HQ'
          },
          { start: '9:00am', color: 'teal', name: 'Breakfast at HQ' },
          { start: '10:00am', length: 2, name: 'Hacker Workshop' },
          { start: '12:00pm', length: 0.5, name: 'Project Demos' },
          { start: '12:30pm', color: 'teal', name: 'Lunch' },
          { start: '1:30pm', length: 1, name: 'Speaker' },
          { start: '2:30pm', length: 2, name: 'Challenge' },
          {
            start: '5:00pm',
            length: 0.5,
            color: 'yellow',
            name: 'Travel to Home Base'
          },
          { start: '5:30pm', length: 1.5, color: 'teal', name: 'Cooking' },
          { start: '7:00pm', color: 'teal', name: 'Dinner' },
          { start: '8:00pm', length: 0.5, color: 'yellow', name: 'Cleanup' },
          { start: '9:00pm', color: 'white', name: 'Free Time' },
          { start: '11:00pm', length: 0.5, color: 'white', name: 'Bedtime' }
        ]}
      />
      <Cols mt={[5, 6]}>
        <div>
          <Featline>Coding? Just a starting point.</Featline>
          <Lead color="muted">
            Hack Camp is so much more than just “learn to code.” You’ll build a
            radio with a pencil, go on field trips, design games. There’s
            something for everyone.
          </Lead>
        </div>
        <div>
          <Featline>Better every day. Literally.</Featline>
          <Lead color="muted">
            To end each day, we’ll ask for honest feedback on all activities.
            We’ll update the next day’s program accordingly—so&nbsp;Camp
            continually improves.
          </Lead>
        </div>
      </Cols>
    </Container>
    <Container align="center" maxWidth={48} px={3}>
      <Headline color="white" mt={[6, 7]} mb={2}>
        Welcome to Hack Club HQ.
      </Headline>
      <Lead color="muted">
        We’re{' '}
        <Link style={{ color: theme.colors.red }} to="/">
          Hack Club
        </Link>
        , a global nonprofit network of high school hackers with coding clubs at
        2% of US high schools. We’re&nbsp;running Hack&nbsp;Camp right at our
        office in San Francisco (576 Natoma St) so we can X, Y, Z. Here’s the
        space.
      </Lead>
    </Container>
    <Gallery my={5}>
      <Photo
        src="/camp/street.jpg"
        alt="Natoma St, HQ on the left"
        dark
        data-vertical
      />
      <Photo
        src="/camp/neighborhood.jpg"
        alt="Neighborhood, two blocks from HQ"
        dark
      />
      <Photo
        src="/camp/classroom.jpg"
        alt="HQ’s classroom space"
        dark
        data-vertical
      />
      <Photo src="/camp/conference.jpg" alt="HQ’s conference room" dark />
      <Photo src="/camp/library.jpg" alt="HQ’s library" dark />
    </Gallery>
  </Section>
)
