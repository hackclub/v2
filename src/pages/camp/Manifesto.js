import React from 'react'
import styled from 'styled-components'
import { Box, Container, Hide, Text } from '@hackclub/design-system'
import { Title, ColoredTitle, Featline, Lead } from 'components/Content'
import { theme } from './style'

const Base = styled(Box).attrs({ pt: [5, 6, 8], pb: [6, 7] })`
  position: relative;
  > div {
    position: relative;
    z-index: 2;
  }
`

const mediaQuery = '@media screen and (min-width: 60em)'
const SmallContainer = styled(Container).attrs({ py: 5, align: 'center' })`
  background-image: ${theme.gradient(theme.colors.green, theme.colors.blue)};
  ${mediaQuery} {
    display: none !important;
  }
`
const UltraSmall = styled(Title).attrs({
  fontSize: 6,
  caps: true
})`
  margin: 0;
`
const UltraLarge = styled(ColoredTitle).attrs({
  colors: [theme.colors.green, theme.colors.cyan, theme.colors.blue],
  fontSize: [null, 7, 8],
  caps: true
})`
  display: none;
  ${mediaQuery} {
    display: block;
  }
  position: absolute;
  top: 2rem;
  right: 2rem;
  letter-spacing: 0.06em;
  &:last-of-type {
    writing-mode: vertical-rl;
    margin-top: 5rem;
  }
`

export default () => [
  <SmallContainer px={3}>
    <UltraSmall>Learn to build with the best.</UltraSmall>
  </SmallContainer>,
  <Base>
    <UltraLarge>Learn to Build</UltraLarge>
    <UltraLarge>with the Best.</UltraLarge>
    <Container maxWidth={48} px={3}>
      <Featline>
        Create anything you can imagine with Code, Electronics, 3D Models, and
        more.
      </Featline>
      <Lead mb={4}>
        Have you ever met someone who knows how to do everything? Someone who
        doesn’t need classes to learn? This is what we call a hacker.
      </Lead>
      <Lead mb={4}>
        Hackers have a superpower: the ability to teach themselves. Anyone can
        learn to do anything online, and schools just haven’t caught up. The
        modern world was built by hackers—we’ll show you how to be one.
      </Lead>
      <Lead mb={4}>
        At Hack Camp you’ll make your first website, build your first video
        game, solder your first circuit, and join a global community of students
        who carry the standard of Hacker Culture.
      </Lead>
      <Text fontSize={[2, 3]} color="muted">
        Just to be clear: we don’t break in to internet banks. Some hackers
        specialize in cyber-security; we’re not especially focused on it.
      </Text>
    </Container>
  </Base>
]
