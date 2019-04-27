import React from 'react'
import styled from 'styled-components'
import { Box, Container, Text, Sheet, theme } from '@hackclub/design-system'
import { Subhline, Featline, Lead } from 'components/Content'
import { Cols } from './Content'

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

const Concepts = styled(Box).attrs({ my: [4, 5] })`
  display: grid;
  grid-gap: ${theme.space[2]}px;
  ${theme.mediaQueries.md} {
    grid-gap: ${theme.space[4]}px;
    grid-template-columns: repeat(2, 1fr);
  }
`

const Name = styled(Text).attrs({
  fontSize: 3,
  bold: true
})``
const Concept = ({ name, desc }) => (
  <Sheet>
    <Name>{name}</Name>
    <Text color="black">{desc}</Text>
  </Sheet>
)

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
    </Container>
    <Container maxWidth={61.25} px={3}>
      <Concepts>
        <Concept
          name="Participation"
          desc="Every activity is optional, but the whole experience will depend on the investment of individual participants. You will teach, Campers will get out what they put in."
        />
        <Concept
          name="Civic responsibility"
          desc="Technology is a tool—it’s up to us as hackers to think critically, ask hard questions, and ultimately ensure that the tools we create are used for good."
        />
        <Concept
          name="Radical self-reliance"
          desc="This is not a vacation. You will have to rely on yourself for things that you take for granted elsewhere."
        />
        <Concept
          name="Communal effort"
          desc="Campers will frequently be required to work together for the benefit of the community."
        />
      </Concepts>
    </Container>
    <Container maxWidth={61.25} px={3}>
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
