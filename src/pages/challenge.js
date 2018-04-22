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
  IconButton
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Form from 'components/challenge/Form'
import Posts from 'components/challenge/Posts'
import { Modal, Overlay } from 'components/Modal'
import { dt } from 'helpers'
import { isEmpty } from 'lodash'
import api from 'api'
import storage from 'storage'

const HelpButton = Button.extend`
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`

class Help extends Component {
  state = { active: false }

  toggleRules = () => {
    this.setState({
      active: !this.state.active
    })
  }

  //Render a modal for challenge rules on button press
  render() {
    return (
      <Fragment>
        <HelpButton color="primary" bg="white" f={2} onClick={this.toggleRules}>
          <Icon name="flag" m={0} mr={1} size={14} />Rules
        </HelpButton>
        {this.state.active && (
          <Fragment>
            <Modal boxShadowSize="lg" my={4} p={3}>
              <Container align="left">
                <Heading.h2 pb={3}>Challenge Rules</Heading.h2>
                <Text f={2} pb={2}>
                  Challenge follows Hack Club’s{' '}
                  <Link href="https://conduct.hackclub.com" target="_blank">
                    Code of Conduct
                  </Link>. We have a strict policy about anything breaking our
                  Code of Conduct (ex. voter fraud) and contestants found
                  cheating can be temporarily or permanently banned.
                </Text>
                <Text f={2}>
                  If you think anyone has violated our Conduct or cheating
                  policy, please reach out to us confidentially at{' '}
                  <Link href="mailto:challenge@hackclub.com">
                    challenge@hackclub.com
                  </Link>.
                </Text>
                <IconButton
                  name="close"
                  color="error"
                  onClick={this.toggleRules}
                  style={{ position: 'fixed', right: 10, top: 10, zIndex: 100 }}
                />
              </Container>
            </Modal>
            <Overlay onClick={this.toggleRules} />
          </Fragment>
        )}
      </Fragment>
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
  h2,
  p {
    color: ${props => props.theme.colors.black} !important;
  }
  position: relative;
`

const Title = Flex.extend`
  border-bottom: 1px solid ${props => props.theme.colors.smoke};
`

const title = 'Hack Club Challenge'
const desc =
  'Join Hack Club’s high school coding challenge. Submit your entry to compete in our monthly programming contest and win prizes.'

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
    return (
      <Fragment>
        <Helmet
          title={title}
          meta={[
            { name: 'twitter:title', content: title },
            { name: 'description', content: desc },
            { name: 'twitter:description', content: desc },
            { property: 'og:title', content: title },
            { property: 'og:description', content: desc },
            { property: 'og:url', content: 'https://hackclub.com/challenge' }
          ]}
        />
        <Header p={3}>
          <Nav />
          <HeaderContainer maxWidth={56} p={0} mt={3} align="left">
            <Box align={['center', null, 'right']}>
              <Text mb={-2} f={3} bold caps>
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
                  🌟 Challenge of the month: <strong>{challenge.name}</strong>
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
          <Box
            style={{ position: 'fixed', right: 'auto', bottom: 10, right: 10 }}
          >
            <Help />
          </Box>
          <Title align="center" pb={2}>
            <Heading.h2 f={5}>Submissions</Heading.h2>
            <Text.span f={2} color="muted" ml={3}>
              {dt(challenge.start)}–{dt(challenge.end)}
            </Text.span>
          </Title>
          <Posts challengeId={challenge.id} userId={userId} status={status} />
        </Container>
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
