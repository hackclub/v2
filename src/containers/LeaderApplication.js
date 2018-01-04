import React, { Component } from 'react'
import { Head } from 'react-static'
import { api } from '../../data'
import LeaderApplicationForm from '../components/LeaderApplicationForm'
import LoadingAnimation from '../components/LoadingAnimation'
import Login from '../components/Login'
import theme from '../theme'
import ApplyNav from '../components/ApplyNav'
import Footer from '../components/Footer'
import { Provider } from 'rebass'

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
    var id
    const params = window.location.search.slice(1).split(/&/)
    for (var i = 0; i < params.length; i++) {
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
        <div>
          <ApplyNav />
          <LeaderApplicationForm
            params={formFields}
            id={id}
            authToken={authToken}
          />
          <Footer />
        </div>
      )
    }
  }

  render() {
    return (
      <Provider theme={theme}>
        <Head>
          <title children="Edit Leader Application" />
        </Head>
        {this.content()}
      </Provider>
    )
  }
}
