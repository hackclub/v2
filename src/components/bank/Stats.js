import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Lead } from 'components/Content'
import { Text, theme } from '@hackclub/design-system'
import Stat from 'components/Stat'
import api from 'api'
import { timeSince } from 'helpers'

function renderMoney(amount) {
  return Math.floor(amount / 100)
    .toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
    .replace('.00', '')
}

function getTimeDistance(jsDate) {
  const delta = (Date.now() - jsDate) / 1000 // in seconds
  if (delta < 3600) {
    return `${Math.floor(delta / 60)} minutes ago`
  } else if (delta < 86400) {
    return `${Math.floor(delta / 3600)} hours ago`
  } else if (delta < 86400 * 2) {
    return 'two days ago'
  } else if (delta < 86400 * 7) {
    return 'this week'
  } else {
    // should basically never show
    return new Date(jsDate).toLocaleDateString()
  }
}

const flashing = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const Dot = styled(Text.span).attrs({ bg: 'success', color: 'white' })`
  border-radius: ${theme.pill};
  display: inline-block;
  line-height: 0;
  width: 0.4em;
  height: 0.4em;
  margin-right: 0.4em;
  margin-bottom: 0.12em;
  animation: 3s ${flashing} ease-in-out infinite;
`

export default props => {
  const [volume, setVolume] = useState(100 * 1000 * 1000) // 1MM default
  const [raised, setRaised] = useState(100 * 1000 * 500) // half million default
  const [lastUpdated, setLastUpdated] = useState(Date.now()) // now default

  useEffect(() => {
    loadStats()
  })

  const loadStats = () => {
    api.get('https://bank.hackclub.com/stats').then(stats => {
      setVolume(renderMoney(stats.transactions_volume))
      setRaised(renderMoney(stats.raised))
      setLastUpdated(stats.last_transaction_date * 1000)
    })
  }

  return (
    <div>
      {/* styled-components has a rendering bug that applies classes
          to incorrect components in this particular tree, but I didn't
          have time to upgrade styled-components or fix root cause.
          This <div> soup seemed to remove the symptoms in the UI for now.
          - @thesephist */}
      <div>
        <Lead fontSize={[2, 3]} color={props.labelColor} my={[2, 3]}>
          <span></span>
          <Dot />
          As of {timeSince(lastUpdated, false, true)}...
        </Lead>
      </div>
      <div>
        <Stat {...props} value={raised} label="raised on Hack Club Bank" />
        <Stat
          {...props}
          fontSize={[3, 4, 5]}
          value={volume}
          label="total amount transacted"
        />
      </div>
    </div>
  )
}
