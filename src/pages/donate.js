import React, { Fragment } from 'react'
import {
  Heading,
  Container,
  Flex,
  Box,
  Text,
  LargeButton,
  Icon,
  Section
} from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Nav from 'components/Nav'
import Footer from 'components/Footer'

const Header = Section.withComponent('header').extend`
  padding-top: 0 !important;
  background-color: ${props => props.theme.colors.teal[6]};
  background: url('/pattern.svg'),
    linear-gradient(
      -32deg,
      ${props => props.theme.colors.green[7]} 0%,
      ${props => props.theme.colors.teal[6]} 50%,
      ${props => props.theme.colors.teal[7]} 100%
    );
  clip-path: polygon(0% 0%, 100% 0, 100% 100%, 0% 90%);
`

const title = 'Donate to Hack Club'
const description =
  'Contribute today to empower the next generation and help start a coding club at every high school.'

export default () => (
  <Fragment>
    <Helmet
      title={title}
      meta={[
        { name: 'twitter:title', content: title },
        { name: 'description', content: description },
        { name: 'twitter:description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: 'https://hackclub.com/donate' }
      ]}
    />
    <Header>
      <Nav />
      <Container maxWidth={48} px={3} py={4}>
        <Heading.h1 f={[3, 4]} caps>
          Donate
        </Heading.h1>
        <Heading.h2 f={[4, 5,6]} mt={2} mb={3}>
          We’re building the organization we want to see in the world.
        </Heading.h2>
        <Text f={[3,4]}>
          Contribute today to empower the next generation and help start a
          coding club at every high school—we need your help.
        </Text>
      </Container>
    </Header>
    <Footer />
  </Fragment>
)
