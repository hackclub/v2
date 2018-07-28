import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { get } from 'lodash'
import Stat from 'components/Stat'

class LiveStat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.fallback || '—'
    }
  }

  static propTypes = {
    url: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    fallback: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }

  componentDidMount() {
    const { url, fallback, path } = this.props
    this.setState({ value: fallback })
    axios(url)
      .then(res => res.data)
      .catch(e => this.setState({ value: fallback }))
      .then(data => get(data, path))
      .then(value => this.setState({ value }))
  }

  render() {
    const { url, ...props } = this.props
    return <Stat value={this.state.value} {...props} />
  }
}

export default LiveStat
