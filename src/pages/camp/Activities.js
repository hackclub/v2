import React from 'react'
import styled from 'styled-components'
import { BackgroundImage, Container, theme } from '@hackclub/design-system'
import { Section, SectionTitle, Cols } from './Content'
import { Headline, Subhline, Featline, Title, Lead } from 'components/Content'
import Photo from 'components/Photo'

const FullBleed = styled(BackgroundImage)`
  // position: absolute;
  width: 100%;
  min-height: 24rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.75);
`

const Gallery = styled(Container).attrs({ maxWidth: 84, px: [3, 4] })`
  display: grid;
  grid-gap: ${theme.space[3]}px;
  grid-template-columns: repeat(8, 1fr);
  > div {
    grid-column: span 4;
    min-height: 32rem;
    &[data-vertical] {
      grid-column: span 2;
    }
  }
`

export default () => (
  <Section>
    <Container maxWidth={61.25} px={3}>
      <SectionTitle>Activities</SectionTitle>
      <Cols cols="1fr 3fr" mt={[4, 5, 6]}>
        <Headline pr={[0, null, 3]}>By leaders, for&nbsp;leaders.</Headline>
        <Lead>
          In the weeks leading up to Camp, we’ll work one-on-one with every
          attendee to prepare a 2-hour workshop about something technical they
          love. They’ll share these at Camp, one every morning—so the main
          “instructional” sessions are all led by leaders.
        </Lead>
      </Cols>
      <Cols cols="1fr 3fr" mt={[4, 5, 6]}>
        <Headline pr={3}>Safety.</Headline>
        <Lead pl={[3, 0]}>
          In the weeks leading up to Camp, we’ll work one-on-one with every
          attendee to prepare a 2-hour workshop about something technical they
          love. They’ll share these at Camp, one every morning—so the main
          “instructional” sessions are all led by leaders, for leaders.
        </Lead>
      </Cols>
    </Container>
    <Container maxWidth={48} px={3}>
      <Lead mb={4} />
    </Container>
    <FullBleed
      src="/camp/dolores.jpg"
      aria-label="Mission Dolores Park, San Francisco"
      style={{ minHeight: '32rem' }}
      align="center"
      color="white"
      px={3}
      pb={[4, null, 6]}
    >
      <Subhline mb={0}>Welcome to</Subhline>
      <Title>San&nbsp;Francisco.</Title>
    </FullBleed>
    <Container maxWidth={48} px={3}>
      <Lead>
        Every day, new challenges will await campers, encompassing everything
        from adulting & high-level engineering to safe-cracking & sewing. You’ll
        have to leverage your diverse skill sets and communication skills as you
        learn to be independent. Expect the unexpected.
      </Lead>
      <Lead mb={4}>
        We’ll have speakers every other day. Robert from Radiolab May-Li from
        Khan Academy Tom from GitHub
      </Lead>
      <Lead>
        On weekends, we’ll go on adventures, like touring the Facebook campus in
        Menlo Park, taking a trip to Angel Island outside San Francisco, and
        visiting the Exploratorium science museum.
      </Lead>
    </Container>
    <Gallery mt={[4, 5, 6]}>
      <Photo
        src="/camp/street.jpg"
        alt="Natoma St, HQ on the left"
        data-vertical
      />
      <Photo
        src="/camp/neighborhood.jpg"
        alt="Neighborhood, two blocks from HQ"
      />
      <Photo
        src="/camp/classroom.jpg"
        alt="HQ’s classroom space"
        data-vertical
      />
      <Photo src="/camp/conference.jpg" alt="HQ’s conference room" />
      <Photo src="/camp/library.jpg" alt="HQ’s library" />
    </Gallery>
  </Section>
)
