import React, { Fragment } from 'react'
import {
  ThemeProvider,
  Box,
  Button,
  Container,
  BackgroundImage,
  Flex,
  Heading,
  OutlineButton,
  Link as A,
  Section,
  Text,
  mediaQueries
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Workshops from 'components/Workshops'
import {
  groupBy,
  orderBy,
  camelCase,
  map,
  fromPairs,
  reverse,
  toPairs
} from 'lodash'

Box.main = Box.withComponent('main')
Box.header = Box.withComponent('header')
Box.section = Box.withComponent('section')
Box.article = Box.withComponent('article')

Button.link = Button.withComponent(Link)
A.link = A.withComponent(Link)

const Base = Box.main.extend`
  display: grid;
  position: relative;
  ${mediaQueries[1]} {
    grid-template-columns: 24rem 1fr;
  }
`

const Background = Section.extend`
  justify-content: flex-start;
  background-color: ${props => props.theme.colors.red[5]};
  background-image: linear-gradient(
    -16deg,
    ${props => props.theme.colors.orange[4]} 0%,
    ${props => props.theme.colors.red[5]} 50%,
    ${props => props.theme.colors.red[6]} 100%
  );
  ${mediaQueries[1]} {
    min-height: 100vh;
  }
`

const Name = Heading.h1.extend`
  mix-blend-mode: screen;
  background-color: white;
  color: black;
  display: inline-block;
  padding-left: ${props => props.theme.space[3]}px;
  padding-right: ${props => props.theme.space[3]}px;
  clip-path: polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
`

export default ({ data: { allMarkdownRemark: { edges } } }) => {
  let groups = groupBy(edges, 'node.frontmatter.group')
  // hack to reverse sorting order of groups
  groups = fromPairs(reverse(toPairs(groups)))
  return (
    <ThemeProvider>
      <Helmet title="Workshops – Hack Club" />
      <Nav
        style={{ position: 'absolute', top: 0 }}
        color={['white', null, 'primary']}
      />
      <Base>
        <Background px={4}>
          <Box.header align="center" pt={[4, null, 6]} pb={3}>
            <Text f={4} bold caps>
              Hack Club
            </Text>
            <Name mt={2} mb={3} f={6}>
              Workshops
            </Name>
            <Heading.h2 f={4} mb={4} regular>
              Learn to code through building projects.
            </Heading.h2>
            <Button
              href="https://github.com/hackclub/hackclub/blob/master/workshops/CONTRIBUTING.md"
              target="_blank"
              inverted
            >
              Contribute
            </Button>
          </Box.header>
        </Background>
        <Box.article bg="white">
          <Container maxWidth={48} py={[4, null, 5]} px={3}>
            <Flex
              flexDirection={['column', null, null, 'row']}
              alignItems="center"
              justify="space-between"
              mb={[2, null, 4]}
            >
              <Container mx={0} maxWidth={32}>
                <Text f={5} color="slate" style={{ lineHeight: '1.25' }}>
                  Coding is a superpower. The best way to learn it is by using
                  it.
                </Text>
              </Container>
              <Box py={3}>
                <Button
                  bg="info"
                  inverted
                  href="https://github.com/hackclub/hackclub/blob/master/workshops/README.md"
                  target="_blank"
                >
                  Read more →
                </Button>
              </Box>
            </Flex>
            {map(groups, (edges, name) => (
              <Workshops key={`workshops-${name}`} name={name} data={edges} />
            ))}
          </Container>
          <Footer />
        </Box.article>
      </Base>
    </ThemeProvider>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      filter: { frontmatter: { name: { ne: null } } }
      sort: { fields: [frontmatter___order], order: ASC }
      limit: 1024
    ) {
      edges {
        node {
          fields {
            slug
            bg
          }
          frontmatter {
            name
            description
            group
            order
          }
        }
      }
    }
  }
`
