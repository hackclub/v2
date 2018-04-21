import React, { Component, Fragment } from 'react'
import {
  Box,
  Container,
  Flex,
  Heading,
  Link as A,
  Text,
  Section,
  Icon,
  Button,
  Card
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
import MarkdownBody from 'components/MarkdownBody'
import FeedbackForm from 'components/workshops/FeedbackForm'
import Footer from 'components/Footer'
import { lowerCase, camelCase, isEmpty } from 'lodash'
import { org } from 'data.json'

const Header = Box.withComponent('header').extend``

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

const EditLink = A.extend.attrs({ color: 'white', f: 3 })``

const Body = Container.withComponent(MarkdownBody)
A.link = A.withComponent(Link)
Section.h = Section.withComponent('header')

const generateSubtitle = (description, authorText) => {
  if (!authorText) {
    return description
  }

  // This iterates over each word in authorText, finds GitHub usernames (any
  // text that looks like "@orpheus", and turns them into links.
  const parsedAuthorText = authorText.split(' ').map((word, index, arr) => {
    const matches = word.match(/@(\w+)/)
    const processedWord = matches ? (
      <A
        href={`https://github.com/${matches[1]}`}
        target="_blank"
        color="white"
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

  return (
    <Fragment>
      {description}. Created by {parsedAuthorText}.
    </Fragment>
  )
}

const Cards = Container.extend`
  display: grid;
  grid-gap: ${props => props.theme.space[4]}px;
  grid-template-areas: 'feedback' 'share' 'contribute';
  width: 100%;

  > div {
    box-shadow: ${props => props.theme.boxShadows[1]};
    border-radius: ${props => props.theme.radius};
    max-width: 100%;

    &:nth-child(1) {
      grid-area: feedback;
    }
    &:nth-child(2) {
      grid-area: share;
    }
    &:nth-child(3) {
      grid-area: contribute;
    }
  }

  ${props => props.theme.mediaQueries.md} {
    grid-template-areas:
      'feedback share'
      'feedback contribute';
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

const InlineButton = Button.extend`
  display: inline-flex;
  align-items: center;
  div {
    background-image: url(/social/${props =>
        lowerCase(props.service)
          .split(' ')
          .join('')}-white.svg);
    background-repeat: no-repeat;
    background-size: 100%;
    width: 18px;
    height: 18px;
  }
`
const ShareButton = ({ children, ...props }) => (
  <InlineButton
    target="_blank"
    aria-label={`Share on ${props.service}`}
    f={2}
    {...props}
  >
    <Box mr={2} />
    {children || props.service}
  </InlineButton>
)

const makeUrl = (domain, slug) => `https://${domain}${slug}`

export default ({ data }) => {
  if (isEmpty(data)) return null

  const {
    fields: { slug, bg },
    frontmatter: { name, description, author = '', group = 'start', order = 1 },
    html
  } = data.markdownRemark

  const subtitle = generateSubtitle(description, author)

  const title = `${name} – Hack Club Workshops`
  const desc = `${description}. Read the tutorial on Hack Club Workshops.`
  const url = makeUrl('hackclub.com', slug)

  const authorUsername = (author || '').match(/@(\S+)/)
    ? author.replace('@', '')
    : 'hackclub'
  const authorUrl = makeUrl('github.com', authorUsername)

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
          { property: 'og:title', content: title },
          { name: 'twitter:title', content: title },
          { property: 'og:description', content: desc },
          { name: 'twitter:description', content: desc },
          { property: 'og:site_name', content: 'Hack Club Workshops' },
          { property: 'og:url', content: url }
        ]}
        children={
          <script
            type="application/ld+json"
            children={JSON.stringify(schema)}
          />
        }
      />
      <Header
        bg="accent"
        color="white"
        p={0}
        align="center"
        className="invert"
        style={{ backgroundImage: `url('${bg}')`, position: 'relative' }}
      >
        <Nav style={{ position: 'absolute', top: 0 }} />
        <Container pt={5} pb={3} px={3}>
          <Breadcrumbs align="center" justify="center" my={3}>
            <Breadcrumb to="/workshops" name="Workshops" position={1} />
            <BreadcrumbDivider />
            <Breadcrumb to={`/workshops#${group}`} name={group} position={2} />
            <BreadcrumbDivider />
            <Breadcrumb to={url} name={name} position={3} bold={false} />
          </Breadcrumbs>
          <Name f={[5, 6]} mb={2} children={name} />
          <Desc f={[3, 4]} regular children={subtitle} />
        </Container>
        <Flex w={1} p={3} justify={['center', 'space-between']} align="center">
          <Invert my={1} />
          <EditLink href={githubEditUrl(slug)} target="_blank" my={1}>
            <Icon color="white" name="edit" mb={-1} /> Edit on GitHub
          </EditLink>
        </Flex>
      </Header>
      <Body maxWidth={48} p={3} dangerouslySetInnerHTML={{ __html: html }} />
      <Cards maxWidth={52} p={3} mb={5}>
        <Box bg="teal.0" p={[3, 4]}>
          <Heading.h2 f={3} color="cyan.8" caps>
            How was this workshop?
          </Heading.h2>
          <Text color="muted" f={1} mt={1} mb={3}>
            (your feedback is anonymous + appreciated 💚)
          </Text>
          <FeedbackForm slug={slug} />
        </Box>
        <Box bg="blue.0" p={[3, 4]}>
          <Heading.h2 f={3} color="accent" caps>
            Made something rad?
          </Heading.h2>
          <Flex align="center" mb={3}>
            <Heading.h2 color="indigo.6" f={5}>
              Share it! 🌟
            </Heading.h2>
            <Text ml={2} f={1} color="muted">
              (posts are editable)
            </Text>
          </Flex>
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
        </Box>
        <Box bg="yellow.0" p={[3, 4]}>
          <Heading.h2 f={3} color="orange.5" caps mb={3}>
            Want to edit this workshop?
          </Heading.h2>
          <ShareButton
            service="GitHub"
            bg="warning"
            f={2}
            href={githubEditUrl(slug)}
            target="_blank"
            aria-label={null}
            children="Edit on GitHub"
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
