import React, { Fragment, Component } from 'react'
import styled, { css, keyframes } from 'styled-components'
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
  cx
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import IconButton from 'components/IconButton'
import Form from 'components/challenge/Form'
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
  random: 'Random'
}

const pulse = keyframes`
  0% { background-color: ${cx('blue.5')}; }
  33% { background-color: ${cx('fuschia.5')}; }
  66% { background-color: ${cx('violet.5')}; }
  100% { background-color: ${cx('blue.5')}; }
`
const Header = Section.withComponent('header').extend`
  background-color: ${({ theme }) => theme.colors.blue[5]};
  background-image: linear-gradient(90deg, rgba(255, 0, 0, 1), rgba(0, 255, 255, 1));
  background-blend-mode: overlay;
  animation: ${pulse} 16s linear infinite;
`

const HeaderContainer = styled(Container)`
  display: grid;
  grid-gap: ${({ theme }) => theme.space[3]}px;
  grid-template-areas: 'text' 'info' 'form';
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${({ theme }) => theme.space[4]}px;
      ${props =>
        props.success
          ? css`
              grid-template-areas:
                'text form'
                'info form';
              ${HeaderAreaText} {
                text-align: right;
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

const HeaderCard = styled(Card)`
  h2,
  p {
    color: ${({ theme }) => theme.colors.black} !important;
  }
`
HeaderCard.defaultProps = {
  boxShadowSize: 'md',
  p: 3,
  bg: 'rgba(255, 255, 255, .875)',
  align: 'left'
}

const HeaderAreaText = styled(Box)`
  grid-area: text;
`
const HeaderAreaInfo = styled(HeaderCard)`
  grid-area: info;
`
const HeaderAreaForm = styled(HeaderCard)`
  grid-area: form;
`

const Title = styled(Flex)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.smoke};
`

const Grid = styled(Box)`
  display: grid;
  grid-gap: ${({ theme }) => theme.space[3]}px;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`

const title = 'Hack Club Shirt'
const desc =
  'Submit a design to Hack Club’s T-Shirt design event. We’ll be printing the winner!'
const img = 'https://hackclub.com/tshirt.png'

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
    const challenge = data.allChallengesJson.edges[0].node
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
            { property: 'og:url', content: 'https://hackclub.com/shirt' }
          ]}
        />
        <Nav />
        <style
          children={`body {
            background-image:
              linear-gradient(to bottom,${cx('white')},${cx('snow')});
          }`}
        />
        <Header py={0} px={3}>
          <HeaderContainer
            pt={[4, 5]}
            pb={[3, 4]}
            align="left"
            success={status === 'success'}
          >
            <HeaderAreaText align="center" mt={3}>
              <Text color="snow" mb={[-2, -3]} f={3} bold caps>
                Hack Club
              </Text>
              <Heading.h1 f={[6, 7]} my={0}>
                T-Shirt
              </Heading.h1>
            </HeaderAreaText>
            <HeaderAreaInfo>
              <Text f={2}>
                👕 We’re making a shirt for Hack Club and we want your input.
              </Text>
            </HeaderAreaInfo>
            <HeaderAreaForm>
              <Form challengeId={challenge.id} status={status} />
            </HeaderAreaForm>
          </HeaderContainer>
        </Header>
        <Container maxWidth={48} pt={4} pb={5} px={[0, 3]}>
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
          <Grid mt={3}>
            <Posts
              challengeId={challenge.id}
              userId={userId}
              status={status}
              sortBy={sortBy}
              shirt
            />
          </Grid>
        </Container>
        <Footer />
      </Fragment>
    )
  }
}
export const pageQuery = graphql`
  query ShirtQuery {
    allChallengesJson(filter: { name: { eq: "T-Shirt" } }, limit: 1) {
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
