import React from 'react'
import styled from 'styled-components'
import { Box, Heading, Text, LargeButton } from '@hackclub/design-system'
import Sheet from 'components/Sheet'
import Link from 'gatsby-link'

const Base = styled(Sheet).attrs({ maxWidth: 64 - 2 })`
  background-color: ${({ theme }) => theme.colors.red[5]};
  background-image: linear-gradient(
    -48deg,
    ${({ theme }) => theme.colors.orange[4]},
    ${({ theme }) => theme.colors.red[5]},
    ${({ theme }) => theme.colors.red[6]}
  );
  display: grid;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 4fr 2fr;
  }
  h3 {
    font-weight: normal;
    line-height: 1.5;
    opacity: 0.9;
  }
`

LargeButton.link = LargeButton.withComponent(Link)

const Start = ({ buttonProps = {}, ...props }) => (
  <Base my={4} {...props}>
    <Box p={[2, 3]} align={['center', null, 'right']}>
      <Heading.h2 color="white" f={[5, 6]} m={0}>
        Applications due Sept 30th.
      </Heading.h2>
      <Text color="red.0" f={[3, 4]} my={2}>
        Build the class you wish you could take.
      </Text>
      <Text color="red.0" f={[3, 4]} m={0}>
        Bring the movement to your school.
      </Text>
    </Box>
    <Box align={['center', null, 'left']} p={3}>
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
