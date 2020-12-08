import React from 'react'
import styled from 'styled-components'
import {
  Box,
  Container,
  Heading,
  Button,
  Text,
  LargeButton,
  Sheet,
  theme
} from '@hackclub/design-system'
import Layout from 'components/Layout'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Snow from 'resnow'
import { Subhline, Lead } from 'components/Content'
import { Link } from 'gatsby'

const Hero = styled(Box.withComponent('article'))`
  background-image: linear-gradient(
    to bottom right,
    ${theme.colors.blue[5]},
    ${theme.colors.blue[6]}
  );
  min-height: 100vh;
  text-align: center;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`

const Base = styled(Sheet).attrs({ maxWidth: 72 - 2 })`
  background-color: ${theme.colors.blue};
  background-image: ${theme.gradient('blue.5', 'blue.3', 'blue.1')};
  display: grid;
  color: "red"
  grid-gap: ${theme.space[4]}px;
  align-items: center;
  ${theme.mediaQueries.md} {
    grid-gap: ${theme.space[5]}px;
    grid-template-columns: 2fr 1fr;
  }
`

const Megaline = styled(Heading.h1).attrs({
  color: 'white',
  fontSize: [6, null, 7, 8],
  pb: 2
})`
  line-height: 1.125;
  max-width: 20rem;
  @supports (-webkit-background-clip: text) {
    background-image: linear-gradient(
      to bottom right,
      ${theme.colors.gray[0]},
      ${theme.colors.gray[3]}
    );
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  ${theme.mediaQueries.md} {
    max-width: none;
  }
`

const title = 'Hack Club Secret Santa – Holiday 2020'
const desc = 'Find your holiday zen this year with Hack Club’s Secret Santa.'

export default () => (
  <Layout title={title} desc={desc} path="/santa/" img="/cards/santa.png">
    <Nav />
    <Hero py={4}>
      <Snow height={(window.innerHeight = 1500)} />
      <Container px={3} py={[6, 7, 8]}>
        <Text color="rgba(255, 255, 255, 0.875)" fontSize={[3, 4]} bold caps>
          2020 holidays
        </Text>
        <Megaline>Hack Club Secret Santa</Megaline>
        <img
          src="https://cloud-k3gxm6uem.vercel.app/2020-12-07_0vmfbtyfzec2kqeujbwmp3q4bu50pr0y.png"
          alt="Illustration of a holiday themed Orpheus"
          width="312"
        />
        <Lead fontSize={[3, null, 4]} color="snow" my={3} mx={0}>
          Christmas time has come and it's time for some fun! The holiday season
          is among us and the elves have assembled, which means its time for
          gift-giving to begin! The magical elf will assign you a partner, send
          them something fun, & you’ll get your own gift in the mail just in
          time for the holidays!
          <span role="img" aria-label="Present emoji" children={' 🎁'} />
        </Lead>
        <Base my={4} width={'75%'} height={'25%'}>
          <Box align={['center']} mt={'15px'}>
            <Subhline>
              <span>
                <Text color="white">Remember To Check Our</Text>
              </span>
              <Link
                href="http://hack.af/santa-rules"
                color="cyan.7"
                target="_blank"
              >
                Rules
              </Link>
              <span role="img" aria-label="Present emoji" children={'👀'} />
            </Subhline>
          </Box>
          <Box align={['center', null, 'left']}>
            <LargeButton
              href="https://airtable.com/shrnRJ3YxQYawSDW0"
              inverted
              children="Register"
              chevronRight
              fontSize={[3, 4]}
              scale
              target="_blank"
            />
          </Box>
        </Base>
      </Container>
    </Hero>
    <Footer />
  </Layout>
)
