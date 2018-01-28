import React, { Fragment } from 'react'
import {
  ThemeProvider,
  Box,
  Button,
  Card,
  Container,
  BackgroundImage,
  Flex,
  Heading,
  LargeButton,
  Link as A,
  Section,
  Text
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import {
  groupBy,
  orderBy,
  capitalize,
  camelCase,
  map,
  fromPairs,
  reverse,
  toPairs
} from 'lodash'

const Header = Section.extend`
  padding-top: 0 !important;
  position: relative;
  background-color: ${props => props.theme.colors.red[5]};
  background-image: linear-gradient(
    -16deg,
    ${props => props.theme.colors.orange[4]} 0%,
    ${props => props.theme.colors.red[5]} 50%,
    ${props => props.theme.colors.red[6]} 100%
  );
`

const Group = Box.withComponent('section')

Button.link = Button.withComponent(Link)
A.link = A.withComponent(Link)
Card.img = Card.withComponent(BackgroundImage).extend`
  text-shadow: 0 1px 2px rgba(0,0,0,.16);
`

const Grid = Box.withComponent('article').extend`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  grid-gap: ${props => props.theme.space[3]}px;
`

const WorkshopCard = ({ data, ...props }) => (
  <A.link to={data.fields.slug} {...props}>
    <Card.img
      p={3}
      boxShadowSize="md"
      image={`https://splattered.now.sh/${camelCase(data.frontmatter.name)}`}
    >
      <Heading.h3 color="white" f={3} children={data.frontmatter.name} />
      <Text color="snow" f={2} children={data.frontmatter.description} />
    </Card.img>
  </A.link>
)

export default ({ data: { allMarkdownRemark: { edges } } }) => {
  let groups = groupBy(edges, 'node.frontmatter.group')
  // hack to reverse sorting order of groups
  groups = fromPairs(reverse(toPairs(groups)))
  return (
    <ThemeProvider>
      <Helmet title="Workshops – Hack Club" />
      <Header>
        <Nav />
        <Heading.h1 align="center" mt={3} mb={2}>
          <Text f={4} caps>
            Hack Club
          </Text>
          <Text f={6}>Workshops</Text>
        </Heading.h1>
        <Heading.h2 f={3} regular>
          Learn to code through building projects.
        </Heading.h2>
      </Header>
      <Container maxWidth={56} px={3} pb={5}>
        {map(groups, (edges, name) => (
          <Group>
            <Heading.h2 f={4} mt={4} mb={2} caps>
              {capitalize(name)}
            </Heading.h2>
            <Grid>
              {map(edges, (edge, i) => (
                <WorkshopCard data={edge.node} key={`workshops-${name}-${i}`} />
              ))}
            </Grid>
          </Group>
        ))}
      </Container>
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
