import React from 'react'
import styled from 'styled-components'
import { Flex, Text, Sheet } from '@hackclub/design-system'
import { ColoredTitle, Lead } from 'components/Content'
import Slide from 'react-reveal/Slide'

const Screen = styled(Flex).attrs({
  flexDirection: 'column',
  justify: 'center',
  bg: 'dark',
  py: [3, 4]
})`
  background: url('/camp/landing.jpg');
  background-position: center;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  position: relative;
  p {
    line-height: 1.125;
  }
`

const Content = styled(Sheet).attrs({
  align: 'center',
  maxWidth: 36,
  p: [null, 4, 5]
})`
  @media screen and (max-width: 32em) {
    background: none;
    box-shadow: none;
    ${ColoredTitle} {
      filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.5));
    }
    p {
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.75);
    }
    ${Lead} {
      font-weight: bold;
    }
  }
  @media screen and (min-width: 32em) {
    background-color: rgba(0, 0, 0, 0.875);
    @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
      background-color: rgba(32, 34, 36, 0.875);
      -webkit-backdrop-filter: saturate(180%) blur(16px);
    }
  }
`

export default () => (
  <Screen>
    <Slide top>
      <Content>
        <ColoredTitle colors={['#FF8C37', '#F1C40F', '#33D6A6']} mb={0}>
          Hack Camp
        </ColoredTitle>
        <Lead
          color="white"
          fontSize={[3, 4, 5]}
          maxWidth={32}
          mt={-2}
          mb={4}
          mx="auto"
        >
          A 1-week summer camp to get started coding & engineering.
        </Lead>
        <Text color="smoke" fontSize={2}>
          July 2019 – Grades 8–12 – San Francisco, CA
        </Text>
      </Content>
    </Slide>
  </Screen>
)
