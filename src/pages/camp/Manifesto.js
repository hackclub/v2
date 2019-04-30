import React from 'react'
import styled from 'styled-components'
import { Box, Container, Text } from '@hackclub/design-system'
import { Headline, Featline, Lead } from 'components/Content'
import { Cols, theme } from './style'

const Base = styled(Box).attrs({ py: [5, 6] })`
  position: relative;
  > div {
    position: relative;
    z-index: 2;
  }
`

const Background = styled.span`
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 32rem;
  background-image: radial-gradient(
    ellipse farthest-corner at top center,
    ${theme.colors.pink[9]},
    ${theme.colors.dark} 90%,
    ${theme.colors.dark} 100%
  );
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: top center;
  z-index: 0;
`

export default () => (
  <Base>
    {/* <Background /> */}
    <Container maxWidth={48} px={3}>
      <Headline>
        Hack Camp is a summer camp built by & for student hackers.
      </Headline>
      <Lead mb={4}>
        Each student will come to Camp with a technical workshop they’ve
        designed and built themselves. Each day a different student will lead
        the camp in their workshop. This is a blank slate to teach whatever you
        want; a 100% student-led curriculum.
      </Lead>
      <Lead mb={4}>
        You’ll visit the world’s most innovative companies—and talk to their
        founders. You’ll explore San Francisco in challenges that span the
        entire city. You’ll grow as a coder, a leader, and most importantly, an
        independent adult.
      </Lead>
      <Lead mb={4}>
        Every activity is optional, but the whole experience will depend on the
        investment of individual participants. You will teach, Campers will get
        out what they put in."
      </Lead>
      <Cols cols="1fr auto" style={{ alignItems: 'center' }}>
        <Featline color="accent" mb={0}>
          Hacking‽
        </Featline>
        <Text fontSize={2}>
          We use the traditional definition of “hacker”: technically-skilled
          individuals who find creative solutions to complex problems. We don’t
          break into banks.
        </Text>
      </Cols>
    </Container>
  </Base>
)
