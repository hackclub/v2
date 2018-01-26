import React from 'react'
import {
  Box,
  Container,
  Heading,
  Section,
  Text,
  ThemeProvider,
  mediaQueries
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Nav from '../components/Nav'
import Bio from '../components/Bio'
import Footer from '../components/Footer'

const Header = Section.extend`
  padding-top: 0 !important;
  background-color: ${props => props.theme.colors.indigo[5]};
  background-image: linear-gradient(
    -2deg,
    ${props => props.theme.colors.violet[4]} 0%,
    ${props => props.theme.colors.indigo[5]} 50%,
    ${props => props.theme.colors.indigo[6]} 100%
  );
`

const Base = Container.extend`
  display: grid;
  grid-gap: 1rem;
  justify-content: center;
  ${mediaQueries[1]} {
    grid-gap: 2rem;
    grid-template-columns: repeat(2, 1fr);
  }
`

export default () => (
  <ThemeProvider>
    <Helmet title="Team – Hack Club" />
    <Header>
      <Nav />
      <Heading.h1 caps mt={3}>
        <Text f={4}>Hack Club</Text>
        <Text f={6}>Team</Text>
      </Heading.h1>
    </Header>
    <Base py={[4, 5]} px={3}>
      <Bio
        img="/people/zach.jpg"
        name="Zach Latta"
        role="Executive Director"
        text="Zach dropped out of high school after his freshman year to work in the technology industry and had over 5 million people using his software by the time he turned 17. He founded Hack Club to build the program he wish he had in high school and has been awarded the Thiel Fellowship and Forbes 30 Under 30 for his work."
        bg="red"
      />
      <Bio
        img="/people/max.jpg"
        name="Max Wofford"
        role="Operations"
        text="Tapping into the hacking community, Max has found a common goal with Hack Club and his passion for amplifying people’s ideas. He loves helping students scale their ideas into even more awesome products."
        bg="yellow"
      />
      <Bio
        img="/people/lachlan.jpg"
        name="Lachlan Campbell"
        role="Web Designer"
        text="Lachlan, a club leader from State College, PA, joined the team to work on Hack Club’s website. They care about bringing coding to more people and making tools to make information more accessible."
        bg="blue"
      />
      <Bio
        img="/people/mingjie.jpg"
        name="Mingjie Jiang"
        role="Social Media"
        text="Mingjie leads a local club at Wootton High School in Rockville, Maryland. Aside from trying to engage more students into the world of hacking, he also cares about building a unique public identity for Hack Club."
        bg="orange"
      />
      <Bio
        img="/people/athul.jpg"
        name="Athul Blesson"
        role="Indian Region"
        text="Athul leads some of the largest Hack Clubs in India. After graduating from high school, he joined as the Regional Manager in India. He is passionate about bringing more students into the world of coding."
        bg="violet"
      />
      <Bio
        img="/people/tom.jpg"
        name="Tom Preston-Werner"
        role="Mentor"
        text="Tom is currently on Hack Club’s board and provides mentorship and connections. He is most prominently known for founding GitHub back in 2008."
        bg="gray"
      />
      <Bio
        img="/people/quinn.jpg"
        name="Quinn Slack"
        role="Mentor"
        text="Quinn is the founder and CEO of Sourcegraph. For the past four years, he has supported Hack Club through mentorship and by providing vital connections."
        bg="gray"
      />
      <Bio
        img="/people/pierre.jpg"
        name="Pierre Arys"
        role="Advisor"
        text="Pierre is the current CEO of Diamond Inc, and has also provided strategic support and connections to Hack Club."
        bg="gray"
      />
    </Base>
    <Container align="center" px={3}>
      <Heading.h2 mt={4}>Contributors</Heading.h2>
      <Text f={3} my={2}>
        People that have contributed significantly to the Hack Club community.
      </Text>
    </Container>
    <Base pt={3} pb={4} px={3}>
      <Bio
        img="/people/samuel.jpg"
        name="Samuel Escapa"
        role="Open-source contributor"
        text="Text here"
        bg="blue"
      />
      <Bio
        img="/people/victor.jpg"
        name="Victor Truong"
        role="Finder"
        bg="blue"
      />
      <Bio img="/people/sean.jpg" name="Sean Kim" role="Shipit" bg="blue" />
      <Bio
        img="/people/jessica.jpg"
        name="Jessica Kwok"
        role="Finances & Curriculum"
        bg="blue"
      />
      <Bio
        img="/people/matt.jpg"
        name="Matt Hesby"
        role="Community Support"
        bg="blue"
      />
      <Bio
        img="/people/jonathan.jpg"
        name="Jonathan Leung"
        role="Co-founder"
        bg="red"
      />
      <Bio
        img="/people/gemma.jpg"
        name="Gemma Busoni"
        role="Community"
        bg="red"
      />
      <Bio
        img="/people/selynna.jpg"
        name="Selynna Sun"
        role="Hack Camp"
        bg="red"
      />
      <Bio
        img="/people/harrison.jpg"
        name="Harrison Shoebridge"
        role="Software Engineer"
        bg="red"
      />
      <Bio
        img="/people/kyle.jpg"
        name="Kyle Emile"
        role="Operations"
        bg="red"
      />
      <Bio
        img="/people/matthew.jpg"
        name="Matthew Kwong"
        role="Growth"
        bg="red"
      />
    </Base>
    <Footer />
  </ThemeProvider>
)
