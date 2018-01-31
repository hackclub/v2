import React, { Component, Fragment } from 'react'
import {
  ThemeProvider,
  Box,
  OutlineButton,
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
import MarkdownBody from 'components/MarkdownBody'
import { camelCase } from 'lodash'

const Header = Section.extend`
  padding-top: 0 !important;
  background-image: url(//splattered.now.sh/${props => camelCase(props.name)});

  h1 {
    mix-blend-mode: screen;
    background-color: white;
    color: black;
    padding-left: ${props => props.theme.space[4]}px;
    padding-right: ${props => props.theme.space[4]}px;
    clip-path: polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
  }

  h2 {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.16);
  }
`

OutlineButton.home = OutlineButton.withComponent(Link)

export default ({ data: { markdownRemark } }) => {
  if (markdownRemark) {
    const { frontmatter: { name, description, group }, html } = markdownRemark
    return (
      <ThemeProvider>
        <Helmet title={`${name} – Hack Club`} />
        <Header name={name}>
          <Nav />
          <Heading.h1 f={[5, 6]} mt={[3, 4]} mb={2} children={name} />
          <Heading.h2 f={[3, 4]} regular children={description} />
          <OutlineButton.home to="/workshops" mt={[3, 4]} mb={2} color="white">
            Get More Workshops
          </OutlineButton.home>
        </Header>
        <Container maxWidth={42} p={3}>
          <MarkdownBody dangerouslySetInnerHTML={{ __html: html }} />
        </Container>
        <Footer />
      </ThemeProvider>
    )
  } else {
    return null
  }
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
