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

const Base = Box.withComponent('main').extend`
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

Box.header = Box.withComponent('header')
Box.section = Box.withComponent('section')
Box.article = Box.withComponent('article')

Button.link = Button.withComponent(Link)
A.link = A.withComponent(Link)

const Grid = Box.withComponent('ol').extend`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: ${props => props.theme.space[3]}px;
  counter-reset: li;
  list-style: none;
  padding: 0;
`

const WorkshopCard = Card.withComponent('li').extend`
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${props => props.image});
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.16);
  position: relative;
  height: 100%;
  &:before {
    content: counter(li);
    counter-increment: li;
    box-sizing: border-box;
    position: absolute;
    right: ${props => props.theme.space[3]}px;
    display: inline-block;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 1rem;
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.black};
    font-size: ${props => props.theme.fontSizes[0]}px;
    line-height: 1.5;
    text-align: center;
    text-shadow: none;
    font-weight: bold;
  }
  h3 {
    line-height: 1.125;
    margin-bottom: 0.125rem;
    max-width: 12rem; /* 14rem - padding, leave room for badge */
  }
  p {
    line-height: 1.375;
  }
`

const Workshop = ({ data, ...props }) => (
  <A.link to={data.fields.slug} {...props}>
    <WorkshopCard
      p={3}
      boxShadowSize="md"
      image={`https://splattered.now.sh/${camelCase(data.frontmatter.name)}`}
    >
      <Heading.h3 color="white" f={3} children={data.frontmatter.name} />
      <Text color="snow" f={2} children={data.frontmatter.description} />
    </WorkshopCard>
  </A.link>
)

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
        <Box.article bg="white" py={[4, null, 5]} px={3}>
          <Container maxWidth={48}>
            <Container maxWidth={36} mx={0} mb={4}>
              <Text f={5} color="slate" style={{ lineHeight: '1.25' }}>
                Coding is a superpower. The best way to learn it is by using it.
              </Text>
            </Container>
            {map(groups, (edges, name) => (
              <Box.section mb={4} key={`workshops-${name}`}>
                <Heading.h2 color="black" f={4} mb={1} caps>
                  {capitalize(name)}
                </Heading.h2>
                <Grid>
                  {map(edges, (edge, ii) => (
                    <Workshop
                      data={edge.node}
                      key={`workshops-${name}-${ii}`}
                    />
                  ))}
                </Grid>
              </Box.section>
            ))}
          </Container>
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
