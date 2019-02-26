import React, { Component } from 'react'
import Stat from 'components/Stat'
import api from 'api'

class Stats extends Component {
  state = {}

  componentDidMount() {
    this.loadStats()
    const intervalId = setInterval(this.loadStats, 12000)
    this.setState({ intervalId })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  loadStats = () => {
    api.get('https://bank.hackclub.com/stats').then(stats => {
      const { transactions_count, events_count } = stats
      const transactions_volume = Math.floor(stats.transactions_volume / 100)
        .toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })
        .replace('.00', '')
      this.setState({
        transactions_volume,
        events_count,
        transactions_count
      })
    })
  }

  render() {
    const { state, props } = this
    const stats = {
      transactions_volume: 'total transacted'
      // events_count: 'events',
      // transactions_count: 'transactions'
    }
    return Object.keys(state).length > 1
      ? Object.keys(stats).map(key => (
          <Stat {...props} value={state[key]} label={stats[key]} key={key} />
        ))
      : null
  }
}

export default Stats
