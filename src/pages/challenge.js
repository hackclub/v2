import React, { Component } from 'react'
import styled, { css, keyframes } from 'styled-components'
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Section,
  Text,
  theme,
  cx
} from '@hackclub/design-system'
import { graphql } from 'gatsby'
import Layout from 'components/Layout'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Name from 'components/Name'
import Sheet from 'components/Sheet'
import IconButton from 'components/IconButton'
import Help from 'components/challenge/Help'
import Form from 'components/challenge/Form'
import Ended from 'components/challenge/Ended'
import Posts from 'components/challenge/Posts'
import DiscussChallenge from 'components/challenge/DiscussChallenge'
import {
  DropdownContainer,
  DropdownMenu,
  DropdownMenuOption
} from 'components/Dropdown'
import { dt, tinyDt } from 'helpers'
import { isEmpty, keys } from 'lodash'
import api from 'api'
import storage from 'storage'

const sortByHumanized = {
  trending: 'Trending',
  top: 'Top-voted',
  newest: 'Newest',
  viewed: 'Top-viewed',
  random: 'Random'
}

const pulse = keyframes`
  0% { background-color: ${cx('blue.5')}; }
  33% { background-color: ${cx('fuschia.5')}; }
  66% { background-color: ${cx('violet.5')}; }
  100% { background-color: ${cx('blue.5')}; }
`
const Header = styled(Section.withComponent('header'))`
  background-color: ${theme.colors.blue[5]};
  background-image: linear-gradient(
    90deg,
    rgba(255, 0, 0, 1),
    rgba(0, 255, 255, 1)
  );
  background-blend-mode: overlay;
  animation: ${pulse} 16s linear infinite;
`

const HeaderContainer = styled(Container)`
  display: grid;
  grid-gap: ${theme.space[4]}px;
  grid-template-areas: 'text' 'info' 'form';
  ${theme.mediaQueries.md} {
    grid-template-columns: repeat(2, 1fr);
    ${props =>
      props.success
        ? css`
            grid-template-areas:
              'text form'
              'info form';
            ${HeaderAreaText} {
              text-align: right;
              h1 {
                margin-right: -${theme.space[2]}px;
              }
            }
          `
        : css`
            grid-template-areas:
              'text text'
              'info form';
          `};
    }
  }
`

const HeaderCard = styled(Sheet).attrs({ p: 3, mb: 0 })`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  h2,
  p {
    color: ${theme.colors.black} !important;
  }
  ${props =>
    props.status === 'needsToAuth' &&
    css`
      input[type='submit'] {
        color: ${theme.colors.info} !important;
      }
    `};
`

const HeaderAreaText = styled(Box)`
  grid-area: text;
`
const HeaderAreaInfo = styled(HeaderCard)`
  grid-area: info;
  p {
    line-height: 1.375;
    margin-bottom: ${theme.space[2]}px;
  }
`
const HeaderAreaForm = styled(HeaderCard)`
  grid-area: form;
`

const SubmissionsHeading = styled(Flex)`
  border-bottom: 1px solid ${theme.colors.smoke};
`

const title = 'Hack Club Challenge – Holiday 2018'
const desc =
  'Join Hack Club’s high school coding challenge. Submit your entry to compete in our monthly programming contest and win prizes, sponsored by Sourcegraph.'
const img = 'https://hackclub.com/cards/challenge.png'

export default class extends Component {
  state = { status: 'loading', sortBy: 'trending' }

  componentDidMount() {
    if (storage.get('authToken')) {
      api
        .get(`v1/users/current`)
        .then(user => {
          this.setState({ status: 'success', userId: user.id })
        })
        .catch(err => {
          if (err.status === 401) {
            this.setState({ status: 'needsToAuth' })
          } else {
            this.setState({ status: 'error' })
          }
        })
    } else {
      this.setState({ status: 'needsToAuth' })
    }
  }

  render() {
    const { data } = this.props
    const { userId, status, sortBy } = this.state
    if (isEmpty(data)) return null
    const challenge = data.allChallengesJson.edges[0].node
    const ended = Date.parse(new Date()) > Date.parse(challenge.end)
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
            { property: 'og:url', content: 'https://hackclub.com/challenge' }
          ]}
        />
        <Nav />
        <Header p={3}>
          <HeaderContainer
            maxWidth={64}
            pt={[4, 5, 6]}
            pb={4}
            align="left"
            success={status === 'success'}
          >
            <HeaderAreaText align="center" pt={[4, 3]}>
              <Name fontSize={6}>Challenge</Name>
              <Flex
                my={3}
                align="center"
                justify={
                  status === 'success' ? ['center', 'flex-end'] : 'center'
                }
              >
                <Link href="https://sourcegraph.com" target="_blank">
                  <Image
                    alt="Sourcegraph logo"
                    src="/sourcegraph-light.svg"
                    width={[144, 224]}
                  />
                </Link>
                <Text.span
                  color="rgba(255, 255, 255, 0.875)"
                  fontSize={4}
                  mx={[2, 3]}
                  children="+"
                />
                <Text.span
                  color="white"
                  fontSize={[3, 4]}
                  bold
                  caps
                  children="Hack Club"
                />
              </Flex>
            </HeaderAreaText>
            <HeaderAreaInfo>
              <Text fontSize={2}>
                <span role="img" aria-label="">
                  🌟
                </span>{' '}
                <strong>{challenge.name}</strong>
              </Text>
              <Text fontSize={2}>
                <span role="img" aria-label="">
                  🎁
                </span>{' '}
                {challenge.description} (thank you{' '}
                <Link href="https://sourcegraph.com" target="_blank">
                  Sourcegraph
                </Link>
                !)
              </Text>
              <Text fontSize={2}>
                <span role="img" aria-label="">
                  ℹ️
                </span>{' '}
                Competition open to Hack Club community members
              </Text>
              <Text fontSize={2}>
                <span role="img" aria-label="">
                  🏅
                </span>{' '}
                Voting ends on {dt(challenge.end)}. Top 3 voted win!
              </Text>
            </HeaderAreaInfo>
            <HeaderAreaForm status={status}>
              <Help />
              <Form challengeId={challenge.id} status={status} />
            </HeaderAreaForm>
          </HeaderContainer>
        </Header>
        <Container maxWidth={48} pt={4} pb={5} px={[0, 3]}>
          {ended && <Ended />}
          <SubmissionsHeading align="center" pb={2} pl={[2, 0]} pr={[2, 3]}>
            <Flex align="center" flex="1 1 auto" wrap>
              <Heading.h2 color="black" fontSize={5} mr={2}>
                Submissions
              </Heading.h2>
              <Text fontSize={2} color="muted" align="left">
                {tinyDt(challenge.start)}–{tinyDt(challenge.end)}
              </Text>
            </Flex>
            <DropdownContainer>
              <IconButton
                glyph="filter"
                bg="info"
                fontSize={2}
                style={{ whiteSpace: 'nowrap' }}
                children={sortByHumanized[sortBy]}
              />
              <DropdownMenu>
                {keys(sortByHumanized).map(key => (
                  <DropdownMenuOption
                    active={sortBy === key}
                    onClick={() => this.setState({ sortBy: key })}
                    children={sortByHumanized[key]}
                    key={key}
                  />
                ))}
              </DropdownMenu>
            </DropdownContainer>
          </SubmissionsHeading>
          <Posts
            challengeId={challenge.id}
            userId={userId}
            status={status}
            sortBy={sortBy}
          />
          <DiscussChallenge />
        </Container>
        <Footer />
      </Layout>
    )
  }
}
export const pageQuery = graphql`
  query ChallengeQuery {
    allChallengesJson(
      filter: { id: { eq: "7" } }
      sort: { fields: [start], order: DESC }
      limit: 1
    ) {
      edges {
        node {
          id
          name
          description
          start
          end
        }
      }
    }
  }
`
