import React, { Component } from 'react'
import { api } from '../../data'
import LoadingAnimation from '../components/LoadingAnimation'
import ClubApplicationForm from '../components/ClubApplicationForm'
import LeaderInviteForm from '../components/LeaderInviteForm'
import yup from 'yup'
import fetch from 'unfetch'

export default class extends Component {
  constructor(props) {
    super(props)

    var id
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
  }

  componentDidMount() {
    fetch(`${api}/v1/club_applications/${this.state.id}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${this.state.authToken}`, },
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

    if (status === 'loading') {
      return(<LoadingAnimation />)
    } else {
      return(
        <div>
          <ClubApplicationForm params={ formFields }
                               id={ id }
                               authToken={ authToken }
          />
          <LeaderInviteForm params={ formFields }
                            id={ id }
                            authToken={ authToken }
          />
        </div>
      )
    }
  }
}
