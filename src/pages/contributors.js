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

const Header = Section.extend`
  padding-top: 0 !important;
  background-color: ${props => props.theme.colors.blue[5]};
  background-image: linear-gradient(
    -8deg,
    ${props => props.theme.colors.violet[4]} 0%,
    ${props => props.theme.colors.fuschia[6]} 50%,
    ${props => props.theme.colors.fuschia[7]} 100%
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
    <Helmet title="Contributors – Hack Club" />
    <Header pb={[3, 4]}>
      <Nav />
      <Heading.h1 caps mt={3}>
        <Text f={4}>Hack Club</Text>
        <Text f={6}>Contributors</Text>
      </Heading.h1>
    </Header>
    <Base py={[4, 5]} px={3}>
      <Bio
        img="/people/gemma.jpg"
        name="Gemma Busoni"
        role="Community"
        text="Text here"
        bg="pink"
      />
      <Bio
        img="/people/selynna.jpg"
        name="Selynna Sun"
        role="Hack Camp"
        text="Text here"
        bg="red"
      />
      <Bio
        img="/people/harrison.jpg"
        name="Harrison Shoebridge"
        role="Software Engineer"
        text="Text here"
        bg="yellow"
      />
      <Bio
        img="/people/kyle.jpg"
        name="Kyle Emile"
        role="Operations"
        text="Text here"
        bg="orange"
      />
      <Bio
        img="/people/samuel.jpg"
        name="Samuel Escapa"
        role="Role here"
        text="Text here"
        bg="blue"
      />
      <Bio
        img="/people/victor.jpg"
        name="Victor Truong"
        role="Finder"
        text="Victor believes that communities are a very powerful thing. That's why he built Hack Club Finder, a tool which simplifies the process of discovering and communicating with Hack Clubs near users. Since December 2017, it has helped thousands of people locate clubs."
        bg="violet"
      />
      <Bio
        img="/people/jessica.jpg"
        name="Jessica Kwok"
        role="Role here"
        text="Text here"
        bg="green"
      />
      <Bio
        img="/people/matt.jpg"
        name="Matt Hesby"
        role="Role here"
        text="Text here"
        bg="cyan"
      />
    </Base>
    <Footer />
  </ThemeProvider>
)
