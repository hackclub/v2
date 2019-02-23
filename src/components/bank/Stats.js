import React, { Component } from 'react'
import { Container, Text } from '@hackclub/design-system'
import Sheet from 'components/Sheet'
import api from 'api'
import { timeSince } from 'helpers'

class BankStats extends Component {
  state = {}

  loadStats = () => {
    api.get('https://bank.hackclub.com/transactions/stats').then(stats => {
      const transactionsTotalVolume = (stats.total_volume / 100).toLocaleString(
        'en-US',
        {
          style: 'currency',
          currency: 'USD'
        }
      )
      this.setState({ transactionsTotalVolume })
    })
  }

  componentDidMount() {
    this.loadStats()
    const intervalId = setInterval(this.loadStats, 10000)
    this.setState({ intervalId })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  render() {
    const { transactionsTotalVolume } = this.state
    const launchDate = '2018-06-28'
    return transactionsTotalVolume ? (
      <Container>
        <Text fontSize={[3, 4]}>
          <Text.span bold>{transactionsTotalVolume}</Text.span> transacted in
          the past {timeSince(launchDate, true, new Date(), true)} (& counting)
        </Text>
      </Container>
    ) : null
  }
}

export default BankStats
