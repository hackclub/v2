import React, { Fragment } from 'react'
import {
  Box,
  Flex,
  Container,
  Heading,
  Text,
  Section,
  Card
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Posts from 'components/challenge/Posts'
import { isEmpty } from 'lodash'

const Header = Section.withComponent('header').extend`
  padding-top: 0 !important;
  background-color: ${props => props.theme.colors.red[5]};
  background-image: linear-gradient(
    -32deg,
    ${props => props.theme.colors.orange[4]} 0%,
    ${props => props.theme.colors.red[5]} 50%,
    ${props => props.theme.colors.red[6]} 100%
  );

  > div:last-of-type {
    display: grid;
    grid-gap: ${props => props.theme.space[3]}px;
    ${props => props.theme.mediaQueries.md} {
      text-align: right;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: ${props => props.theme.space[4]}px;
    }
  }
`

const dt = d => new Date(d).toLocaleDateString()

export default ({ data }) => {
  console.log(data)
  if (isEmpty(data)) return null
  const challenge = data.publicJson
  return (
    <Fragment>
      <Helmet title="Challenge – Hack Club" />
      <Header pb={3} align="center">
        <Nav />
        <Container p={0} pt={4}>
          <Box>
            <Text mb={-2} f={3} bold caps>
              Hack Club
            </Text>
            <Heading.h1 f={[6, 7]} mt={0} mb={3}>
              Challenge
            </Heading.h1>

            <Card
              boxShadowSize="md"
              align="left"
              p={3}
              bg="red.0"
              color="black"
            >
              <Text f={2}>
                🎉 Share for fun and education—welcome, all!
                <br />
                📊 Upvote your favorites
                <br />
                🎧 Challange of the month is <strong>{challenge.name}</strong>
                <br />
                🏅 Top-voted 3 websites by {dt(challenge.end)} will win!
              </Text>
            </Card>
          </Box>
          <Card boxShadowSize="md" align="left" p={3} bg="red.0" color="black">
            <Heading.h2 mt={0} mb={2} f={[3, 4]}>
              Sign in to post
            </Heading.h2>
          </Card>
        </Container>
      </Header>
      <Container maxWidth={48} py={4}>
        <Flex align="center" mb={3}>
          <Heading.h2 f={[4, 5]}>Submissions</Heading.h2>
          <Text.span f={2} color="muted" ml={3}>
            {dt(challenge.start)} – {dt(challenge.end)}
          </Text.span>
        </Flex>
        <Posts challengeId={challenge.id} authUser={{}} />
      </Container>
    </Fragment>
  )
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
