import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import api from 'api'
import { Heading, Container, Card, LargeButton } from '@hackclub/design-system'
import styled from 'styled-components'

import Login from 'components/auth/Login'
import Sheet from 'components/Sheet'
import ApplyNav from 'components/apply/ApplyNav'
import LoadingBar from 'components/LoadingBar'
import BG from 'components/BG'
import LeaderApplicationForm from 'components/apply/LeaderApplicationForm'

export default class extends Component {
  state = {
    status: 'loading',
    formFields: undefined,
    id: undefined,
    authToken: undefined
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
      api
        .get(`v1/leader_profiles/${id}`)
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
          <Fragment>
            <ApplyNav />
            <BG color="snow" />
            <Sheet mt={3} mb={5}>
              <LeaderApplicationForm
                params={formFields}
                id={id}
                authToken={authToken}
              />
            </Sheet>
            <Heading.h4 align="center">
              Your form is automatically saved ✨
            </Heading.h4>
            <Container align="center" mt={4} mb={5}>
              <LargeButton.link to="/apply">« Back</LargeButton.link>
            </Container>
          </Fragment>
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
