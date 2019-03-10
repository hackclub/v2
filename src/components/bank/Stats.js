import React, { useState, useEffect } from 'react'
import Stat from 'components/Stat'
import api from 'api'

import { useInterval } from 'hooks'

export default props => {
  const [volume, setVolume] = useState(0)

  useEffect(() => {
    loadStats()
  })

  useInterval(() => {
    loadStats()
  }, 8000)

  const loadStats = () => {
    api.get('https://bank.hackclub.com/stats').then(stats => {
      const transactions_volume = Math.floor(stats.transactions_volume / 100)
        .toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })
        .replace('.00', '')
      setVolume(transactions_volume)
    })
  }

  return <Stat {...props} value={volume} label="total amount transacted" />
}
