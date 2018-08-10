import React, { Fragment } from 'react'
import {
  Box,
  Button,
  Container,
  Card,
  Flex,
  Heading,
  Link as A,
  Section,
  Text
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Nav from 'components/Nav'
import Name from 'components/Name'
import Footer from 'components/Footer'
import Track from 'components/workshops/Track'
import WorkshopSearch from 'components/workshops/WorkshopSearch'
import {
  groupBy,
  orderBy,
  camelCase,
  map,
  fromPairs,
  reverse,
  toPairs
} from 'lodash'

A.link = A.withComponent(Link)

const Base = Box.main.extend`
  display: grid;
  position: relative;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 20rem 1fr;
  }
`

const Background = Section.extend`
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.red[5]};
  background-image: url('/pattern.svg'),
    linear-gradient(
      -86deg,
      ${({ theme }) => theme.colors.orange[5]},
      ${({ theme }) => theme.colors.red[5]},
      ${({ theme }) => theme.colors.red[6]}
    );
  ${({ theme }) => theme.mediaQueries.md} {
    min-height: 100vh;
  }
`

const Super = Text.withComponent('mark').extend`
  background: transparent url(/underline.svg) bottom left no-repeat;
  background-size: 100% 0.5rem;
  padding-bottom: 0.125rem;
`
const SuperButton = Button.withComponent(Link).extend`
  background-color: ${({ theme }) => theme.colors.fuschia[6]};
  background-image: linear-gradient(
    -32deg,
    ${({ theme }) => theme.colors.fuschia[5]},
    ${({ theme }) => theme.colors.red[5]},
    ${({ theme }) => theme.colors.red[6]}
  );
`

export default ({
  data: {
    allMarkdownRemark: { edges }
  }
}) => {
  const title = 'Hack Club Workshops'
  const desc =
    'Get free coding tutorials, project ideas, and programming club activities from Hack Club, a community of high school developers.'
  const img = 'https://hackclub.com/workshops.png'

  return (
    <Fragment>
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: desc },
          { name: 'twitter:title', content: title },
          { name: 'twitter:description', content: desc },
          { name: 'twitter:image', content: img },
          { property: 'og:title', content: title },
          { property: 'og:description', content: desc },
          { property: 'og:image', content: img },
          { property: 'og:site_name', content: 'Hack Club Workshops' },
          { property: 'og:url', content: 'https://hackclub.com/workshops' }
        ]}
      />
      <Nav color="muted" fixed />
      <Base>
        <Background p={[3, 2]}>
          <Box.header align="center" mt={[4, 5]}>
            <Name f={6}>Workshops</Name>
            <Text f={[3, 4]} mt={2} mb={3} bold caps>
              By Hack Club
            </Text>
            <Heading.h2 color="red.0" f={4} px={2} regular mb={[4, 5]}>
              Making leads to learning.
            </Heading.h2>
            <Card bg="red.0" p={3} boxShadowSize="md">
              <Text f={4} color="red.6" style={{ lineHeight: '1.25' }}>
                Coding is a <Super color="warning">superpower</Super>.<br />
                So let’s start building.
              </Text>
              <SuperButton
                mt={3}
                to="/philosophy"
                children="Our philosophy »"
              />
            </Card>
          </Box.header>
        </Background>
        <Box.article bg="white" pt={3}>
          <Container maxWidth={48} pt={[3, 5]} pb={[4, 5]} px={3}>
            <Text
              color="black"
              f={4}
              mb={4}
              style={{ lineHeight: '1.25', maxWidth: '42rem' }}
            >
              Learn to code with this collection of community-contributed,
              self-guided coding tutorials and project ideas.{' '}
              <A.link to="/workshops/submit">Write one »</A.link>
            </Text>
            <WorkshopSearch workshops={edges} />
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
