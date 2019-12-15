import React, { useState, useEffect } from 'react'
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

export default props => {
  const [volume, setVolume] = useState(100 * 1000 * 1000) // 1MM default
  const [raised, setRaised] = useState(100 * 1000 * 500) // half million default

  useEffect(() => {
    loadStats()
  })

  useInterval(() => {
    loadStats()
  }, 8000)

  const loadStats = () => {
    api.get('https://bank.hackclub.com/stats').then(stats => {
      setVolume(renderMoney(stats.transactions_volume))
      setRaised(renderMoney(stats.raised))
    })
  }

  return (
    <div>
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
