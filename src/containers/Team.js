import React from 'react'
import {
  ThemeProvider,
  Section,
  Heading,
  Box,
  Container,
  mediaQueries
} from '@hackclub/design-system'
import { Head, Link } from 'react-static'
import Nav from '../components/Nav'
import Bio from '../components/Bio'
import Footer from '../components/Footer'

const Header = Box.extend`
  padding-top: 0 !important;
  background-color: ${props => props.theme.colors.blue[5]};
  background-image: linear-gradient(
    -8deg,
    ${props => props.theme.colors.indigo[4]} 0%,
    ${props => props.theme.colors.blue[6]} 50%,
    ${props => props.theme.colors.blue[7]} 100%
  );
`

const Base = Container.extend`
  display: grid;
  grid-gap: 1rem;
  justify-content: center;
  ${mediaQueries[1]} {
    grid-template-columns: repeat(2, 1fr);
  }
`

export default () => (
  <ThemeProvider>
    <Head>
      <title>Team – Hack Club</title>
    </Head>
    <Header pb={[3, 4]}>
      <Nav />
      <Heading.h2 color="white" align="center" caps mt={3}>
        <Box f={4}>Hack Club</Box>
        <Box f={6}>Team</Box>
      </Heading.h2>
    </Header>
    <Base py={[4, 5]} px={3}>
      <Bio
        img="/team/zach.png"
        name="Zach Latta"
        role="Executive Director"
        text="Zach dropped out of high school after his freshman year to work in the technology industry and had over 5 million people using his software by the time he turned 17. He founded Hack Club to build the program he wish he had in high school and has been awarded the Thiel Fellowship and Forbes 30 Under 30 for his work."
        bg="red.0"
      />
      <Bio
        img="/team/max.jpg"
        name="Max Wofford"
        role="Operations"
        text="Tapping into the hacking community, Max has found a common goal with Hack Club and his passion for amplifying people’s ideas. He loves helping students scale their ideas into even more awesome products."
        bg="yellow.0"
      />
      <Bio
        img="/team/lachlan.jpg"
        name="Lachlan Campbell"
        role="Web Designer"
        text="Lachlan, a club leader from State College, PA, joined the team to work on Hack Club’s website. They care about bringing coding to more people and making tools to make information more accessible."
        bg="blue.0"
      />
      <Bio
        img="/team/mingjie.jpg"
        name="Mingjie Jiang"
        role="Social Media"
        text="Mingjie leads a local club at Wootton High School in Rockville, Maryland. Aside from trying to engage more students into the world of hacking, he also cares about building a unique public identity for Hack Club."
        bg="orange.0"
      />
      <Bio
        img="/team/victor.png"
        name="Victor Truong"
        role="Finance"
        text="Victor is a club leader at Rosemead High School in Los Angeles, CA. He aims to make Hack Club’s finances as transparent as possible by letting people know how every penny is being spent."
        bg="green.0"
      />
      <Bio
        img="/team/athul.jpg"
        name="Athul Blesson"
        role="Indian Region"
        text="Athul leads some of our largest clubs in India. After graduating from high school, he joined as our Regional Manager in India. He is passionate about bringing more students into the world of coding."
        bg="violet.0"
      />
    </Base>
    <Footer />
  </ThemeProvider>
)
