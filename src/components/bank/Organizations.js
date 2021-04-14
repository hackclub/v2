import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import api from 'api'
import {
  Box,
  Button,
  Container,
  Text,
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
    defaultRaised: 100*3000,
    stat: {
      'Hardware recipients': 50
    },
    description: "Founded by a high schooler in NYC, Project Boom accepts and distributes donated hardware and laptops. To date they've sent laptops to 50+ recipients."
  },
  {
    name: 'Girl Genius',
    bankID: 'girlgeniusmagazine',
    url: 'https://girlgeniusmag.tech',
    defaultRaised: 200*5000,
    description: "Girl Genius fosters an inclusive community where everyone is given a voice to empower the next generation of female leaders in STEAM. They've released 5 issues."
  },
  {
    name: 'Execute Big',
    bankID: 'executebig',
    url: 'https://executebig.org',
    defaultRaised: 100*4000,
    description: "Now under its own non-profit entity, Execute Big was founded on Hack Club Bank providing travel grants to high schoolers attending hackathons."
  },
  {
    name: 'TechShift',
    bankID: 'techshift',
    url: 'https://techshift.org',
    defaultRaised: 50000*100,
    description: "TechShift supports student groups at colleges across the country. Their 30+ groups lead initiatives in their local communities."
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

const BankStat = ({bankID, defaultRaised}) => {
  const [raised, setRaised] = useState(defaultRaised)
  const [transparent, setTransparent] = useState(false)

  useEffect(() => {
    api.get(`https://bank.hackclub.com/project_stats?slug=${bankID}`).then(stats => {
      if (stats.raised) {
        setRaised(stats.raised)
        setTransparent(true)
      }
      // setLastUpdated(stats.last_transaction_date * 1000)
    })
  })

  return (
    <>
    <Box>
      {transparent && (
        <TransparencyButton
          href={`https://bank.hackclub.com/${bankID}`}
          target="_blank"
        >
          See Finances
        </TransparencyButton>
      )}
      <DetailStat value={renderMoney(raised)} label="raised" />
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

const Organization = ({
  name,
  side,
  url,
  bankID,
  description,
  defaultRaised
}) => (
  <Slide left={side==='left'} right={side==='right'}>
    <Sheet bg="#252429" color="smoke" p={0} mb={0}>
      <Box p={[3,4]}>
        <EventHeader>
          <Box mb={2}>
            <Subhline align="left" color="white" children={name} mb={0} />
            <A color="slate" href={url} hoverline>{url}</A>
          </Box>
          <aside>
            <BankStat bankID={bankID} defaultRaised={defaultRaised} />
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