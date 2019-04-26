import React from 'react'
import styled from 'styled-components'
import { Box, Container, Text, theme } from '@hackclub/design-system'
import { Subhline, Lead } from 'components/Content'

const Base = styled(Box).attrs({ bg: 'snow', py: [5, 6] })`
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
    ${theme.colors.pink[3]},
    ${theme.colors.pink[0]} 50%,
    ${theme.colors.snow} 90%,
    ${theme.colors.snow} 100%
  );
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: top center;
  z-index: 0;
`

// const SectionLead = styled(Text)``

// const Lead = styled(Text).attrs({ fontSize: [3, 4], mb: 4 })``

export default () => (
  <Base>
    <Background />
    <Container align="center" px={3} py={[4, 5]}>
      <Subhline>
        Hack Camp is a completely new kind of summer&nbsp;camp, built by & for
        student hackers.
      </Subhline>
    </Container>
    <Container maxWidth={48} px={3}>
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
        This camp is not for everyone. On the first day, you will start with
        empty bedrooms and a stack of mattresses, blankets, & PVC piping. Then
        you will build the ultimate community pillow fort and live there for 3
        weeks. (We’re not kidding!)
      </Lead>
      <Lead>
        We use the term Hacker according to its traditional definition:
        technically skilled individuals who find creative solutions to complex
        problems. We do not break into internet banks.
      </Lead>
    </Container>
  </Base>
)
