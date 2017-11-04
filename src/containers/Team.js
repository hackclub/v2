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
import Nav from '../components/Nav'
import Bio from '../components/Bio'
import Footer from '../components/Footer'

const Base = Container.extend.attrs({
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
    <Head><title>Team – Hack Club</title></Head>
    <Nav />
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
        role="Operations"
        text="Tapping into the hacking community, Max has found a common goal with Hack Club and his passion for amplifying people’s ideas. He loves helping students scale their ideas into even more awesome products."
      />
      <Bio
        img="/team/lachlan.jpg"
        name="Lachlan Campbell"
        role="Web Designer"
        text="Lachlan, a club leader from State College, PA, joined the team to work on Hack Club’s website. They care about bringing coding to more people and making tools to make information more accessible."
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
        text="Victor is a club leader at Rosemead High School in Los Angeles, CA. He aims to make Hack Club’s finances as transparent as possible by letting people know how each and every penny is being spent."
      />
      <Bio
        img="/team/athul.jpg"
        name="Athul Blesson"
        role="Indian Region"
        text="Athul leads some of our largest clubs in India. After graduating from high school, he joined as our Regional Manager in India. He is passionate about bringing more students into the world of coding."
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
