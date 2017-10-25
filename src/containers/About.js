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
import { Head, Link } from 'react-static'
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
    <Head><title>About Hack Club</title></Head>
    <Flag />
    <Base>
      <Headline>
        <Box f={4}>Hack Club</Box>
        <Box f={6}>Team</Box>
      </Headline>
      <Bio
        img="/team/zach.png"
        name="Zach Latta"
        role="Executive Director"
        text="Zach founded Hack Club in 2014 after he started a coding club at his high school. He previously led the engineering team at Yo and was a developer on Football Heroes. He cares about building things and learning."
      />
      <Bio
        img="/team/max.jpg"
        name="Max Wofford"
        role="Software Engineer"
        text="Tapping into the hacking community, Max has found a common purpose with the founders of Hack Club and his passion for amplifying people’s ideas. He loves helping students scale their ideas into even more awesome products."
      />
      <Bio
        img="/team/lachlan.jpg"
        name="Lachlan Campbell"
        role="Web Designer"
        text="Lachlan, a club leader from State College, PA, joined the team to work on Hack Club‘s website. They care about making tools to make information more accessible."
      />
      <Bio
        img="/team/mingjie.jpg"
        name="Mingjie Jiang"
        role="Social Media"
        text="Mingjie leads a local club at Wootton High School in Rockville, Maryland. Aside from trying to engage more students into the world of hacking, he also cares about building a unique public identity for Hack Club."
      />
      <Bio
        img="/team/victor.png"
        name="Victor Truong"
        role="Finance"
        text="Victor is the leader of a chapter at Rosemead High School in Los Angeles, California. He aims to make Hack Club's finances as transparent as possible, and believes the way to do so is to let people know how each and every penny is being spent."
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
