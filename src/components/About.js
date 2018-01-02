import React from 'react'
import {
  Box,
  Container,
  Image,
  Text,
  mediaQueries,
  cx
} from '@hackclub/design-system'
import { wk } from '../theme'

const Base = Box.extend`
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: -64px;
    z-index: -1;
    background-color: ${props => cx(props.offset || 'gray.1')};
    ${wk('clip-path: polygon(0% 0%, 100% 0, 100% 75%, 0 100%)')};
  }

  img {
    transform: translate(0, 64px);
  }
`

export default props => (
  <Base mt={64 * -3} pt={256} pb={160} id="about" {...props}>
    <Box mx="auto" align="center">
      <Container maxWidth={48} align="left" px={3} id="section">
        <Text f={[2, 4]} my={2}>
          <strong>What it looks like.</strong> Every week, you and around 20
          other students come together to build. Meetings are like
          mini-hackathons. People are working on projects, you lead workshops to
          introduce new technologies, you and your co-leads are constantly
          mentoring. Your members start with no experience.
        </Text>
        <Text f={[2, 4]} my={2}>
          <strong>How it works.</strong> You, a student who knows how to code,
          get 1 - 2 others to start a Hack Club. You apply, we accept you, you
          use the community's open source materials and remote office hours with
          the staff to get your club started.
        </Text>
        <Text f={[2, 4]} my={2}>
          <strong>Our philosophy.</strong> We think people learn best when they
          take control of their own education. At Hack Club, there are no
          teachers. No lectures. Your job is to facilitate and provide guidance
          through mentoring. Hack Club is heavily inspired by unschooling.
        </Text>
      </Container>
      <Image w={512} mx="auto" src="/about_hacking.jpg" />
    </Box>
  </Base>
)
