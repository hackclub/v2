import React, { Component, Fragment } from 'react'
import {
  ThemeProvider,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link as A,
  Section
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import { camelCase, join, map, range } from 'lodash'

const Header = Section.extend`
  padding-top: 0 !important;
  background-image: url(//splattered.now.sh/${props => camelCase(props.name)});

  h1 {
    mix-blend-mode: screen;
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.black};
    padding-left: ${props => props.theme.space[4]}px;
    padding-right: ${props => props.theme.space[4]}px;
    clip-path: polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
  }

  h2 {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.16);
  }
`

const Body = Box.extend`
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.fontSizes[2]};

  a {
    color: ${props => props.theme.colors.info};
  }

  h1:first-child {
    display: none;
  }

  h1,
  h2 {
    padding-bottom: ${props => props.theme.space[2]}px;
    border-bottom: 1px solid ${props => props.theme.colors.smoke};
  }

  hr {
    border: 0;
    height: 4px;
    background-color: ${props => props.theme.colors.primary};
    max-width: ${props => props.theme.space[7]}px;
    margin: ${props => props.theme.space[4]}px auto;
    border-radius: 4px;
  }

  pre,
  code,
  kbd {
    font-family: ${props => props.theme.mono};
    background-color: ${props => props.theme.colors.smoke};
    color: ${props => props.theme.colors.black};
    font-size: inherit;
    br {
      display: none;
    }
  }
  del code {
    text-decoration: inherit;
  }

  code {
    border-radius: 2px;
    padding-left: ${props => props.theme.space[1]}px;
    padding-right: ${props => props.theme.space[1]}px;
  }

  pre {
    word-wrap: normal;
    padding: ${props => props.theme.space[3]}px;
    border-radius: ${props => props.theme.radius};
    > code {
      padding: 0;
      margin: 0;
      word-break: normal;
      white-space: pre;
      background: transparent;
      border: 0;
    }
  }

  .highlight {
    margin-bottom: ${props => props.theme.space[3]}px;

    pre {
      margin-bottom: 0;
      word-break: normal;
    }
  }

  .highlight pre,
  pre {
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
  }

  pre code,
  pre tt {
    display: inline;
    max-width: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    line-height: inherit;
    word-wrap: normal;
    background-color: transparent;
    border: 0;
  }

  ${props =>
    join(
      map(
        range(1, 6),
        level =>
          `h${level} { font-size: ${props.theme.fontSizes[6 - level]}px; }`
      ),
      ''
    )};
`

Button.home = Button.withComponent(Link)

export default ({
  data: { markdownRemark: { frontmatter: { name, description, group }, html } }
}) => {
  return (
    <ThemeProvider>
      <Helmet title={`${name} – Hack Club`} />
      <Header name={name}>
        <Nav />
        <Heading.h1 f={[5, 6]} mt={[3, 4]} mb={2} children={name} />
        <Heading.h2 f={[3, 4]} regular children={description} />
        <Button.home to="/workshops" mt={[3, 4]} mb={2} inverted>
          Get More Workshops
        </Button.home>
      </Header>
      <Container maxWidth={42} p={3}>
        <Body dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
      <Footer />
    </ThemeProvider>
  )
}

export const pageQuery = graphql`
  query WorkshopBySlug($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
      frontmatter {
        name
        description
        group
      }
    }
  }
`
