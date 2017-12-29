import React from 'react'
import { Provider, Container, Heading, Text } from 'rebass'
import theme, { cx } from '../theme'
import { Head } from 'react-static'
import Nav from '../components/Nav'
import Section from '../components/Section'
import RedeemTechDomainForm from '../components/RedeemTechDomainForm'

const Header = Section.extend.attrs({ is: 'header', pb: 4 })`
  padding-top: 0 !important;
  background-color: ${cx('red.5')};
  background-image: linear-gradient(
    -32deg,
    ${cx('orange.4')} 0%,
    ${cx('red.5')} 50%,
    ${cx('red.6')} 100%
  );
  text-align: center;
`

export default () => (
  <Provider theme={theme}>
    <Head>
      <title>Get a Free .TECH Domain</title>
    </Head>
    <Header>
      <Nav />
      <Container maxWidth={32 * 16} p={0}>
        <Heading is="h1" f={[5, 6]} mt={4} mb={2}>
          Free .TECH Domain!
        </Heading>
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
  </Provider>
)
