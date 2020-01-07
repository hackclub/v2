import React, { useState, useEffect } from 'react'
import { Lead } from 'components/Content'
import Stat from 'components/Stat'
import api from 'api'

import { useInterval } from 'hooks'

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
    return 'less than an hour ago'
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

export default props => {
  const [volume, setVolume] = useState(100 * 1000 * 1000) // 1MM default
  const [raised, setRaised] = useState(100 * 1000 * 500) // half million default
  const [lastUpdated, setLastUpdated] = useState(Date.now()) // now default

  useEffect(() => {
    loadStats()
  })

  useInterval(() => {
    loadStats()
  }, 8000)

  // stats.json reports last TX time in PST, JS accepts UTC
  const PSTTimeOffset = 8 * 3600 * 1000
  const loadStats = () => {
    api.get('https://bank.hackclub.com/stats').then(stats => {
      setVolume(renderMoney(stats.transactions_volume))
      setRaised(renderMoney(stats.raised))
      setLastUpdated(stats.last_transaction_date * 1000 + PSTTimeOffset)
    })
  }

  return (
    <div>
      <Lead fontSize={[2, 3]} color={props.labelColor} my={[1, 2]}>
        As of {getTimeDistance(lastUpdated)}...
      </Lead>
      <Stat {...props} value={raised} label="raised on Hack Club Bank" />
      <Stat
        {...props}
        fontSize={[3, 4, 5]}
        value={volume}
        label="total amount transacted"
      />
    </div>
  )
}
