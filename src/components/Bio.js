import React from 'react'
import styled from 'styled-components'
import { Box, Heading, Text, Avatar, theme } from '@hackclub/design-system'
import Sheet from 'components/Sheet'

const Base = styled(Sheet)`
  border-radius: 0;
  max-width: 36rem;
  img {
    transition: transform 0.125s ease-in-out;
  }
  img:hover {
    transform: rotate(-8deg) scale(1.25);
  }
  h3 {
    line-height: 1;
  }
  p {
    align-self: start;
  }
  ${theme.mediaQueries.sm} {
    border-radius: ${theme.radii[2]};
    display: grid;
    grid-row-gap: ${theme.space[1]}px;
    grid-column-gap: ${theme.space[3]}px;
    grid-template-columns: 64px 1fr;
    align-items: center;
    p {
      grid-column: span 2;
    }
  }
  ${theme.mediaQueries.md} {
    p {
      grid-column: 2;
    }
  }
`

const Bio = ({ img, name, teamRole, pronouns, text, ...props }) => (
  <Base mb={0} {...props}>
    <Avatar
      size={64}
      width={64}
      height={64}
      src={
        img ||
        require(`../../static/team/${name.split(' ')[0].toLowerCase()}.jpg`)
      }
      alt={name}
    />
    <Box>
      <Heading.h3 fontSize={[4, 5]} color="black" children={name} />
      <Text.span color="cyan.7" bold fontSize={2} mr={2} children={teamRole} />
      <Text.span fontSize={1} color="muted" align="center">
        ({pronouns})
      </Text.span>
    </Box>
    <Text fontSize={2} mt={1} mb={0} color="black" children={text} />
  </Base>
)

export default Bio
