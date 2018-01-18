import React from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  ThemeProvider,
  mediaQueries
} from '@hackclub/design-system'
import { Head, Link } from 'react-static'
import Bio from '../components/Bio'
import Footer from '../components/Footer'
import Nav from '../components/Nav'

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
    grid-gap: 2rem;
    grid-template-columns: repeat(2, 1fr);
  }
`

export default () => (
  <ThemeProvider>
    <Head>
      <title>People – Hack Club</title>
    </Head>
    <Header pb={[3, 4]}>
      <Nav />
      <Heading.h2 color="white" align="center" px={3} caps mt={3}>
        <Box f={4}>The people behind</Box>
        <Box f={6}>Hack Club</Box>
      </Heading.h2>
    </Header>
    <Container align="center" px={3}>
      <Heading.h2 mt={4}>Core</Heading.h2>
      <Text f={3} my={2}>
        The full-time staff and a few select hackers.
      </Text>
    </Container>
    <Base pt={3} pb={4} px={3}>
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
        text="Athul leads some of our largest clubs in India. After graduating from high school, he joined as our Regional Manager in India. He is passionate about bringing more students into the world of coding."
        bg="violet"
      />
    </Base>
    <Container align="center" px={3}>
      <Heading.h2 mt={4}>Advisory Board</Heading.h2>
      <Text f={3} my={2}>
        People providing guidance and wisdom to Hack Club.
      </Text>
    </Container>
    <Base pt={3} pb={4} px={3}>
      <Bio
        img="/people/tom.jpg"
        name="Tom Preston-Werner"
        role="Mentor"
        bg="gray"
      />
      <Bio img="/people/quinn.jpg" name="Quinn Slack" role="Mentor" bg="gray" />
      <Bio
        img="/people/pierre.jpg"
        name="Pierre Arys"
        role="Adviser"
        bg="gray"
      />
    </Base>
    <Container align="center" px={3}>
      <Heading.h2 mt={4}>Contributors</Heading.h2>
      <Text f={3} my={2}>
        People that have contributed significantly to the Hack Club community in
        one way or another.
      </Text>
    </Container>
    <Base pt={3} pb={4} px={3}>
      <Bio
        img="/people/samuel.jpg"
        name="Samuel Escapa"
        role="GitHub Contributor"
        bg="blue"
      />
      <Bio
        img="/people/victor.jpg"
        name="Victor Truong"
        role="Finder"
        bg="violet"
      />
      <Bio img="/people/sean.jpg" name="Sean Kim" role="Shipit" bg="fuschia" />
      <Bio
        img="/people/jessica.jpg"
        name="Jessica Kwok"
        role="Finances & Curriculum"
        bg="green"
      />
      <Bio
        img="/people/matt.jpg"
        name="Matt Hesby"
        role="Community Support"
        bg="cyan"
      />
    </Base>
    <Container align="center" px={3}>
      <Heading.h2 mt={4}>Alumni</Heading.h2>
      <Text f={3} my={2}>
        Former members of the Hack Club staff or core team.
      </Text>
    </Container>
    <Base pt={3} pb={4} px={3}>
      <Bio
        img="/people/jonathan.jpg"
        name="Jonathan Leung"
        role="Co-founder"
        bg="yellow"
      />
      <Bio
        img="/people/gemma.jpg"
        name="Gemma Busoni"
        role="Community"
        bg="pink"
      />
      <Bio
        img="/people/selynna.jpg"
        name="Selynna Sun"
        role="Hack Camp"
        bg="indigo"
      />
      <Bio
        img="/people/harrison.jpg"
        name="Harrison Shoebridge"
        role="Software Engineer"
        bg="teal"
      />
      <Bio
        img="/people/kyle.jpg"
        name="Kyle Emile"
        role="Operations"
        bg="orange"
      />
    </Base>
    <Footer />
  </ThemeProvider>
)
