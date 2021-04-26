import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import api from 'api'
import {
  Box,
  Button,
  Container,
  Text,
  Image,
  Link as A,
  theme
} from '@hackclub/design-system'
import Stat from 'components/Stat'
import Sheet from 'components/Sheet'
import {Headline, Subhline, Lead} from 'components/Content'
import { Slide } from 'react-reveal'

const orgs = [
  {
    name: 'Project Boom',
    bankID: 'projectboom',
    url: 'https://projectboom.org',
    logo: 'https://cloud-pnfgfi9qb-hack-club-bot.vercel.app/0pb.svg',
    logoBg: '#266DD3',
    defaultRaised: 100*3000,
    description: "In spring of 2020 Kunal started sending used laptops to students in need. With his tech background, the only thing holding him back was the ability to accept and store donations. Fiscal sponsorship helped him raise funds to repair computers otherwise designated for electronic waste and donate them to 50+ students."
  },
  {
    name: 'Execute Big',
    bankID: 'executebig',
    raisedVerb: 'Funded',
    url: 'https://executebig.org',
    logo: 'https://cloud-8m4q106ih-hack-club-bot.vercel.app/0frame_1.svg',
    logoBg: '#266DD3',
    defaultRaised: 100*4000,
    description: "One of the our earliest fiscally sponsored projects, Execute Big was founded on Hack Club Bank providing travel grants to high schoolers attending hackathons. They've since been granted their own 501(c)(3) and have expanded to running many additional programs."
  },
  {
    name: 'Girl Genius',
    bankID: 'girlgeniusmagazine',
    url: 'https://girlgeniusmag.tech',
    logo: 'https://cloud-ncfcbc8w7-hack-club-bot.vercel.app/1ggm_trimmed.png',
    logoBg: '#fff',
    defaultRaised: 100*5000,
    description: "Girl Genius was founded by a high schooler in California running an online community of female and non-binary leaders in STEAM. They joined Hack Club Bank to publish their magazine, now 5 issues deep with 11k+ readers."
  },
  {
    name: 'TechShift',
    bankID: 'techshift',
    url: 'https://techshift.org',
    logo: 'https://cloud-ckvn8yn11-hack-club-bot.vercel.app/4techshift.png',
    logoBg: '#211',
    defaultRaised: 100*50000,
    description: "TechShift supports student groups at colleges across the United States by providing mentorship and microgrants for local initiatives. The 30+ student-run chapters launch programs in their communities, both on and off campus."
  },
]

const Main = styled(Container).attrs({
  color: 'smoke',
  px: [3, null, 4],
  mt: 2,
  maxWidth: 84
})`
  border-radius: 0;
  position: relative;
  display: grid;
  grid-gap: ${theme.space[3]}px;
  ${theme.mediaQueries.md} {
    border-radius: ${theme.radii[2]};
    grid-template-columns: repeat(auto-fill, minmax(${theme.breakpoints[0]}em, 1fr));
    grid-gap: ${theme.space[5]}px;
  }
`

const DetailStat = styled(Box.withComponent(Stat)).attrs({
  align: 'left',
  fontSize: 5,
  px: 0,
  mb: 0
})``

const renderMoney = amount => {
  const dollarAmount = Math.floor(amount / 100)
  
  if (dollarAmount < 1000) {
    return dollarAmount
      .toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
      .replace('.00', '')
    } else if (dollarAmount < 10000) {
    return `$${dollarAmount/1000}`.substring(0,4) + 'K'
  } else if (dollarAmount < 999*1000) {
    return Math.floor(dollarAmount / 1000)
      .toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
      .replace('.00', '') + 'K'
  } else {
    // i can dream, can't i?
    return Math.floor(dollarAmount / (1000 * 1000))
      .toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
      .replace('.00', '') + 'm'
  }
}

const TransparencyButton = styled(Button).attrs({
  py: 1,
  px: 1,
  mr: 1,
})`
  vertical-align: top;
  // font-weight: normal;
`

const BankStat = ({bankID, defaultRaised, raisedVerb = "raised"}) => {
  const [raised, setRaised] = useState(defaultRaised)
  const [transparent, setTransparent] = useState(false)

  useEffect(() => {
    api.get(`https://bank.hackclub.com/project_stats?slug=${bankID}`).then(stats => {
      if (stats.raised) {
        setRaised(stats.raised)
        setTransparent(true)
      }
      // setLastUpdated(stats.last_transaction_date * 1000)
    }).catch(err => {
      // ignore fetch errors here b/c that probably means the event's finances aren't public
    })
  })

  return (
    <>
    <Box>
      {transparent && (
        <TransparencyButton
          href={`https://bank.hackclub.com/${bankID}`}
          target="_blank"
          title="🎶 take a look, it's in our books 🎵"
        >
          See Finances
        </TransparencyButton>
      )}
      <DetailStat value={renderMoney(raised)} label={raisedVerb} />
    </Box>
    </>
  )
}

const EventHeader = styled(Box).attrs({ mb: [3, 0] })`
  display: grid;
  aside {
    display: flex;
  }
  ${theme.mediaQueries.md} {
    grid-template-columns: 1fr auto;
  }
`

const Base = styled(Box.section).attrs({
  bg: 'darker',
  pt: [5, 6, 7],
  pb: [4, 5, 6]
})``

const Logo = styled(Image).attrs({
  mr: 1,
  p:1,
})`
  display: inline-block;
  vertical-align: sub;
  height: 1em;
  border-radius: ${theme.radii[2]};
`

const Organization = ({
  name,
  side,
  url,
  logo,
  logoBg,
  bankID,
  description,
  defaultRaised,
  raisedVerb,
}) => (
  <Slide left={side==='left'} right={side==='right'}>
    <Sheet bg="#252429" color="smoke" p={0} mb={0}>
      <Box p={[3,4]}>
        <EventHeader>
          <Box mb={2}>
            <Subhline align="left" color="white" mb={0}>
              {logo && (<Logo src={logo} bg={logoBg} />)}
              {name}
            </Subhline>
            <A color="slate" href={url} hoverline>{url}</A>
          </Box>
          <aside>
            <BankStat {...{bankID, defaultRaised, raisedVerb}} />
          </aside>
        </EventHeader>
        <Text.p>{description}</Text.p>
      </Box>
    </Sheet>
  </Slide>
)

export default () => (
  <Base>
    <Container align="center" maxWidth={42} mb={[4,5]} px={3}>
      <Headline color="white" mb={2}>
        Not for-profit?<br/>
        Not a problem.
      </Headline>
      <Lead maxWidth={40} color="muted">
        The financial tools for you to found a non-profit that actually does something.
      </Lead>
    </Container>
    <Main>
      {orgs.map((org, index) => (
        <Organization {...org} side={index%2===0 ? 'left' : 'right'} key={index} />
      ))}
    </Main>
  </Base>
)