import React from 'react'
import styled from 'styled-components'
import { Box, LargeButton, Section, Text, theme } from '@hackclub/design-system'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from 'components/Layout'
import Nav from 'components/Nav'
import Name from 'components/Name'
import IconButton from 'components/IconButton'
import Footer from 'components/Footer'
import WorkshopSearch from 'components/workshops/WorkshopSearch'

const Base = styled(Box.main)`
  position: relative;
`

const Background = styled(Section)`
  background-color: ${theme.colors.indigo[5]};
  background-image: url('/pattern.svg'),
    linear-gradient(
      -64deg,
      ${theme.colors.indigo[5]},
      ${theme.colors.violet[5]},
      ${theme.colors.violet[6]}
    );
`

const attrs = {
  is: LargeButton.withComponent(Link),
  m: 2,
  scale: true,
  py: 3,
  px: 4,
  fontSize: 2
}
const SubmitButton = styled(IconButton).attrs(attrs)`
  text-transform: uppercase;
  background-image: linear-gradient(
    to bottom,
    ${theme.colors.cyan[6]},
    ${theme.colors.blue[6]}
  );
`
const PhilosophyButton = styled(IconButton).attrs({
  is: LargeButton.withComponent(Link),
  m: 2,
  scale: true,
  py: 3,
  px: 4,
  fontSize: 2
})`
  text-transform: uppercase;
  background-image: linear-gradient(
    to bottom,
    ${theme.colors.orange[5]},
    ${theme.colors.red[5]}
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
  const img = 'https://hackclub.com/cards/workshops.png'

  return (
    <Layout>
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
      <Nav />
      <Base>
        <Background px={3} pt={4}>
          <Box.header align="center" pt={[4, 5, 6]} pb={3}>
            <Name fontSize={6}>Workshops</Name>
            <Text color="violet.0" fontSize={[3, 4]} mt={2} bold caps>
              By Hack Club
            </Text>
            <Text
              fontSize={[3, 4]}
              color="white"
              mx="auto"
              mt={[2, 3]}
              mb={3}
              style={{ lineHeight: '1.25', maxWidth: '36rem' }}
            >
              Learn to code with this collection of community-contributed,
              self-guided coding tutorials + ideas.
            </Text>
            <SubmitButton
              glyph="post"
              to="/workshops/drafts"
              children="Submit your own"
              bg="cyan.6"
            />
            <PhilosophyButton
              glyph="quote"
              to="/philosophy"
              children="Our philosophy"
            />
          </Box.header>
        </Background>
        <WorkshopSearch workshops={edges} />
        <Footer />
      </Base>
    </Layout>
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
