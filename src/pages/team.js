import React, { Fragment } from 'react'
import styled from 'styled-components'
import {
  Flex,
  Section,
  Heading,
  Text,
  Container,
  Card,
  Button,
  cx
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Nav from 'components/Nav'
import Name from 'components/Name'
import Bio from 'components/Bio'
import Sheet from 'components/Sheet'
import Footer from 'components/Footer'

const Header = Section.withComponent('header').extend`
  background: url('/pattern.svg'),
    linear-gradient(
        -64deg,
        ${({ theme }) => theme.colors.orange[5]},
        ${({ theme }) => theme.colors.red[5]}
      )
      repeat;
`

const Base = styled(Container)`
  display: grid;
  grid-gap: 1rem;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-gap: 2rem;
    grid-template-columns: repeat(2, 1fr);
  }
`

const Updates = styled(Sheet)`
  display: grid;
  grid-gap: ${({ theme }) => theme.space[3]}px;
  align-items: flex-start;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 1fr auto;
  }
`
const UpdateLink = styled(Button.withComponent(Link)).attrs({
  caps: true,
  scale: true,
  chevronRight: true,
  bg: 'info',
  color: 'white',
  py: 3,
  px: 4,
  f: 2
})``

const title = 'Hack Club Team'
const description =
  'Meet the team that runs Hack Club, a global nonprofit network of high school computer science clubs.'

export default () => (
  <Fragment>
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
        background: ${cx('snow')};
      }`}
    />
    <Nav />
    <Header>
      <Container maxWidth={35} align="center">
        <Heading.h1 f={[3, 4]} regular caps mt={4} mb={2}>
          Hack Club Team
        </Heading.h1>
        <Name f={6}>We the students.</Name>
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
        pronouns="he/him"
      />
      <Bio
        img="/team/max.jpg"
        name="Max Wofford"
        role="Operations"
        text="After teaching himself to code in junior year of high school, Max joined a group of nomadic hackers in Costa Rica to experience coding in a real-world setting. He has been with Hack Club since day one and is now working full-time in San Francisco to grow the movement."
        pronouns="he/him"
      />
      <Bio
        img="/team/lachlan.jpg"
        name="Lachlan Campbell"
        role="Web Designer"
        text="Lachlan, a club leader from State College, PA, joined the team to work on Hack Club’s website. They care about bringing coding to more people and making tools to make information more accessible."
        pronouns="they/them"
      />
      <Bio
        img="/team/mingjie.jpg"
        name="Mingjie Jiang"
        role="Social Media"
        text="Mingjie leads a local club at Wootton High School in Rockville, Maryland. Aside from trying to engage more students into the world of hacking, he also cares about building a unique public identity for Hack Club."
        pronouns="he/him"
      />
      <Bio
        img="/team/athul.jpg"
        name="Athul Blesson"
        role="Indian Region"
        text="Athul leads some of the largest Hack Clubs in India. After graduating from high school, he joined as the Regional Manager in India, where he actively leads over a dozen clubs."
        pronouns="he/him"
      />
      <Bio
        img="/team/orpheus.jpg"
        name="Prophet Orpheus"
        role="Mascot"
        text="Prophet Orpheus is Hack Club’s mascot who takes the form of a nondescript dinosaur. She is always working to help more students to learn to code, and has always been the most active contributor of Hack Club."
        pronouns="she/her"
      />
    </Base>
    <Updates maxWidth={48} align="left" bg="black">
      <Container maxWidth={32} mx={0}>
        <Heading.h2 f={[3, 4]} color="white">
          What’ve we been doing recently?
        </Heading.h2>
        <Text color="smoke">
          Check out our monthly update videos to see our recent work.
        </Text>
      </Container>
      <UpdateLink to="/updates">Watch now</UpdateLink>
    </Updates>
    <Footer />
  </Fragment>
)
