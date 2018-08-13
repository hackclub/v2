import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import api from 'api'
import storage from 'storage'
import { timeSince } from 'helpers'
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Hide,
  IconButton,
  LargeButton,
  Link as DSLink,
  Section,
  Text,
  cx
} from '@hackclub/design-system'
import styled from 'styled-components'

import Pulse from 'pulse'
import Link from 'gatsby-link'
import { clubApplicationSchema } from 'components/apply/ClubApplicationForm'
import ApplyNav from 'components/apply/ApplyNav'
import Sheet from 'components/Sheet'
import Main from 'components/apply/Main'
import Status from 'components/apply/Status'
import LoginForm from 'components/auth/LoginForm'
import LoadingBar from 'components/LoadingBar'

LargeButton.link = LargeButton.withComponent(Link)

const Full = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`

export default class extends Component {
  state = {
    status: 'loading',
    app: undefined,
    authToken: undefined,
    userId: undefined
  }

  createNewApplication = (firstTime = false) => {
    const msg =
      'If you start a new application you won’t be able to access this one. Continue?'
    if (!firstTime && !confirm(msg)) {
      return null
    }
    return api
      .post(`v1/users/${storage.get('userId')}/new_club_applications`, {
        authToken: storage.get('authToken')
      })
      .then(app => app)
  }

  resetApplication = () => {
    this.createNewApplication().then(app => {
      this.setState({
        status: 'finished',
        app
      })
    })
  }

  populateApplications = (application = null) => {
    if (application) {
      this.setState({
        status: 'finished',
        app: application
      })
    } else {
      api
        .get(`v1/users/${storage.get('userId')}/new_club_applications`, {
          authToken: storage.get('authToken')
        })
        .then(json => {
          if (json.length === 0) {
            return this.createNewApplication(true)
          }
          return json.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at)
          })[0]
        })
        .then(app => {
          this.setState({
            status: 'finished',
            app: app
          })
        })
        .catch(e => {
          if (e.status === 401) {
            this.setState({ status: 'needsToAuth' })
          }
        })
    }
  }

  componentDidMount() {
    const authToken = storage.get('authToken')
    const userId = storage.get('userId')
    this.setState({ authToken, userId })
    const needsToAuth = authToken === null || userId === null

    if (needsToAuth) {
      this.setState({ status: 'needsToAuth' })
    } else {
      this.populateApplications()
    }
  }

  content() {
    const { app, status, authToken, userId } = this.state
    switch (status) {
      case 'needsToAuth':
        return (
          <Full>
            <Pulse />
            <Sheet
              maxWidth={36}
              bg="black"
              color="white"
              style={{ mixBlendMode: 'multiply' }}
            >
              <Heading.h1 f={[5, 6]} style={{ lineHeight: '1.125' }}>
                Welcome!
              </Heading.h1>
              <Text f={4} mb={3}>
                We can’t wait to see your application.
                <br />
                Let’s get started!
              </Text>
              <LoginForm
                bg="black"
                color="white"
                textProps={{ color: 'black', align: 'left', f: 3 }}
              />
            </Sheet>
          </Full>
        )
      case 'loading':
        return <LoadingBar fill />
      case 'finished':
        return (
          <Fragment>
            <ApplyNav breadcrumb={0} />
            <Pulse />
            <Main
              app={app}
              userId={userId}
              authToken={authToken}
              callback={this.populateApplications}
              resetCallback={this.resetApplication}
            />
          </Fragment>
        )
      default:
        return (
          <Text color="error" py={4}>
            Something terrible has happened.
          </Text>
        )
    }
  }

  render() {
    return (
      <Fragment>
        <Helmet title="Apply – Hack Club" />
        {this.content()}
      </Fragment>
    )
  }
}
