import React from 'react'
import {
  Provider,
  Heading,
  Lead,
  Container,
  Flex,
  Box,
  Text,
  Subhead
} from 'rebass'
import theme, { colors } from '../theme'
import { Link } from 'react-static'
import Flag from '../components/Flag'
import Bio from '../components/Bio'
import Footer from '../components/Footer'

const Base = Container.extend.attrs({
  mt: 5,
  py: 4,
  px: 3,
  maxWidth: 36 * 16
})``

const Headline = Heading.extend.attrs({
  color: 'primary',
  mb: 3,
  align: 'center'
})`
  text-transform: uppercase;
  letter-spacing: .1em;
`

const P = Text.extend.attrs({ f: 3, mb: 2 })`
  @supports (-webkit-initial-letter: 2) {
    &:first-of-type:first-letter {
      -webkit-initial-letter: 2;
      color: ${colors.slate};
      font-weight: bold;
      margin-right: .5rem;
    }
  }
`

export default () => (
  <Provider theme={theme}>
    <Flag />
    <Base>
      <Headline>
        <Box f={4}>Hack Club</Box>
        <Box f={6}>Team</Box>
      </Headline>
      <Bio
        img="https://hackclub.com/staticPage/team/zach_latta.jpg"
        name="Zach Latta"
        role="Executive Director"
        text="Zach founded Hack Club in 2014 after he started a coding club at his high school. He previously led the engineering team at Yo and was a developer on Football Heroes. He cares about building things and learning."
      />
      <Bio
        img="https://hackclub.com/staticPage/team/max_wofford.jpg"
        name="Max Wofford"
        role="Software Engineer"
        text="Tapping into the hacking community, Max has found a common purpose with the founders of Hack Club and his passion for amplifying people’s ideas. He loves helping students scale their ideas into even more awesome products."
      />
      <Flex justify="center" mt={3}>
        <Text
          is={Link}
          to="/"
          color="primary"
          f={3}
          bold
          style={{ textDecoration: 'none' }}
        >
          ← Home
        </Text>
      </Flex>
    </Base>
    <Footer />
  </Provider>
)
