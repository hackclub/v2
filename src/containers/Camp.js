import React from 'react'
import {
  Button,
  Container,
  Heading,
  Link,
  Section,
  Text,
  ThemeProvider
} from '@hackclub/design-system'
import { cx } from '../theme'
import { Head } from 'react-static'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

// These 2 colors are from the gradient used on the original Hack Camp website
const oldCampTheme = ['rgb(255, 75, 85)', 'rgb(212, 78, 116)']

const Header = Section.withComponent('header').extend`
  flex-direction: column;
  padding-top: 0 !important;
  background-color: ${cx('campPrimary')};
  background-image: linear-gradient(
    45deg,
    ${cx('campPrimary')} 0%,
    ${cx('campSecondary')} 100%
  );
`

const Detail = Section.extend`
  flex-direction: column;
  color: black;
`

export default () => (
  <ThemeProvider>
    <Head>
      <title>Hack Camp</title>
    </Head>
    <Header pb={4}>
      <Nav />
      <Heading.h1 f={[5, 6]} mt={[4, 5]}>
        Hack Camp
      </Heading.h1>
      <Heading f={[3, 4]} my={2}>
        We’ve replaced camps in favor of clubs!
      </Heading>
    </Header>
    <Detail>
      <Container>
        <Text f={2}>
          Apply to our clubs program and we’ll help you launch and lead a coding
          club at your school. It’s like summer camp, but it runs all year!
        </Text>
        <Button.link bg={cx('campPrimary')} color="white" to="/start" my={4}>
          Learn More And Apply »
        </Button.link>
        <Text color="slate">
          Looking for the old Hack Camp website? You can find it{' '}
          <Link
            color={cx('campPrimary')}
            href="https://hackclub.github.io/camp/"
          >
            here
          </Link>.
        </Text>
      </Container>
    </Detail>
  </ThemeProvider>
)
