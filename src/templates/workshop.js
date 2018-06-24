import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import {
  Box,
  Container,
  Flex,
  Heading,
  Link as A,
  Text,
  Section,
  Card,
  Image,
  theme
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
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
import DiscussOnSlack from 'components/DiscussOnSlack'
import ShareButton from 'components/ShareButton'
import Footer from 'components/Footer'
import { isEmpty } from 'lodash'
import { org } from 'data.json'

const NotOnPrint = Box.extend`
  @media print {
     {
      display: none !important;
    }
  }
`

const OnlyOnPrint = Box.extend`
  display: none !important;
  @media print {
     {
      display: initial !important;
    }
  }
`

const Header = Box.withComponent('header').extend`
  li a,
  h2,
  p {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.32);
  }
`

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

const Body = Container.withComponent(MarkdownBody)
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

const Cards = Container.extend`
  text-align: center;
  display: grid;
  grid-gap: ${props => props.theme.space[4]}px;
  grid-template-areas: 'feedback' 'share' 'questions' 'contribute';
  width: 100%;

  > div {
    max-width: 100%;

    &:nth-child(1) {
      grid-area: feedback;
      border-radius: ${props => props.theme.radius};
      box-shadow: ${props => props.theme.boxShadows[1]};
    }
    &:nth-child(2) {
      grid-area: share;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom: 1px solid ${props => props.theme.colors.smoke};
    }
    &:nth-child(3) {
      grid-area: questions;
    }
    &:nth-child(3) {
      grid-area: contribute;
    }
  }

  ${props => props.theme.mediaQueries.md} {
    grid-template-areas:
      'feedback feedback share share'
      'feedback feedback questions contribute';
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
  const l = description.charAt(0).toUpperCase() + description.slice(1)
  const desc = `Free coding tutorial for ${l}, published on Hack Club Workshops.`
  const img = 'https://hackclub.com/workshops.png'
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
          { property: 'og:site_name', content: 'Hack Club Workshops' },
          { property: 'og:url', content: url }
        ]}
      >
        <script type="application/ld+json" children={JSON.stringify(schema)} />
        }
      </Helmet>
      <NotOnPrint>
        <Header
          bg="accent"
          color="white"
          p={0}
          align="center"
          className="invert"
          style={{ backgroundImage: `url('${bg}')`, position: 'relative' }}
        >
          <Nav style={{ position: 'absolute', top: 0 }} />
          <Container pt={5} pb={3} px={2}>
            <Breadcrumbs align="center" justify="center" my={3} wrap>
              <Breadcrumb to="/workshops" name="Workshops" position={1} />
              <BreadcrumbDivider />
              <Breadcrumb
                to={`/workshops#${group}`}
                name={group}
                position={2}
              />
              <BreadcrumbDivider />
              <Breadcrumb to={url} name={name} position={3} bold={false} />
            </Breadcrumbs>
            <Name f={6} mb={2} children={name} />
            <Heading.h2 f={4} children={description} />
            <Text f={2} caps mt={3} children={linkAuthor(author)} />
          </Container>
          <Flex w={1} p={3} justify="space-between">
            <Invert f={2} my={1} />
            <IconButton
              bg="slate"
              name="edit"
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
      <OnlyOnPrint>
        <Text align="right">
          <Image
            src="/logo-red.svg"
            w={`${theme.space[6]}px`}
            style={{ display: 'inline' }}
            alt="Hack Club logo"
          />{' '}
          <strong>Computer Science Tutorials</strong>
        </Text>
        <Heading.h1 pt={4}>{name}</Heading.h1>
        <Heading.h4 color="gray.7">{description}</Heading.h4>
        <Text color="gray.5">{linkAuthor(author)}</Text>
        <Text color="gray.9" py={2}>
          You can find this tutorial online at <em>{url}</em>
        </Text>
        <hr />
      </OnlyOnPrint>
      <Body maxWidth={48} p={3} dangerouslySetInnerHTML={{ __html: html }} />
      <Cards maxWidth={56} p={3} mb={5}>
        <Card bg="blue.0" p={[3, 4]} align="left">
          <Heading.h2 f={3} color="blue.8" caps>
            How was this workshop?
          </Heading.h2>
          <Text color="muted" f={1} mt={1} mb={3}>
            (your feedback is anonymous + appreciated 💙)
          </Text>
          <FeedbackForm slug={slug} />
        </Card>
        <Box p={3}>
          <Heading.h2 f={3} color="muted" caps>
            Made something rad?
          </Heading.h2>
          <Heading.h2 color="info" f={5} mb={3}>
            Share it! 🌟
          </Heading.h2>
          <Flex justify="center">
            <ShareButton
              service="Twitter"
              href={twitterURL(
                `I just built ${name} with a @starthackclub workshop. Make yours:`,
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
        </Box>
        <Box>
          <Heading.h2 f={3} color="primary" caps mb={3}>
            Questions?
          </Heading.h2>
          <DiscussOnSlack bg="primary" f={2} />
        </Box>
        <Box>
          <Heading.h2 f={3} color="slate" caps mb={3}>
            Spotted an issue?
          </Heading.h2>
          <ShareButton
            service="GitHub"
            bg="slate"
            f={2}
            href={githubEditUrl(slug)}
            target="_blank"
            aria-label={null}
            children="Edit on GitHub"
            title="If you see something, say something."
          />
        </Box>
      </Cards>
      <Footer />
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
