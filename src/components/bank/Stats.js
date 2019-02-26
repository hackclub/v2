import React, { Component } from 'react'
import Stat from 'components/Stat'
import api from 'api'
import { timeSince } from 'helpers'

class Stats extends Component {
  state = {}

  loadStats = () => {
    api.get('https://bank.hackclub.com/stats').then(stats => {
      const { transactions, events } = stats
      const transactionsTotalVolume = (stats.total_volume / 100).toLocaleString(
        'en-US',
        {
          style: 'currency',
          currency: 'USD'
        }
      )
      this.setState({ transactions, events, transactionsTotalVolume })
    })
  }

  componentDidMount() {
    this.loadStats()
    const intervalId = setInterval(this.loadStats, 12000)
    this.setState({ intervalId })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  render() {
    const { props } = this
    const { transactionsTotalVolume, events, transactions } = this.state
    const launchDate = '2018-06-28'
    const stats = []
    if (transactionsTotalVolume)
      stats.push(
        <Stat
          {...props}
          value={transactionsTotalVolume}
          label={`transacted in the past ${timeSince(
            launchDate,
            true,
            new Date(),
            true
          )}`}
        />
      )
    if (events) stats.push(<Stat {...props} value={events} label="events" />)
    if (transactions)
      stats.push(<Stat {...props} value={transactions} label="transactions" />)
    return stats
  }
}

export default Stats
