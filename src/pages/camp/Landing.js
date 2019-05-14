import React from 'react'
import styled from 'styled-components'
import { Flex, Text, Sheet } from '@hackclub/design-system'
import { theme } from './style'
import { ColoredTitle, Lead } from 'components/Content'
import Slide from 'react-reveal/Slide'

const Screen = styled(Flex).attrs({
  flexDirection: 'column',
  justify: 'center',
  bg: 'dark',
  py: [3, 4],
  px: 2,
  width: 1
})`
  background: url('/camp/landing.jpg');
  background-position: center;
  background-size: cover;
  max-width: 100vw;
  height: 100vh;
  position: relative;
  p {
    line-height: 1.125;
  }
`

const Content = styled(Sheet).attrs({
  align: 'center',
  maxWidth: 36,
  py: [3, 4, 5],
  px: [1, 4, 5]
})`
  background-color: rgba(0, 0, 0, 0.75);
  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    background-color: rgba(32, 34, 36, 0.875);
    -webkit-backdrop-filter: saturate(180%) blur(16px);
  }
`

export default () => (
  <Screen>
    <Slide top>
      <Content>
        <ColoredTitle
          colors={[
            theme.colors.primary,
            theme.colors.yellow,
            theme.colors.green
          ]}
          mb={0}
        >
          Hack Camp
        </ColoredTitle>
        <Lead
          color="white"
          fontSize={[3, 4, 5]}
          maxWidth={32}
          mt={[-1, -2]}
          mb={3}
          mx="auto"
        >
          A 1-week summer camp<br></br>to get started coding.
        </Lead>
        <Text color="smoke" fontSize={2} mb={3}>
          July 2019 · Grades 8–12 · San Francisco, CA
        </Text>
        <Text color="primary" fontSize={[3, 4]} bold={true}>
          Apply by May 26th for $75 off!
        </Text>
      </Content>
    </Slide>
  </Screen>
)
