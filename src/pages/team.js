import React from 'react'
import {
  Section,
  Heading,
  Text,
  Container,
  Button,
  cx
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import Layout from 'components/Layout'
import Nav from 'components/Nav'
import Bio from 'components/Bio'
import Footer from 'components/Footer'

const Header = Section.withComponent('header').extend`
  background: url('/pattern.svg'),
    linear-gradient(
        -64deg,
        ${props => props.theme.colors.orange[5]},
        ${props => props.theme.colors.red[5]}
      )
      repeat;
  clip-path: polygon(0% 0%, 100% 0, 100% 100%, 0 95%);
`

const Base = Container.extend`
  display: grid;
  grid-gap: 1rem;
  ${props => props.theme.mediaQueries.md} {
    grid-gap: 2rem;
    grid-template-columns: repeat(2, 1fr);
  }
`

const Updates = Section.withComponent(Container).extend`
  background: url('/pattern.svg') ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.boxShadows[1]};
  border-radius: ${props => props.theme.radius};
`
const UpdateLink = Button.withComponent(Link)

const title = 'Hack Club Team'
const description =
  'Meet the team that runs Hack Club, a global nonprofit network of high school computer science clubs.'

export default () => (
  <Layout>
    <Helmet
      title={title}
      meta={[
        { name: 'twitter:title', content: title },
        { name: 'description', content: description },
        { name: 'twitter:description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: 'https://hackclub.com/team' }
      ]}
    />
    <style
      children={`body {
        background-image:
          linear-gradient(to bottom,${cx('white')},${cx('snow')});
      }`}
    />
    <Header>
      <Nav style={{ position: 'absolute', top: 0 }} />
      <Container maxWidth={35} align="center">
        <Heading.h1 f={4} regular caps mt={4}>
          Hack Club Team
        </Heading.h1>
        <Heading.h2 f={6}>We the students.</Heading.h2>
        <Text f={3} my={3}>
          We believe in a world where every young person is empowered to be the
          change they want to see in the world. Through Hack Club, we’re working
          hard to make it reality.
        </Text>
      </Container>
    </Header>
    <Base px={3} py={[4, 5]}>
      <Bio
        img="/team/zach.jpg"
        name="Zach Latta"
        role="Executive Director"
        text="Zach dropped out of high school after his freshman year to work in the technology industry and had over 5 million people using his software by the time he turned 17. He founded Hack Club to build the program he wish he had in high school and has been awarded the Thiel Fellowship and Forbes 30 Under 30 for his work."
        bg="red"
      />
      <Bio
        img="/team/max.jpg"
        name="Max Wofford"
        role="Operations"
        text="After teaching himself to code in junior year of high school, Max joined a group of nomadic hackers in Costa Rica to experience coding in a real-world setting. He has been with Hack Club since day one and is now working full-time in San Francisco to grow the movement."
        bg="yellow"
      />
      <Bio
        img="/team/lachlan.jpg"
        name="Lachlan Campbell"
        role="Web Designer"
        text="Lachlan, a club leader from State College, PA, joined the team to work on Hack Club’s website. They care about bringing coding to more people and making tools to make information more accessible."
        bg="blue"
      />
      <Bio
        img="/team/mingjie.jpg"
        name="Mingjie Jiang"
        role="Social Media"
        text="Mingjie leads a local club at Wootton High School in Rockville, Maryland. Aside from trying to engage more students into the world of hacking, he also cares about building a unique public identity for Hack Club."
        bg="orange"
      />
      <Bio
        img="/team/athul.jpg"
        name="Athul Blesson"
        role="Indian Region"
        text="Athul leads some of the largest Hack Clubs in India. After graduating from high school, he joined as the Regional Manager in India, where he actively leads over a dozen clubs."
        bg="violet"
      />
      <Bio
        img="/team/orpheus.jpg"
        name="Prophet Orpheus"
        role="Mascot"
        text="Prophet Orpheus is Hack Club’s mascot who takes the form of a nondescript dinosaur. She is always working to help more students to learn to code, and has always been the most active contributor of Hack Club."
        bg="gray"
      />
    </Base>
    <Updates p={[3, 4]} maxWidth={36} mb={5}>
      <Heading.h2 color="black" f={[4, 5]}>
        What’ve we been doing recently?
      </Heading.h2>
      <UpdateLink to="/updates" bg="info" mt={3}>
        Watch our new monthly update
      </UpdateLink>
    </Updates>
    <Footer />
  </Layout>
)
