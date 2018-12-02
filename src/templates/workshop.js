import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import {
  Box,
  Container,
  Flex,
  Heading,
  Link as A,
  Text,
  Section,
  Image,
  theme
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Nav from 'components/Nav'
import {
  Breadcrumbs,
  Breadcrumb,
  BreadcrumbDivider
} from 'components/Breadcrumbs'
import Invert from 'components/Invert'
import IconButton from 'components/IconButton'
import MarkdownBody from 'components/MarkdownBody'
import FeedbackForm from 'components/workshops/FeedbackForm'
import Carousel from 'components/workshops/Carousel'
import DiscussOnSlack from 'components/DiscussOnSlack'
import ShareButton from 'components/ShareButton'
import Sheet from 'components/Sheet'
import Footer from 'components/Footer'
import { isEmpty } from 'lodash'
import { org } from 'data.json'

const NotOnPrint = styled(Box)`
  @media print {
    display: none !important;
  }
`

const OnlyOnPrint = styled(Box)`
  display: none !important;
  @media print {
    display: block !important;
  }
`

const Header = styled(Box.withComponent('header'))`
  li a,
  h2,
  p {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.375);
  }
`

const Name = styled(Heading.h1)`
  background-color: ${theme.colors.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  clip-path: polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%);
  color: black;
  display: inline-block;
  mix-blend-mode: screen;
  padding-left: ${theme.space[4]}px;
  padding-right: ${theme.space[4]}px;
  width: min-content;
  ${theme.mediaQueries.sm} {
    width: max-content;
  }
`

const Body = styled(Container.withComponent(MarkdownBody))`
  @media print {
    max-width: none !important;
  }
`
A.link = A.withComponent(Link)
Section.h = Section.withComponent('header')

const linkAuthor = authorText => {
  if (isEmpty(authorText)) return null
  // This iterates over each word in authorText, finds GitHub usernames (any
  // text that looks like "@orpheus", and turns them into links.
  const parsedAuthorText = authorText.split(' ').map((word, index, arr) => {
    const matches = word.match(/@(\w+)/)
    const processedWord = matches ? (
      <A
        href={`https://github.com/${matches[1]}`}
        target="_blank"
        color="inherit"
        children={word}
      />
    ) : (
      word
    )

    // This pads returned results with spaces, making our final array look the
    // following:
    //   [ 'Hack', ' ', 'Club', ' ', 'staff' ]
    // if last item in array, don't give an extra space
    return index === arr.length - 1 ? processedWord : [processedWord, ' ']
  })

  return <Fragment>Created by {parsedAuthorText}</Fragment>
}

const CardsSection = styled(Box)`
  background-image: linear-gradient(
    to bottom,
    ${theme.colors.white},
    ${theme.colors.snow}
  );
`

const Cards = styled(Container.withComponent(NotOnPrint))`
  text-align: center;
  display: grid;
  grid-gap: ${theme.space[4]}px;
  grid-template-areas: 'feedback' 'share' 'questions' 'contribute';
  width: 100%;

  > div {
    &:nth-child(1) {
      grid-area: feedback;
    }
    &:nth-child(2) {
      grid-area: share;
    }
    &:nth-child(3) {
      grid-area: questions;
    }
    &:nth-child(3) {
      grid-area: contribute;
    }
  }

  ${theme.mediaQueries.md} {
    grid-template-areas:
      'feedback feedback share share'
      'feedback feedback questions contribute';
  }

  ${Sheet} {
    background: ${theme.colors.white};
    margin-bottom: 0 !important;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  textarea {
    resize: vertical;
  }
`

const githubEditUrl = slug =>
  `https://github.com/hackclub/hackclub/edit/master${slug}/README.md`
const twitterURL = (text, url) =>
  `https://twitter.com/intent/tweet?text=${text
    .split(' ')
    .join('%20')}&url=${url}`
const facebookURL = (text, url) =>
  `https://www.facebook.com/sharer/sharer.php?u=${url}`

const makeUrl = (domain, slug) => `https://${domain}${slug}`

export default ({ data }) => {
  if (isEmpty(data)) return null

  const {
    fields: { slug, bg },
    frontmatter: { name, description, author = '', group = 'start', order = 1 },
    html
  } = data.markdownRemark

  const authorUsername = (author || '').match(/@(\S+)/)
    ? author.replace('@', '')
    : 'hackclub'
  const authorUrl = makeUrl('github.com', authorUsername)

  const title = `${name} – Hack Club Workshops`
  const d = description.charAt(0).toUpperCase() + description.slice(1)
  const desc = `Free coding tutorial for ${d}, published on Hack Club Workshops.`
  const img = 'https://hackclub.com/cards/workshops.png'
  const url = makeUrl('hackclub.com', slug)

  const schema = {
    '@context': 'http://schema.org',
    '@type': 'HowTo',
    headline: name,
    image: [makeUrl('hackclub.com', bg)],
    author: {
      '@type': 'Person',
      name: author,
      url: authorUrl
    },
    publisher: org,
    url,
    description,
    genre: group,
    position: order,
    educationalUse: 'assignment',
    isAccessibleForFree: true,
    potentialAction: {
      '@type': 'CreateAction',
      result: {
        '@type': 'CreativeWork',
        name
      }
    }
  }

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
          {
            property: 'og:site_name',
            content: 'Hack Club Workshops'
          },
          { property: 'og:url', content: url }
        ]}
      >
        <script type="application/ld+json" children={JSON.stringify(schema)} />
      </Helmet>
      <Nav />
      <NotOnPrint>
        <Header
          bg="accent"
          color="white"
          p={0}
          align="center"
          style={{
            backgroundImage: `url('${bg}')`,
            position: 'relative'
          }}
        >
          <Container pt={5} pb={3} px={2}>
            <Breadcrumbs align="center" justify="center" mt={3} mb={2} wrap>
              <Breadcrumb to="/workshops" name="All Workshops" position={1} />
              <BreadcrumbDivider />
              <Breadcrumb
                to={`/workshops#${group}`}
                name={group}
                position={2}
              />
              <BreadcrumbDivider />
            </Breadcrumbs>
            <Name f={6} mb={3} children={name} />
            <Heading.h2 f={4} children={description} />
            <Text f={2} caps mt={3} children={linkAuthor(author)} />
          </Container>
          <Flex w={1} p={3} justify="space-between">
            <Invert f={2} my={1} />
            <IconButton
              bg="slate"
              glyph="edit"
              children="Edit"
              inverted
              href={githubEditUrl(slug)}
              target="_blank"
              f={2}
              my={1}
            />
          </Flex>
        </Header>
      </NotOnPrint>
      {group == 'start' ? (
        <Carousel slug={slug.replace('/workshops/', '')} />
      ) : null}
      <OnlyOnPrint p={3}>
        <Flex align="center" justify="flex-end" my={3}>
          <Image
            src="/logo-red.svg"
            w={`${theme.space[6]}px`}
            mr={3}
            alt="Hack Club logo"
          />
          <strong>Computer Science Tutorials</strong>
        </Flex>
        <Heading.h1 mt={4} mb={3} children={name} />
        <Heading.h2 f={4} children={description} />
        <Text color="muted" my={3} children={linkAuthor(author)} />
        <Text color="muted">
          You can find this tutorial online at <u>{url}</u>
        </Text>
      </OnlyOnPrint>
      <Box w={1} className="invert">
        <Body maxWidth={48} p={3} dangerouslySetInnerHTML={{ __html: html }} />
        <CardsSection py={4}>
          <Cards px={3}>
            <Sheet align="left">
              <Heading.h2 f={4}>How was this workshop?</Heading.h2>
              <Text color="muted" f={1} mt={1} mb={3}>
                (your feedback is anonymous + appreciated ❤️)
              </Text>
              <FeedbackForm slug={slug} />
            </Sheet>
            <Sheet>
              <Heading.h2 f={4} color="black" mb={3}>
                Made something fabulous?
              </Heading.h2>
              <Flex justify="center">
                <ShareButton
                  service="Twitter"
                  href={twitterURL(
                    `I just built ${name} with a @hackclub workshop. Make yours:`,
                    url
                  )}
                  bg="#1da1f2"
                  mr={3}
                />
                <ShareButton
                  service="Facebook"
                  href={facebookURL(url)}
                  bg="#3b5998"
                />
              </Flex>
            </Sheet>
            <Sheet>
              <Heading.h2 f={4} color="pink.5" mb={3}>
                Questions?
              </Heading.h2>
              <DiscussOnSlack f={2} />
            </Sheet>
            <Sheet>
              <Heading.h2 f={4} color="black" mb={3}>
                Spotted an issue?
              </Heading.h2>
              <ShareButton
                service="GitHub"
                bg="slate"
                f={2}
                href={githubEditUrl(slug)}
                target="_blank"
                aria-label={null}
                children="Suggest edits"
                title="If you see something, say something."
              />
            </Sheet>
          </Cards>
        </CardsSection>
        <Footer />
      </Box>
    </Fragment>
  )
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
        order
      }
    }
  }
`
