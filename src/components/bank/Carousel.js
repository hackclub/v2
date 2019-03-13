import React, { Fragment } from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
// import times from 'lodash/times'
import Carousel from 'nuka-carousel'
import {
  Container,
  Box,
  Flex,
  Text,
  Avatar,
  Heading,
  theme,
  BackgroundImage,
  Icon
} from '@hackclub/design-system'
import Fade from 'react-reveal/Fade'
import Sheet from 'components/Sheet'

const events = [
  {
    name: 'Los Altos Hacks',
    tagline: 'The largest high school hackathon in the world.',
    location: 'Sunnyvale, CA',
    organizer: 'Jamsheed Mistri',
    testimonial:
      'Hack Club Bank has made it incredibly easy to handle our event’s funds and has provided countless tools to increase our productivity. With Bank, I don’t need to dedicate as much time to the legal and financial aspects of our event, leaving plenty of time to focus on making it the best it can be.'
  },
  {
    name: 'Hack Pennsylvania',
    location: 'State College, PA',
    organizer: 'Lachlan Campbell',
    testimonial: 'Bank is so fucking amazing. Like wow. Omg. Spectacular.'
  },
  {
    name: 'SLO Hacks',
    location: 'San Luis Obispo, CA',
    organizer: 'Selynna Sun',
    testimonial:
      'Hack Club Bank significantly improved the fiscal sponsorship process for SLO Hacks, through a beautifully designed platform packed full of useful features, in addition to a responsive team that made sure our questions and concerns were addressed as quickly as possible.'
  }
]

const Slide = styled(Box).attrs({ bg: 'snow', width: '100vw' })`
  background: url(${props => props.src}),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.125));
  background-position: center;
  background-size: cover;
  width: 100vw;
  min-height: 90vh;
  cursor: initial;
  h1:first-child {
    line-height: 1;
  }
  h1,
  h1 + p {
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
  }
  ${Sheet} {
    background: rgba(255, 255, 255, 0.875);
    @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
      -webkit-backdrop-filter: saturate(180%) blur(4px);
    }
    ${theme.mediaQueries.reduceTransparency} {
      background: ${theme.colors.white} !important;
    }
  }
`

const Underline = styled.span`
  background-image: url(${require('../../../static/underline.svg')});
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: bottom center;
`

const Event = ({ img, name, tagline, organizer, testimonial }) => (
  <Slide src={img} px={3}>
    <Container pt={[6, 7, 8]} pb={[4, 5, 6]} px={3}>
      <Fade left>
        <Fragment>
          <Heading.h1 color="white" fontSize={[7, 8, 9]}>
            Run <Underline>{name}</Underline>.
          </Heading.h1>
          {tagline && (
            <Text
              color="white"
              fontSize={[3, 4, 5]}
              mt={1}
              children={tagline}
            />
          )}
        </Fragment>
      </Fade>
      <Sheet color="black" maxWidth={36} mt={[4, 5]} mx={0}>
        <Text children={testimonial} />
        <Flex align="center" mt={3}>
          <Avatar
            src={`/hackers/${organizer.split(' ')[0].toLowerCase()}.jpg`}
            size={32}
            mr={2}
          />
          <Text>
            <strong>{organizer}</strong>, Lead Organizer
          </Text>
        </Flex>
      </Sheet>
    </Container>
  </Slide>
)

const LocationPill = styled(Flex).attrs({
  fontSize: 1,
  py: 1,
  px: 3,
  mb: [3, 4],
  color: 'slate'
})`
  border-radius: ${theme.pill};
  background: rgba(255, 255, 255, 0.875);
  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    -webkit-backdrop-filter: saturate(180%) blur(2px);
  }
  ${theme.mediaQueries.reduceTransparency} {
    background: ${theme.colors.white} !important;
  }
`

const CurrentLocation = ({ location }) => (
  <LocationPill>{location}</LocationPill>
)

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

export default () => (
  <Carousel
    autoplay
    autoplayInterval={5000}
    wrapAround
    renderBottomCenterControls={({ currentSlide }) => (
      <CurrentLocation location={events[currentSlide].location} />
    )}
    renderCenterLeftControls={({ previousSlide }) => (
      <SideControl onClick={previousSlide}>
        <Icon glyph="view-back" color="white" size={36} />
      </SideControl>
    )}
    renderCenterRightControls={({ nextSlide }) => (
      <SideControl onClick={nextSlide}>
        <Icon glyph="view-forward" color="white" size={36} />
      </SideControl>
    )}
  >
    {events.map(event => {
      const id = kebabCase(event.name)
      return <Event {...event} img={`/bank/events/${id}.jpg`} key={id} />
    })}
  </Carousel>
)
