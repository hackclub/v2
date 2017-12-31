import React, { Component } from 'react'
import { api } from '../../data'
import LeaderApplicationForm from '../components/LeaderApplicationForm'
import LoadingAnimation from '../components/LoadingAnimation'
import theme from '../theme'
import { LogoutButton } from '../components/AuthButton'
import { Provider } from 'rebass'

export default class extends Component {
  constructor(props) {
    super(props)

    let id
    const params = window.location.search.slice(1).split(/&/)
    for (var i = 0; i < params.length; i++) {
      let param = params[i]
      if (param.split('=')[0] === 'id') {
        id = param.split('=')[1]
      }
    }
    const authToken = window.localStorage.getItem('authToken')

    this.state = {
      status: 'loading',
      formFields: undefined,
      authToken,
      id
    }


    fetch(`${api}/v1/applicant_profiles/${id}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${authToken}`, },
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw res
        }})
      .then(json => {
        this.setState({
          status: 'loaded',
          formFields: json
        })
      })
      .catch(e => {alert(e)})
  }

  render() {
    const { status, formFields, id, authToken } = this.state
    return (
      <Provider theme={theme}>
        <LogoutButton />
        {
          status === 'loading' ?
          <LoadingAnimation /> :
          <LeaderApplicationForm params={ formFields }
                                 id={ id }
                                 authToken={ authToken } />
        }
      </Provider>
    )
  }
}
