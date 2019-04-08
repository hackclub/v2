import React from 'react'
import styled, { css } from 'styled-components'
import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Link as A,
  Text,
  hexa,
  theme
} from '@hackclub/design-system'
import { Link } from 'gatsby'
import PureImagination from 'components/PureImagination'

const Base = styled(Box.withComponent('footer'))`
  background: ${props =>
    props.dark
      ? `${theme.colors.darker} radial-gradient(${hexa(
          theme.colors.black,
          0.5
        )} 1px, transparent 1px)`
      : `${theme.colors.snow} url('/pattern.svg') repeat`};
  ${props =>
    props.dark &&
    css`
      background-size: ${theme.space[4]}px ${theme.space[4]}px;
      h2 {
        color: ${theme.colors.gray[4]};
      }
      ${BottomLine} {
        border-color: ${theme.colors.black};
      }
    `} @media print {
    display: none;
  }
`

const Columns = styled(Container)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${theme.space[2]}px;
  ${theme.mediaQueries.md} {
    grid-gap: ${theme.space[4]}px;
    grid-template-columns: repeat(4, 1fr);
  }
`

const Services = styled(Flex)`
  a {
    line-height: 0;
  }
  svg {
    fill: currentColor;
    width: 32px;
    height: 32px;
  }
  ${theme.mediaQueries.md} {
    max-width: 12rem;
  }
`
Services.defaultProps = {
  align: 'center',
  mb: 3,
  wrap: true
}

const Service = ({ href, icon, ...props }) => (
  <A
    target="_blank"
    rel="noopener"
    href={href}
    mr={2}
    mb={2}
    color="muted"
    aria-label={`hack club on ${icon}`}
    children={<Icon glyph={icon} />}
    {...props}
  />
)

const Pages = styled(Box)`
  a {
    display: block;
    color: inherit;
    margin-bottom: ${theme.space[2]}px;
  }
`

const BottomLine = styled(Box)`
  border-top: 1px solid ${theme.colors.smoke};
`

const Footer = ({ dark = false, children, ...props }) => (
  <Base
    color={dark ? 'muted' : 'slate'}
    py={[4, 5, 6]}
    dark={dark}
    align="left"
    {...props}
  >
    {children}
    <PureImagination />
    <Columns px={3}>
      <Box>
        <Heading.h2 fontSize={3} mb={3}>
          Hack Club
        </Heading.h2>
        <Pages>
          <Link to="/" children="Home" />
          <Link to="/donate/" children="Donate" />
          <Link to="/team/" children="Team" />
          <Link to="/community/" children="Community" />
          <Link to="/philosophy/" children="Philosophy" />
        </Pages>
      </Box>
      <Box>
        <Heading.h2 fontSize={3} mb={3}>
          For Clubs
        </Heading.h2>
        <Pages>
          <Link to="/start/" children="Start a Club" />
          <a href="https://apply.hackclub.com/" children="Apply" />
          <Link to="/challenge/" children="Challenge" />
          <Link to="/workshops/" children="Workshops" />
          <a href="https://finder.hackclub.com/" children="Find Clubs" />
        </Pages>
      </Box>
      <Box>
        <Heading.h2 fontSize={3} mb={3}>
          Resources
        </Heading.h2>
        <Pages>
          <Link to="/conduct/" children="Code of Conduct" />
          <Link to="/night/" children="Hack Night" />
          <a href="https://hackathons.hackclub.com/" children="Hackathons" />
          <a href="https://shop.hackclub.com/" children="Shop" />
          <Link to="/bank/" children="Bank" />
        </Pages>
      </Box>
      <Box>
        <Heading.h2 fontSize={3} mb={3}>
          Join the Club
        </Heading.h2>
        <Services>
          <Service href="/community/" icon="slack-fill" target="_self" />
          <Service href="https://twitter.com/hackclub" icon="twitter" />
          <Service href="https://github.com/hackclub" icon="github" />
          <Service
            href="https://www.facebook.com/Hack-Club-741805665870458"
            icon="facebook"
          />
          <Service href="https://medium.com/hackclub" icon="medium" />
          <Service
            href="https://www.youtube.com/channel/UCQzO0jpcRkP-9eWKMpJyB0w"
            icon="youtube"
          />
          <Service
            href="https://www.instagram.com/starthackclub"
            icon="instagram"
          />
          <Service href="mailto:team@hackclub.com" icon="email" />
        </Services>
        <Text my={2}>
          <a href="tel:1-855-625-HACK">1-855-625-HACK</a>
          <br />
          <Text.span color="muted" children="(call toll-free)" />
        </Text>
      </Box>
    </Columns>
    <Container px={3} mt={[3, 4]}>
      <Box fontSize={2}>
        <Text>Office: 576 Natoma St, San Francisco, CA 94103</Text>
        <Text>
          Mail: 8605 Santa Monica Blvd #86294, West Hollywood, CA 90069
        </Text>
      </Box>
      <BottomLine mt={3}>
        <Text fontSize={1} mt={2} color="muted">
          © {new Date().getFullYear()} Hack Club. 501(c)(3) nonprofit (EIN:
          81-2908499)
        </Text>
      </BottomLine>
    </Container>
  </Base>
)

export default Footer
