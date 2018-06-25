import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import { url as apiUrl } from 'api'
import { Heading, Container, LargeButton } from '@hackclub/design-system'
import LeaderApplicationForm from 'components/apply/LeaderApplicationForm'
import Login from 'components/auth/Login'
import Layout from 'components/Layout'
import ApplyNav from 'components/apply/ApplyNav'
import LoadingBar from 'components/LoadingBar'
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
      fetch(`${apiUrl}/v1/leader_profiles/${id}`, {
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

    switch (status) {
      case 'needsToAuth':
        return <Login />
      case 'loading':
        return <LoadingBar fill />
      default:
        return (
          <Layout>
            <ApplyNav />
            <LeaderApplicationForm
              params={formFields}
              id={id}
              authToken={authToken}
            />
            <Heading.h4 align="center">
              Your form is automatically saved ✨
            </Heading.h4>
            <Container align="center" my={4}>
              <LargeButton.link to="/apply">« Back</LargeButton.link>
            </Container>
            <Footer />
          </Layout>
        )
    }
  }

  render() {
    return (
      <Fragment>
        <Helmet title="Edit Leader Application – Hack Club" />
        {this.content()}
      </Fragment>
    )
  }
}
