import React from 'react'
import styled from 'styled-components'
import {
  Heading,
  Box,
  Flex,
  Container,
  Image,
  Text,
  Sheet
} from '@hackclub/design-system'
import { Link } from 'gatsby'
import { Section, SectionTitle, Cols, theme } from './style'
import { Headline, Subhline, Featline, Lead } from 'components/Content'
import Photo from 'components/Photo'

const BioSheet = styled(Sheet).attrs({ p: 3, bg: theme.colors.darkless })`
  display: grid;
  grid-template-columns: 8rem 1fr;
  ${theme.mediaQueries.md} {
    grid-template-columns: 10rem 1fr;
  }
  grid-template-areas:
    'img name'
    'bio bio';
  grid-gap: ${theme.space[3]}px;
  img {
    grid-area: img;
    border-radius: ${theme.radii[2]};
  }
  div {
    grid-area: name;
    align-self: flex-end;
    text-align: left;
  }
  h3,
  span {
    line-height: 1;
  }
  p {
    grid-area: bio;
  }
`

const Bio = ({ img, name, pronouns, text, ...props }) => (
  <BioSheet mb={0} {...props}>
    <Image src={img} alt={name} />
    <Box>
      <Heading.h3 fontSize={4} mb={1} color="white" children={name} />
      <Text.span
        fontSize={1}
        color="muted"
        align="center"
        children={pronouns}
      />
    </Box>
    <Text fontSize={2} color="muted" children={text} />
  </BioSheet>
)

const Timeline = styled(Flex).attrs({
  flexDirection: 'column',
  mb: [4, 0]
})`
  line-height: 1.125;
  position: relative;
  &:before {
    content: '';
    background-image: linear-gradient(
      to bottom,
      ${theme.colors.dark} 0%,
      ${theme.colors.slate} 15%,
      ${theme.colors.slate} 85%,
      ${theme.colors.dark} 100%
    );
    height: 100%;
    width: 3px;
    margin-left: 4px;
    position: absolute;
    z-index: 0;
  }
`
const TimelineStep = styled(Flex).attrs({
  align: 'center',
  pt: props => (props.first ? 0 : [2, 3])
})`
  line-height: 1.125;
  position: relative;
  z-index: 1;
`
const Circle = styled(Box).attrs({ p: 1 })`
  border-radius: ${theme.pill};
  display: inline-block;
  line-height: 0;
`

Timeline.Step = ({ name, duration, first = false, color = 'red' }) => (
  <TimelineStep first={first}>
    <Circle bg={theme.colors[color]} mr={3} />
    <Box align="left">
      <Text color="muted" fontSize={1} caps children={duration} />
      <Text color="smoke" fontSize={[3, 4]} children={name} />
    </Box>
  </TimelineStep>
)

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

export default () => [
  <Section bg="dark" id="about">
    <Container maxWidth={61.25} px={3}>
      <SectionTitle>About Us</SectionTitle>
      <Cols cols="1fr 2fr" mb={[4, 5]}>
        <Subhline>
          Hack Club is a&nbsp;worldwide network of coding clubs.
        </Subhline>
        <Lead>
          We’re{' '}
          <Link style={{ color: theme.colors.red }} to="/">
            Hack Club
          </Link>
          , a global nonprofit network of high school coding clubs (now in 2% of
          US high schools). Hack Camp has been a part of Hack Club since the
          beginning. It’s a great way for us to try out the best ideas from our
          community, develop curriculum, and stay sharp as teachers. We also
          just love doing it!
        </Lead>
      </Cols>
    </Container>
    <Container px={3}>
      <Cols cols="1fr 1fr 1fr">
        <Bio
          img="/camp/fernanda.jpg"
          name="Fernanda Lozano"
          text="Fernanda is a computational neuroscience student, an entrepreneur, and an organizer with years of experience running programs and events for students in Mexico. This summer Fernanda will take charge of Hack Camp’s logistics and serve as your primary point of contact."
          pronouns="she/her"
        />
        <Bio
          img="/camp/mingjie.jpg"
          name="Mingjie Jiang"
          text="Mingjie is a student organizer who has spread his passion for technology to thousands of other students through events like Hack Chicago, CodeDay, and his own Hack Club. This summer he’s working with club leaders around the world to build the ultimate curriculum."
          pronouns="he/him"
        />
        <Bio
          img="/camp/chris.jpg"
          name="Chris Walker"
          text="Chris is an all-around hacker enthusiast passionate about building video games, websites, radios, furniture, rockets, fire sculptures, communities, and more! He will be leading Hack Camp’s workshops, designing hardware projects, and directing the day-to-day experience."
          pronouns="he/him"
        />
      </Cols>
    </Container>
    <Container maxWidth={61.25} px={3}>
      <Subhline mt={[5, 6]} mb={4}>
        A brief history of Hack&nbsp;Camp
      </Subhline>
      <Cols gap={[3, 5]} mt={0} mb={0}>
        <div>
          <Lead color="muted">
            Hack Camp began as an experiment to discover new ways of teaching
            coding at our clubs around the world. 
          </Lead>
          <Lead color="muted" mt={[2, 3]}>
             After our first year, something incredible happened—our students
            began running their own camps! They’ve&nbsp;sprung up in a suburb of
            Cincinnati & Southern India.
          </Lead>
          <Lead color="muted" mt={[2, 3]}>
            This was so inspiring to watch that we’re following their lead to
            bring Hack Camp back in 2019. 
          </Lead>
        </div>
        <Timeline>
          <Timeline.Step name="Hack Club is born" duration="2015" first />
          <Timeline.Step name="First Hack Camp in SF" duration="2016" />
          <Timeline.Step name="SF Hack Camp v2" duration="2017" />
          <Timeline.Step
            name="A Camp appears in Mason, OH"
            duration="2017"
            color="cyan"
          />
          <Timeline.Step
            name="Camp runs again in Mason"
            duration="2018"
            color="cyan"
          />
          <Timeline.Step
            name="A Camp appears in Kerala, India"
            duration="2018"
            color="yellow"
          />
          <Timeline.Step name="Hack Camp returns to HQ!" duration="2019" />
        </Timeline>
        <Photo
          src="/camp/mason1.jpg"
          alt="A Hack Camp workshop in Mason, Ohio"
          dark
          style={{ minHeight: '18rem' }}
        />
        <Photo
          src="/camp/sf.jpg"
          alt="Presenting at the first Hack Camp"
          dark
          style={{ minHeight: '18rem' }}
        />
        <Photo
          src="/camp/mason2.jpg"
          alt="Coding at Mason Hack Camp, 2018"
          dark
          style={{ minHeight: '18rem' }}
        />
        <Photo
          src="/camp/india.jpg"
          alt="Hack Camp in Kerala, India"
          dark
          style={{ minHeight: '18rem' }}
        />
      </Cols>
    </Container>
  </Section>,
  <Section bg="darker" id="about" py={[4, 5, 6]}>
    <Container maxWidth={61.25} px={3}>
      <Cols cols="1fr 2fr" mb={[4, 5]}>
        <Subhline mb={0}>Welcome to Hack&nbsp;Club&nbsp;HQ.</Subhline>
        <Lead>
          We’re&nbsp;running Hack&nbsp;Camp right at our office in
          San&nbsp;Francisco (576 Natoma St). Here’s the space.
        </Lead>
      </Cols>
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
]
