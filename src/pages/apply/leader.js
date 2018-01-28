import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import { api } from 'data.json'
import { ThemeProvider, Heading, Container } from '@hackclub/design-system'
import LeaderApplicationForm from 'components/LeaderApplicationForm'
import LoadingAnimation from 'components/LoadingAnimation'
import Login from 'components/Login'
import ApplyNav from 'components/ApplyNav'
import Footer from 'components/Footer'

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 'loading',
      formFields: undefined,
      id: undefined,
      authToken: undefined
    }
  }

  componentDidMount() {
    let id
    const params = window.location.search.slice(1).split(/&/)
    for (let i = 0; i < params.length; i++) {
      let param = params[i]
      if (param.split('=')[0] === 'id') {
        id = param.split('=')[1]
      }
    }
    const authToken = window.localStorage.getItem('authToken')
    this.setState({ id, authToken })
    const needsToAuth = authToken === null || id === null
    if (needsToAuth) {
      const status = 'needsToAuth'
      this.setState({ status })
    } else {
      fetch(`${api}/v1/applicant_profiles/${id}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${authToken}` }
      })
        .then(res => {
          if (res.ok) {
            return res.json()
          } else {
            throw res
          }
        })
        .then(json => {
          this.setState({
            status: 'loaded',
            formFields: json
          })
        })
        .catch(e => {
          if (e.status === 401) {
            const status = 'needsToAuth'
            this.setState({ status })
          }
          alert(e)
        })
    }
  }

  content() {
    const { status, formFields, id, authToken } = this.state

    if (status === 'needsToAuth') {
      return <Login />
    } else if (status === 'loading') {
      return <LoadingAnimation />
    } else {
      return (
        <Fragment>
          <ApplyNav />
          <LeaderApplicationForm
            params={formFields}
            id={id}
            authToken={authToken}
          />
          <Footer />
        </Fragment>
      )
    }
  }

  render() {
    return (
      <ThemeProvider>
        <Helmet title="Edit Leader Application – Hack Club" />
        {this.content()}
      </ThemeProvider>
    )
  }
}
