import React, { Component } from 'react'
import LeaderApplicationForm from '../components/LeaderApplicationForm'

export default class extends Component {
  constructor(props) {
    super(props)

    let id
    const params = window.location.search.slice(1).split(/&/)
    for (var i = 0; i < params.length; i++) {
      let param = params[i]
      if (param.split('=')[0] === 'id') {
        id = param.split('=')[0]
      }
    }

    this.state = {
      status: 'loading',
      formFields: undefined,
      authToken: window.localStorage.getItem('authToken'),
      id: id
    }
  }

  render() {
    return (
      <LeaderApplicationForm params={ this.state.formFields } />
    )
  }
}
