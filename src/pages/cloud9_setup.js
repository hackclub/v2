import styled from 'styled-components'
import React, { Fragment } from 'react'
import { Container, Section, theme } from '@hackclub/design-system'
import Helmet from 'react-helmet'
import { Headline, Lead } from 'components/Content'
import Nav from 'components/Nav'
import Sheet from 'components/Sheet'
import Cloud9Form from 'components/Cloud9Form'

const Base = styled(Section).attrs({
  px: 3,
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
  min-height: 100vh;
`

export default () => (
  <Fragment>
    <Helmet title="Cloud9 – Hack Club" />
    <Nav />
    <Base>
      <Container maxWidth={28} pt={[5, 6]}>
        <Headline mb={3}>Let’s get you coding on Cloud9.</Headline>
        <Lead color="blue.0" maxWidth={20}>
          Enter your email below & you’ll receive an invitation.
        </Lead>
      </Container>
      <Sheet maxWidth={28} align="left" my={4} mx="auto">
        <Cloud9Form />
      </Sheet>
    </Base>
  </Fragment>
)
