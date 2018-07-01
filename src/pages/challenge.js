import React, { Fragment, Component } from 'react'
import {
  Box,
  Flex,
  Container,
  Heading,
  Text,
  Section,
  Link,
  Card,
  Button,
  Icon,
  Image
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import IconButton from 'components/IconButton'
import Form from 'components/challenge/Form'
import Ended from 'components/challenge/Ended'
import Posts from 'components/challenge/Posts'
import DiscussChallenge from 'components/challenge/DiscussChallenge'
import { Modal, Overlay, CloseButton } from 'components/Modal'
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

class Help extends Component {
  state = { active: false }

  toggleRules = () => {
    this.setState(state => ({ active: !state.active }))
  }

  // Render a modal for challenge rules on button press
  render() {
    if (this.state.active) {
      return (
        <Fragment>
          <Modal align="left" my={4} p={[3, 4]}>
            <CloseButton onClick={this.toggleRules} />
            <Heading.h2>Challenge Rules</Heading.h2>
            <Text
              f={2}
              mt={3}
              color="info"
              py={2}
              px={3}
              bg="blue.0"
              style={{ borderRadius: 4 }}
            >
              For this challenge, your entry must use{' '}
              <Link href="https://p5js.org" target="_blank" bold>
                p5.js
              </Link>{' '}
              in its code.
            </Text>
            <Text f={2} my={3}>
              Challenge is open to Hack Club members and repl.it users. It
              strictly follows Hack Club’s{' '}
              <Link href="https://conduct.hackclub.com" target="_blank">
                Code of Conduct
              </Link>. Anything breaking our Code of Conduct (ex. voter fraud)
              and contestants found cheating can be temporarily or permanently
              banned.
            </Text>
            <Text f={2}>
              If you think anyone has violated our Conduct or cheating policy,
              please reach out to us confidentially at{' '}
              <Link href="mailto:challenge@hackclub.com">
                challenge@hackclub.com
              </Link>.
            </Text>
          </Modal>
          <Overlay onClick={this.toggleRules} />
        </Fragment>
      )
    }
    return (
      <IconButton
        name="flag"
        size={16}
        children="Rules"
        inverted
        f={2}
        onClick={this.toggleRules}
        style={{ float: 'right' }}
        {...this.props}
      />
    )
  }
}

const Header = Section.withComponent('header').extend`
  background-color: ${({ theme }) => theme.colors.red[5]};
  background-image: linear-gradient(
    32deg,
    ${({ theme }) => theme.colors.pink[5]},
    ${({ theme }) => theme.colors.red[5]}
  );
`

const HeaderContainer = Box.extend`
  display: grid;
  grid-gap: ${({ theme }) => theme.space[3]}px;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  max-width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-gap: ${({ theme }) => theme.space[4]}px;
    max-width: 56rem;
    > div:first-child {
      grid-column: span 2;
    }
  }
`

const HeaderCard = Card.extend`
  h2,
  p {
    color: ${({ theme }) => theme.colors.black} !important;
  }
`

const Title = Flex.extend`
  border-bottom: 1px solid ${({ theme }) => theme.colors.smoke};
`

const title = 'Hack Club Challenge'
const desc =
  'Join Hack Club’s high school coding challenge. Submit your entry to compete in our monthly programming contest and win prizes.'
const img = 'https://hackclub.com/challenge.png'

export default class extends Component {
  state = { status: 'loading', sortBy: 'top' }

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
    const challenge = data.publicJson
    const ended = Date.parse(new Date()) > Date.parse(challenge.end)
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
            { property: 'og:url', content: 'https://hackclub.com/challenge' }
          ]}
        />
        <Nav />
        <Header py={0} px={3}>
          <HeaderContainer pt={[4, 5]} pb={[3, 4]} align="left">
            <Box align="center" mt={3}>
              <Text color="pink.0" mb={[-2, -3]} f={3} bold caps>
                Hack Club
              </Text>
              <Heading.h1 f={[6, 7]} my={0}>
                Challenge
              </Heading.h1>
            </Box>
            <HeaderCard
              boxShadowSize="md"
              p={3}
              bg="pink.0"
              align="left"
              style={{
                alignSelf: status === 'success' ? 'flex-start' : 'auto'
              }}
            >
              <Text f={2}>
                🌟 Challenge: <strong>{challenge.name}</strong>
                <br />
                🎁 {challenge.description}
                <br />
                ℹ️ Submissions open to Hack Club community members
                <br />
                📖{' '}
                <Link
                  href="/workshops/challenge_dumb_api"
                  target="_blank"
                  underline
                >
                  Click here
                </Link>{' '}
                for help getting started
                <br />
                🏅 Submissionsdue {dt(challenge.end)}. Top 3 voted win!
              </Text>
            </HeaderCard>
            <HeaderCard boxShadowSize="md" p={3} bg="pink.0">
              <Help />
              <Form challengeId={challenge.id} status={status} />
            </HeaderCard>
          </HeaderContainer>
        </Header>
        <Container maxWidth={48} pt={4} pb={5} px={[0, 3]}>
          {ended && <Ended />}
          <Title align="center" pb={2} px={[2, 0]}>
            <Flex align="center" flex="1 1 auto" wrap>
              <Heading.h2 color="black" f={5} mr={2}>
                Submissions
              </Heading.h2>
              <Text f={2} color="muted" align="left">
                {tinyDt(challenge.start)}–{tinyDt(challenge.end)}
              </Text>
            </Flex>
            <DropdownContainer>
              <IconButton
                name="sort"
                size={16}
                bg="info"
                f={2}
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
          </Title>
          <Posts
            challengeId={challenge.id}
            userId={userId}
            status={status}
            sortBy={sortBy}
          />
          <DiscussChallenge />
        </Container>
        <Footer />
      </Fragment>
    )
  }
}
export const pageQuery = graphql`
  query ChallengeQuery {
    publicJson {
      id
      name
      description
      start
      end
    }
  }
`
