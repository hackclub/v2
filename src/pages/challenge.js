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
  Icon
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import IconButton from 'components/IconButton'
import Form from 'components/challenge/Form'
import Ended from 'components/challenge/Ended'
import Posts from 'components/challenge/Posts'
import { Modal, Overlay, CloseButton } from 'components/Modal'
import { dt, tinyDt } from 'helpers'
import { isEmpty } from 'lodash'
import api from 'api'
import storage from 'storage'

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
              For this challenge, your entry must be hosted on{' '}
              <Link href="https://repl.it" target="_blank" bold>
                repl.it
              </Link>.
            </Text>
            <Text f={2} my={3}>
              Challenge strictly follows Hack Club’s{' '}
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
        {...this.props}
      />
    )
  }
}

const Header = Section.withComponent('header').extend`
  padding-top: 0 !important;
  background-color: ${props => props.theme.colors.red[5]};
  background-image: linear-gradient(
    32deg,
    ${props => props.theme.colors.pink[5]},
    ${props => props.theme.colors.red[5]}
  );
  clip-path: polygon(0% 0%, 100% 0, 100% 100%, 0 98%);
  ${props => props.theme.mediaQueries.md} {
    clip-path: polygon(0% 0%, 100% 0, 100% 100%, 0 92%);
  }
`

const HeaderContainer = Container.extend`
  display: grid;
  grid-gap: ${props => props.theme.space[3]}px;
  ${props => props.theme.mediaQueries.md} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${props => props.theme.space[4]}px;
  }
`

const HeaderCard = Card.extend`
  min-height: 128px;
  position: relative;
  h2,
  p {
    color: ${props => props.theme.colors.black} !important;
  }
`

const Title = Flex.extend`
  border-bottom: 1px solid ${props => props.theme.colors.smoke};
`

const title = 'Hack Club Challenge'
const desc =
  'Join Hack Club’s high school coding challenge. Submit your entry to compete in our monthly programming contest and win prizes.'
const img = 'https://hackclub.com/challenge.png'

export default class extends Component {
  state = { status: 'loading' }

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
    const { userId, status } = this.state
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
        <Header p={3}>
          <Nav />
          <HeaderContainer maxWidth={56} p={0} mt={[0, 3]} align="left">
            <Box align={['center', null, 'right']}>
              <Text mb={[-2, -24]} f={3} bold caps>
                Hack Club
              </Text>
              <Heading.h1 f={[6, 7]} my={0}>
                Challenge
              </Heading.h1>
              <Heading.h2 f={3} mt={2} mb={3} regular>
                Join Hack Club’s high school coding contest
              </Heading.h2>
              <HeaderCard boxShadowSize="md" p={3} bg="pink.0" align="left">
                <Text f={2}>
                  🌟 Current challenge: <strong>{challenge.name}</strong>
                  <br />
                  🎁 {challenge.description}
                  <br />
                  📈 Upvote your favorites!
                  <br />
                  🏅 Top-voted 3 websites by {dt(challenge.end)} win!
                </Text>
              </HeaderCard>
            </Box>
            <HeaderCard boxShadowSize="md" p={3} bg="pink.0">
              <Form challengeId={challenge.id} status={status} />
            </HeaderCard>
          </HeaderContainer>
        </Header>
        <Container maxWidth={48} pt={4} pb={5} px={3}>
          {ended && <Ended />}
          <Title align="center" pb={2}>
            <Heading.h2 color="black" f={[4, 5]}>
              Submissions
            </Heading.h2>
            <Text.span f={2} color="muted" ml={3}>
              {tinyDt(challenge.start)}–{tinyDt(challenge.end)}
            </Text.span>
            <Help ml="auto" />
          </Title>
          <Posts challengeId={challenge.id} userId={userId} status={status} />
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
