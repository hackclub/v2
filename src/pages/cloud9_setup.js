import styled from 'styled-components'
import React, { Fragment } from 'react'
import { Container, Heading, Section, theme } from '@hackclub/design-system'
import Helmet from 'react-helmet'
import Nav from 'components/Nav'
import Cloud9Form from 'components/Cloud9Form'

const Header = styled(Section.withComponent('header')).attrs({
  px: 0,
  align: 'center',
  color: 'white'
})`
  background-color: ${theme.colors.blue[6]};
  background-image: linear-gradient(
    -18deg,
    ${theme.colors.indigo[4]},
    ${theme.colors.blue[6]},
    ${theme.colors.blue[7]}
  );
`

export default () => (
  <Fragment>
    <Helmet title="Cloud9 – Hack Club" />
    <Nav />
    <Header>
      <Container maxWidth={28} pt={4}>
        <Heading.h1 fontSize={[5, 6]} mt={0} mb={3}>
          Let’s get you coding on Cloud9.
        </Heading.h1>
        <Heading.h2 color="blue.0" fontSize={[3, 4]}>
          Enter your email below and you’ll receive an invitation.
        </Heading.h2>
      </Container>
    </Header>
    <Cloud9Form />
  </Fragment>
)
