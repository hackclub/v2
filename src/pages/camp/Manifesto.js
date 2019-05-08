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
  <Base id="overview">
    <UltraLarge>Welcome to</UltraLarge>
    <UltraLarge>Hackerland</UltraLarge>
    <Container maxWidth={48} px={3}>
      <Featline mb={[3, 4]}>
        Create anything you can imagine with code, electronics, 3D models, and
        more.
      </Featline>
      <Lead mb={[3, 4]}>
        Computers give us superpowers. Anyone, anywhere, can create beautiful
        things and solve real problems for people everywhere.
      </Lead>
      <Lead mb={[3, 4]}>
        Learning to code is your way into this world. Crossing this bridge
        unlocks the power to make stories, drawings, or wires into websites,
        games, robots, and things nobody but you imagine.
      </Lead>
      <Lead mb={[3, 4]}>
        It’s not about learning a programming framework—it’s about learning to
        teach yourself. Best of all, you can join a worldwide community of
        people doing the same. This is Hacker Culture, & it&nbsp;brings out the
        best in us all.
      </Lead>
      <Text fontSize={[2, 3]} color="muted">
        Just to be clear: we don’t break in to internet banks. Some hackers
        specialize in cybersecurity; we’re not especially focused on it.
      </Text>
    </Container>
  </Base>
]
