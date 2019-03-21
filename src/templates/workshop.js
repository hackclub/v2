import React, { Fragment } from 'react'
import styled from 'styled-components'
import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  Link as A,
  Section,
  Text,
  theme
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import GithubSlugger from 'github-slugger'
import Layout from 'components/Layout'
import Nav from 'components/Nav'
import {
  Breadcrumbs,
  Breadcrumb,
  BreadcrumbDivider
} from 'components/Breadcrumbs'
import IconButton from 'components/IconButton'
import MarkdownBody from 'components/MarkdownBody'
import DiscussOnSlack from 'components/DiscussOnSlack'
import ShareButton from 'components/ShareButton'
import Sheet from 'components/Sheet'
import Footer from 'components/Footer'
import { isEmpty, tail } from 'lodash'
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
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  }
`

const Name = styled(Heading.h1).attrs({ px: 4, bg: 'white' })`
  color: black;
  mix-blend-mode: screen;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.75);
  clip-path: polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%);
  display: inline-block;
  width: min-content;
  ${theme.mediaQueries.sm} {
    width: max-content;
  }
`

const Toc = styled(Sheet.withComponent('details')).attrs({
  id: 'toc',
  bg: 'smoke',
  fontSize: 3
})`
  margin-bottom: ${theme.space[3]}px;
  max-height: 24rem;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  ol,
  summary {
    list-style: none;
  }
  svg {
    transform: rotate(-90deg);
    transition: ${theme.transition} transform;
  }
  &[open] svg {
    transform: rotate(0deg);
  }
`

const TocHeading = styled(Text.withComponent('summary')).attrs({
  color: 'muted',
  px: 3,
  py: 2
})`
  cursor: pointer;
  line-height: 1;
  &::-webkit-details-marker {
    display: none;
  }
  svg,
  span {
    display: inline-block;
  }
  span {
    position: relative;
    top: -10px;
  }
`

const TocList = styled(Text.withComponent('ol')).attrs({ py: 2, pl: 0, m: 0 })`
  border-top: 2px solid ${theme.colors.snow};
`
const TocItem = styled(Text.withComponent('li')).attrs({
  fontSize: 2,
  pt: 1
})`
  margin: 0 !important;
`

const Body = styled(Container.withComponent(MarkdownBody))`
  position: relative;
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

const Cards = styled(Container.withComponent(NotOnPrint)).attrs({
  maxWidth: 48
})`
  text-align: center;
  display: grid;
  grid-gap: ${theme.space[4]}px;
  grid-template-areas: 'share' 'questions' 'contribute';
  width: 100%;
  > div {
    &:nth-child(1) {
      grid-area: share;
    }
    &:nth-child(2) {
      grid-area: questions;
    }
    &:nth-child(3) {
      grid-area: contribute;
    }
  }
  ${theme.mediaQueries.md} {
    grid-template-areas:
      'share share'
      'questions contribute';
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
    headings,
    frontmatter: {
      name,
      description,
      author = '',
      group = 'start',
      order = 1,
      canonical = null
    },
    html
  } = data.markdownRemark

  // NOTE(@lachlanjc): Using this library because `gatsby-remark-autolink-headers`
  const slugger = new GithubSlugger()

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
          {
            property: 'og:site_name',
            content: 'Hack Club Workshops'
          },
          { property: 'og:url', content: url }
        ]}
      >
        {canonical && <link rel="canonical" href={canonical} />}
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
          <Container pt={[5, 6]} px={2}>
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
            <Name fontSize={6} mb={3} children={name} />
            <Heading.h2 fontSize={4} children={description} />
            <Text
              fontSize={2}
              caps
              mt={3}
              mb={[3, 0]}
              children={linkAuthor(author)}
            />
          </Container>
          <Flex width={1} px={3} pb={3} justify="center">
            <IconButton
              bg="slate"
              glyph="edit"
              children="Edit"
              inverted
              href={githubEditUrl(slug)}
              target="_blank"
              fontSize={2}
              my={1}
            />
          </Flex>
        </Header>
      </NotOnPrint>
      <OnlyOnPrint p={3}>
        <Flex align="center" justify="flex-end" my={3}>
          <Image
            src="/logo-red.svg"
            width={`${theme.space[6]}px`}
            mr={3}
            alt="Hack Club logo"
          />
          <strong>Computer Science Tutorials</strong>
        </Flex>
        <Heading.h1 mt={4} mb={3} children={name} />
        <Heading.h2 fontSize={4} children={description} />
        <Text color="muted" my={3} children={linkAuthor(author)} />
        <Text color="muted">
          You can find this tutorial online at <u>{url}</u>
        </Text>
      </OnlyOnPrint>
      <Body maxWidth={48} p={3} className="invert">
        <Toc open>
          <TocHeading>
            <Icon glyph="down-caret" size={32} />
            <Text.span
              bold
              caps
              color="slate"
              fontSize={2}
              ml={1}
              children="Table of Contents"
            />
          </TocHeading>
          <TocList>
            {tail(headings).map(heading => (
              <TocItem
                key={heading.value}
                pl={theme.space[(heading.depth - 2) * 2]}
              >
                <A
                  href={`#${slugger.slug(heading.value)}`}
                  children={heading.value}
                />
              </TocItem>
            ))}
          </TocList>
        </Toc>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Body>
      <CardsSection py={4}>
        <Cards px={3}>
          <Sheet>
            <Heading.h2 fontSize={4} color="black" mb={3}>
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
            <Heading.h2 fontSize={4} color="pink.5" mb={3}>
              Questions?
            </Heading.h2>
            <DiscussOnSlack fontSize={2} />
          </Sheet>
          <Sheet>
            <Heading.h2 fontSize={4} color="black" mb={3}>
              Spotted an issue?
            </Heading.h2>
            <ShareButton
              service="GitHub"
              bg="slate"
              fontSize={2}
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
    </Layout>
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
      headings {
        depth
        value
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
