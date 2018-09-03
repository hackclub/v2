import React from 'react'
import {
  Section,
  Box,
  Heading,
  Text,
  LargeButton
} from '@hackclub/design-system'
import Link from 'gatsby-link'

const tilt = n =>
  `clip-path: polygon(0% ${100 - n}%, 100% 0, 100% ${n}%, 0 100%)`

const Base = Section.extend`
  background-color: ${({ theme }) => theme.colors.red[5]};
  background-image: linear-gradient(
    -48deg,
    ${({ theme }) => theme.colors.orange[4]} 0%,
    ${({ theme }) => theme.colors.red[5]} 50%,
    ${({ theme }) => theme.colors.red[6]} 100%
  );
  display: grid;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 3fr 2fr;
  }
  padding: 4rem 0 !important;
  ${tilt(90)};
  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 5rem 0 !important;
    ${tilt(85)};
  }
  h3 {
    font-weight: normal;
    line-height: 1.5;
    opacity: 0.9;
  }
`

LargeButton.link = LargeButton.withComponent(Link)

const Start = ({ mt = '-4rem', buttonProps = {}, ...props }) => (
  <Base mt={mt} {...props}>
    <Box p={[2, 3]} align={['center', null, 'right']}>
      <Heading.h2 f={[5, 6]} m={0}>
        Begin Your Application.
      </Heading.h2>
      <Text color="red.0" f={[3, 4]} my={2}>
        Build the class you wish you could take.
      </Text>
      <Text color="red.0" f={[3, 4]} m={0}>
        Bring the movement to your school.
      </Text>
    </Box>
    <Box align={['center', null, 'left']} p={3}>
      <Box align="center" style={{ display: 'inline-block' }}>
        <Text>Applications due Sept 30th</Text>
        <LargeButton.link
          my={2}
          to="/start"
          inverted
          children="Get started »"
          {...buttonProps}
        />
        <Text>We review on a rolling basis</Text>
      </Box>
    </Box>
    <style children="footer{margin-top:-5rem;padding-top:8rem !important}" />
  </Base>
)

export default Start
