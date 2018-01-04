import React from 'react'
import {
  ThemeProvider,
  Container,
  Heading,
  Text,
  Section
} from '@hackclub/design-system'
import { Head } from 'react-static'
import Nav from '../components/Nav'
import RedeemTechDomainForm from '../components/RedeemTechDomainForm'

const Header = Section.withComponent('header').extend`
  flex-direction: column;
  padding-top: 0 !important;
  background-color: ${props => props.theme.colors.red[5]};
  background-image: linear-gradient(
    -32deg,
    ${props => props.theme.colors.orange[4]} 0%,
    ${props => props.theme.colors.red[5]} 50%,
    ${props => props.theme.colors.red[6]} 100%
  );
`

export default () => (
  <ThemeProvider>
    <Head>
      <title>Get a Free .TECH Domain</title>
    </Head>
    <Header pb={3} align="center">
      <Nav />
      <Container maxWidth={32} p={0}>
        <Heading.h1 f={[5, 6]} mt={4} mb={2}>
          Free .TECH Domain!
        </Heading.h1>
        <Heading f={[3, 4]}>
          Every Hack Club member gets a free .TECH domain from our awesome
          partners.
        </Heading>
        <Text f={3} mt={2} style={{ lineHeight: '1.25' }}>
          Submit your request below and the .TECH team will set you up—it
          generally takes about a day.
        </Text>
      </Container>
    </Header>
    <RedeemTechDomainForm />
  </ThemeProvider>
)
