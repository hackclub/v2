import React, { Component, Fragment } from 'react'
import {
  ThemeProvider,
  Box,
  Container,
  Flex,
  Heading,
  Link as A,
  Text,
  Section
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import MarkdownBody from 'components/MarkdownBody'
import { camelCase } from 'lodash'

function generateSubtitle(description, authorText) {
  if (!authorText) {
    return description
  }

  // This iterates over each word in authorText, finds GitHub usernames (any
  // text that looks like "@orpheus", and turns them into links.
  const parsedAuthorText = authorText.split(' ').map((word, index, arr) => {
    let processedWord;

    const matches = word.match(/@(\w+)/)

    if (matches) {
      const username = matches[1]

      processedWord = (
        <A href={`https://github.com/${username}`}
           target="_blank"
           color="white">
           {word}
        </A>
      )
    } else {
      processedWord = word
    }

    // This pads returned results with spaces, making our final array look the
    // following:
    //
    //   [ 'Hack', ' ', 'Club', ' ', 'staff' ]
    //
    if (index === arr.length - 1) { 
      // if last item in array, don't give an extra space
      return processedWord
    } else {
      return [processedWord, ' ']
    }
  })

  return (
    <React.Fragment>
      {description}. Created by {parsedAuthorText}.
    </React.Fragment>
  )
}

const Name = Heading.h1.extend`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.32);
  clip-path: polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%);
  color: black;
  display: inline-block;
  mix-blend-mode: screen;
  padding-left: ${props => props.theme.space[4]}px;
  padding-right: ${props => props.theme.space[4]}px;
  width: max-content;
`

const Desc = Heading.h2.extend`
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.32);
`

const Body = Container.withComponent(MarkdownBody)
A.link = A.withComponent(Link)
Section.h = Section.withComponent('header')

export default ({ data: { markdownRemark } }) => {
  if (markdownRemark) {
    const {
      fields: { slug, bg },
      frontmatter: { name, description, author, group },
      html
    } = markdownRemark

    const subtitle = generateSubtitle(description, author)

    const title = `${name} – Hack Club Workshops`
    const desc = `${description}. Read the tutorial on Hack Club Workshops.`
    return (
      <ThemeProvider>
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: desc },
            { property: 'og:title', content: title },
            { name: 'twitter:title', content: title },
            { property: 'og:description', content: desc },
            { name: 'twitter:description', content: desc },
            { property: 'og:site_name', content: 'Hack Club Workshops' },
            { property: 'og:url', content: `https://hackclub.com${slug}` },
            { name: 'twitter:card', content: 'summary' }
          ]}
        />
        <Section.h
          bg="accent"
          p={0}
          style={{ backgroundImage: `url('${bg}')` }}
        >
          <Nav style={{ position: 'absolute', top: 0 }} />
          <Container mt={4} mb={3} px={3}>
            <Flex align="center" justify="center" my={3}>
              <A.link
                to="/workshops"
                color="white"
                f={3}
                bold
                caps
                children="Workshops"
              />
              <Text.span mx={2} color="snow" f={3} children="›" />
              <A.link
                to={`/workshops#${group}`}
                color="white"
                f={3}
                caps
                children={group}
              />
            </Flex>
            <Name f={[5, 6]} mb={2} children={name} />
            <Desc f={[3, 4]} regular children={subtitle} />
          </Container>
        </Section.h>
        <Body maxWidth={48} p={3} dangerouslySetInnerHTML={{ __html: html }} />
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
      fields {
        slug
        bg
      }
      frontmatter {
        name
        description
        author
        group
      }
    }
  }
`
