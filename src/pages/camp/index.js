import React from 'react'
import styled, { css } from 'styled-components'
import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  LargeButton,
  Link as A,
  Section,
  Text,
  Sheet,
  theme
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import Layout from 'components/Layout'
import Nav from 'components/Nav'
import Photo from 'components/Photo'
import {
  ColoredTitle,
  Title,
  Headline,
  Subhline,
  Highlight,
  Lead
} from 'components/Content'
import Footer from 'components/Footer'

import PageNav from './PageNav'
import Manifesto from './Manifesto'
import Activities from './Activities'
import Admissions from './Admissions'

A.link = A.withComponent(Link)
const FeatureLink = styled(A.link).attrs({
  mt: 3,
  fontSize: 3,
  hoverline: true,
  chevronRight: true
})`
  display: block;
`

const shadows = css`
  h1,
  h2,
  h3,
  p,
  li,
  ${FeatureLink} {
    color: ${theme.colors.white};
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.75);
  }
`

const photoSection = css`
  border-radius: ${theme.radii[2]};
  background-size: cover;
  @media (hover: hover) {
    background-attachment: fixed;
  }
`
const PhotoHeader = styled(Section).attrs({ px: 0 })`
  background-color: ${theme.colors.primary};
  background-image: linear-gradient(
      ${props =>
        props.inverted
          ? 'rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)'
          : 'rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.5)'}
    ),
    url(${props => props.src});
  background-position: center;
  ${photoSection};
  ${shadows};
`
const MapBox = styled(PhotoHeader).attrs({ px: 0 })`
  background-color: ${theme.colors.dark};
  background-image: url('/map.svg');
  background-repeat: no-repeat;
  background-position: 20% top;
  ${photoSection};
  ${theme.mediaQueries.md} {
    background-position: center 20%;
  }
`

const featureStyles = css`
  min-height: 24rem;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  p:first-child,
  h3 {
    line-height: 1.125;
  }
`
const TextFeature = styled(Sheet)`
  > p {
    font-weight: bold;
    font-size: ${theme.fontSizes[5]}px;
    line-height: 1.125;
  }
`
const PhotoFeature = styled(TextFeature).attrs({
  color: 'white'
})`
  position: relative;
  ${props =>
    props.inverted
      ? css`
          justify-content: flex-end !important;
          background-image: linear-gradient(
              transparent,
              rgba(0, 0, 0, 0.25) 50%,
              rgba(0, 0, 0, 0.5) 100%
            ),
            url(${props.src});
        `
      : css`
          background-image: linear-gradient(
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0) 50%
            ),
            url(${props.src});
        `};
  background-position: center;
  background-size: cover;
  ${shadows};
  + ${Text} {
    color: ${theme.colors.black};
    font-size: ${theme.fontSizes[3]}px;
    margin-top: ${theme.space[3]}px;
  }
`

const Module = ({ icon, name, body, color = 'white', ...props }) => (
  <Flex flexDirection="column" color={color} {...props}>
    {icon && (
      <Icon
        size={64}
        mb={2}
        glyph={icon}
        color={props.iconColor || color}
        style={{ flexShrink: 0 }}
      />
    )}
    <Box>
      <Heading.h3 mb={1} fontSize={5} children={name} />
      <Text fontSize={4} style={{ lineHeight: '1.375' }} children={body} />
    </Box>
  </Flex>
)

const ApplyButton = styled(LargeButton).attrs({
  scale: true,
  chevronRight: true
})`
  text-transform: uppercase;
  background-image: ${theme.gradient('pink.5', 'red.5')};
`

const contentContainer = {
  maxWidth: 72,
  width: 1,
  p: 3,
  color: 'black'
}

const title = 'Start a Club – Hack Club'
const description =
  'Learn how to start a coding club at your high school through Hack Club. Get programming club ideas, curriculum, activities, and more.'

export default () => (
  <Layout>
    <Helmet
      title={title}
      meta={[
        { name: 'twitter:title', content: title },
        { name: 'description', content: description },
        { name: 'twitter:description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: 'https://hackclub.com/camp' }
      ]}
    />
    {/* <Nav color="slate" unfixed /> */}
    <PageNav />
    <style>{`body { color: #222; }`}</style>
    <Box bg="white">
      <Container
        width={1}
        maxWidth={64}
        align="center"
        px={3}
        mt={[5, 6, 7]}
        mb={[6, 7, 8]}
      >
        <ColoredTitle
          fontSize={[9, 128]}
          mb={0}
          colors={['pink.5', 'red.5', 'red.6']}
          style={{ lineHeight: '0.875' }}
        >
          Hack Camp
        </ColoredTitle>
        <Headline color="red.6" fontSize={[5, 6, 7]} maxWidth={40} mx="auto">
          3&nbsp;weeks. 15&nbsp;students.
          <br />
          1&nbsp;life-changing camp.
        </Headline>
        <Lead>San Francisco, CA – July 8–26</Lead>
      </Container>
    </Box>
    <Manifesto />
    <Activities />
    <Admissions />
    {/*
        <Cols cols="1fr 3fr" mx={-3} mt={[4, 5, 6]}>
          <Headline px={3}>Go beyond club&nbsp;meetings.</Headline>
          <SectionLead pl={[3, 0]} pr={3} mb={0} />
        </Cols>
        <Flex flexDirection="column" bg="snow" py={[5, 6]}>
      <Container {...contentContainer}>
        <SectionEyebrow>Resources from HQ</SectionEyebrow>
        <SectionHeadline>
          We’ll provide support to get your&nbsp;club{' '}
          <Text.span color="teal.6">going & growing</Text.span>.
        </SectionHeadline>
        <SectionLead />
      </Container>
    </Flex>
    <Container {...contentContainer} maxWidth={64}>
      <Flex
        flexDirection={['column', null, 'row']}
        justify="center"
        py={[5, 6]}
      >
        <Icon glyph="welcome" color="pink.5" size={96} m={[null, null, 3]} />
        <Box align="left">
          <Headline>
            Start a new club, or bring yours. We’re excited to meet you.
          </Headline>
          <Lead fontSize={[3, 4]} mt={3}>
            When established CS clubs join, they get all the benefits of the
            network. While we’re currently optimized for new clubs, we’re
            continually increasing benefits for existing clubs through new
            projects like{' '}
            <A.link to="/bank/" target="_blank">
              Bank
            </A.link>
            {' & '}
            <A href="https://hackathons.hackclub.com/" target="_blank">
              Hackathons
            </A>
            .
          </Lead>
        </Box>
      </Flex>
    </Container>
    <Box bg="snow" py={[5, 6]}>
      <Container px={3}>
        <SectionEyebrow>Admissions</SectionEyebrow>
        <SectionHeadline>15 students.</SectionHeadline>
        <SectionLead mb={0}>
          We have 15 spots for currently-enrolled high school students based in
          North America. You’re not applying to college here—we’re not looking
          for pure technical skill, extracurriculars, or community service, but
          incredible young people who each bring something unique to Camp, and
          can confidently teach a workshop.
        </SectionLead>
        <Text color="slate" fontSize={2}>
          If you’re based in Mexico or Canada, you’ll need to get the
          appropriate visa.
        </Text>
      </Container>
    </Box>
    <Box bg="white" pt={[5, 6]} pb={3}>
      <Container px={3}>
        <SectionEyebrow>Application</SectionEyebrow>
        <SectionHeadline>
          Apply today to <Text.span color="primary">start your club</Text.span>.
        </SectionHeadline>
        <SectionLead>
          It’s all-online, free, & takes about an hour. We’ll help from there!
        </SectionLead>
      </Container>
    </Box>
    <Box p={[3, 4, 5]}>
      <MapBox
        py={[3, 5, 6]}
        bg="darker"
        src="/map.svg"
        aria-label="Students at a coding event"
        align={['left', 'center']}
        color="white"
      >
        <Container width={1} maxWidth={72} px={2} mt={[4, 5, 6]} mb={[3, 4, 5]}>
          <Headline>Begin your application.</Headline>
          <Text fontSize={[3, 5]} my={[1, 2]}>
            Build the class you wish you&nbsp;had.
          </Text>
          <Text fontSize={[3, 5]} my={[1, 2]}>
            Bring the movement to your&nbsp;school.
          </Text>
          <ApplyButton
            href="https://apply.hackclub.com/"
            children="Apply to Hack Club"
            mt={4}
          />
        </Container>
      </MapBox>
    </Box>
        */}
    <Footer />
  </Layout>
)
