import React from 'react'
import styled from 'styled-components'
import { Box, Heading, Text, LargeButton, theme } from '@hackclub/design-system'
import Sheet from 'components/Sheet'
import { Subhline, Lead } from 'components/Content'
import { Link } from 'gatsby'

const Base = styled(Sheet).attrs({ maxWidth: 72 - 2 })`
  background-color: ${theme.colors.red[5]};
  background-image: ${theme.gradient('orange.5', 'red.5', 'red.6')};
  display: grid;
  grid-gap: ${theme.space[4]}px;
  align-items: center;
  ${theme.mediaQueries.md} {
    grid-gap: ${theme.space[5]}px;
    grid-template-columns: 2fr 1fr;
  }
`

LargeButton.link = LargeButton.withComponent(Link)

const Start = ({ buttonProps = {}, ...props }) => (
  <Base px={[2, 4, 5]} py={[4, 5, 6]} my={4} {...props}>
    <Box align={['center', null, 'right']}>
      <Subhline color="white" mb={3}>
        Apply now & start your club.
      </Subhline>
      <Lead color="red.0" fontSize={[3, 4]} mb={2}>
        Build the class you wish you took.
      </Lead>
      <Lead color="red.0" fontSize={[3, 4]}>
        Bring the movement to your school.
      </Lead>
    </Box>
    <Box align={['center', null, 'left']}>
      <LargeButton.link
        to="/start"
        inverted
        children="Get started"
        chevronRight
        fontSize={[3, 4]}
        scale
        {...buttonProps}
      />
    </Box>
  </Base>
)

export default Start
