import React, { Fragment } from 'react'
import { Container, Heading, Section } from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Cloud9Form from 'components/Cloud9Form'

const Header = Section.withComponent('header').extend`
  background-color: ${({ theme }) => theme.colors.blue[6]};
  background-image: linear-gradient(
    -8deg,
    ${({ theme }) => theme.colors.indigo[4]} 0%,
    ${({ theme }) => theme.colors.blue[6]} 50%,
    ${({ theme }) => theme.colors.blue[7]} 100%
  );
`

export default () => (
  <Fragment>
    <Helmet title="Cloud9 – Hack Club" />
    <Nav />
    <Header align="center">
      <Container maxWidth={48} pt={4}>
        <Heading.h1 f={[5, 6]} mt={0} mb={2}>
          Let’s get you coding on Cloud9.
        </Heading.h1>
        <Heading f={[3, 4]}>
          Enter your email below and you’ll receive an invitation.
        </Heading>
      </Container>
    </Header>
    <Cloud9Form />
  </Fragment>
)
