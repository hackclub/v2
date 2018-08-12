import React, { Fragment } from 'react'
import styled from 'styled-components'
import {
  Box,
  LargeButton,
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
import IconButton from 'components/IconButton'
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

const Base = styled(Box.main)`
  position: relative;
`

const Background = styled(Section)`
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.red[5]};
  background-image: url('/pattern.svg'),
    linear-gradient(
      -86deg,
      ${({ theme }) => theme.colors.orange[5]},
      ${({ theme }) => theme.colors.red[5]},
      ${({ theme }) => theme.colors.red[6]}
    );
  color: ${({ theme }) => theme.colors.white};
`

const attrs = {
  is: LargeButton.withComponent(Link),
  m: 2,
  scale: true,
  chevronRight: true,
  py: 3,
  px: 4,
  f: 2
}
const SubmitButton = styled(IconButton).attrs(attrs)`
  text-transform: uppercase;
  background-image: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.cyan[6]},
    ${({ theme }) => theme.colors.blue[6]}
  );
`
const PhilosophyButton = styled(IconButton).attrs(attrs)`
  text-transform: uppercase;
  background-image: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.yellow[5]},
    ${({ theme }) => theme.colors.orange[5]}
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
      <Nav color="white" />
      <Base>
        <Background p={3}>
          <Box.header align="center" pt={[4, 3]} pb={[3, 0]}>
            <Name f={6}>Workshops</Name>
            <Text color="red.0" f={[3, 4]} mt={2} bold caps>
              By Hack Club
            </Text>
            <Text
              f={[3, 4]}
              color="white"
              mx="auto"
              mt={2}
              mb={3}
              style={{ lineHeight: '1.25', maxWidth: '36rem' }}
            >
              Learn to code with this collection of community-contributed,
              self-guided coding tutorials + ideas.
            </Text>
            <SubmitButton
              name="new"
              to="/workshops/submit"
              children="Submit your own"
            />
            <PhilosophyButton
              name="notes"
              to="/philosophy"
              children="Our philosophy"
            />
          </Box.header>
        </Background>
        <WorkshopSearch workshops={edges} />
        <Footer />
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
