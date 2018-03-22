import React, { Fragment } from 'react'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link as A,
  Section,
  Text
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

A.link = A.withComponent(Link)

const Base = Box.main.extend`
  display: grid;
  position: relative;
  ${props => props.theme.mediaQueries[1]} {
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
  ${props => props.theme.mediaQueries[1]} {
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

const Super = Text.withComponent('mark').extend`
  background: transparent url(/underline.svg) bottom left no-repeat;
  background-size: 100% 0.5rem;
  padding-bottom: 0.125rem;
`
const SuperButton = Button.withComponent(Link).extend`
  background-color: ${props => props.theme.colors.fuschia[6]};
  background-image: linear-gradient(
    -32deg,
    ${props => props.theme.colors.fuschia[5]},
    ${props => props.theme.colors.red[5]},
    ${props => props.theme.colors.red[6]}
  );
`

const groupOrder = ['start', 'pi', 'experimental', 'misc', 'retired']

export default ({ data: { allMarkdownRemark: { edges } } }) => {
  const groups = groupBy(edges, 'node.frontmatter.group')

  // sort groups based on groupOrder
  const sortedGroups = toPairs(groups).sort((a, b) => {
    // if a group isn't found in groupOrder, ensure it appears last in the
    // sorted list
    if (groupOrder.indexOf(a[0]) === -1) {
      return 1
    } else if (groupOrder.indexOf(b[0]) === -1) {
      return -1
    }

    return groupOrder.indexOf(a[0]) - groupOrder.indexOf(b[0])
  })

  const title = 'Hack Club Workshops'
  const desc =
    'Get coding tutorials, project ideas, and programming club activities.'

  return (
    <Fragment>
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: desc },
          { property: 'og:title', content: title },
          { name: 'twitter:title', content: title },
          { property: 'og:description', content: desc },
          { name: 'twitter:description', content: desc },
          { property: 'og:site_name', content: 'Hack Club Workshops' },
          { property: 'og:url', content: 'https://hackclub.com/workshops' },
          { name: 'twitter:site', content: '@starthackclub' }
        ]}
      />
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
            <Heading.h2 f={4} regular>
              Learn to code through building projects.
            </Heading.h2>
          </Box.header>
        </Background>
        <Box.article bg="white">
          <Container maxWidth={48} py={[4, 5]} px={3}>
            <Flex
              flexDirection={['column', null, null, 'row']}
              justify="space-between"
              align="flex-start"
              mb={[3, 4]}
            >
              <Container mx={0} maxWidth={32}>
                <Text
                  f={[4, 5]}
                  align="left"
                  color="slate"
                  style={{ lineHeight: '1.25' }}
                >
                  Coding is a <Super color="warning">superpower</Super>.<br />
                  So let’s start building.
                </Text>
              </Container>
              <SuperButton
                my={2}
                to="/philosophy"
                children="Our philosophy »"
              />
            </Flex>
            {sortedGroups.map(group => {
              const name = group[0]
              const edges = group[1]

              return (
                <Workshops key={`workshops-${name}`} name={name} data={edges} />
              )
            })}
          </Container>
          <Footer />
        </Box.article>
      </Base>
    </Fragment>
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
