import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import api from 'api'
import { Heading, Container, LargeButton } from '@hackclub/design-system'
import styled from 'styled-components'

import Login from 'components/auth/Login'
import Sheet from 'components/Sheet'
import ApplyNav from 'components/apply/ApplyNav'
import LoadingBar from 'components/LoadingBar'
import BG from 'components/BG'
import ClubApplicationForm from 'components/apply/ClubApplicationForm'

export default class extends Component {
  state = {
    status: 'loading',
    formFields: undefined,
    id: undefined
  }

  componentDidMount() {
    const id = search.get('id')
    this.setState({ id })
    api
      .get(`v1/new_club_applications/${id}`)
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
        } else {
          alert(e.statusText)
        }
      })
  }

  content() {
    const { status, formFields, id } = this.state

    switch (status) {
      case 'needsToAuth':
        return <Login />
      case 'loading':
        return <LoadingBar fill />
      default:
        return (
          <Fragment>
            <BG color="snow" />
            <ApplyNav />
            <Sheet maxWidth={48} mt={3} mb={5}>
              <ClubApplicationForm
                params={formFields}
                id={id}
                authToken={authToken}
              />
            </Sheet>
            <Heading.h4 align="center">
              Your form is automatically saved ✨
            </Heading.h4>
            <Container align="center" mt={4} mb={5}>
              <LargeButton.link to="/apply" chevronLeft>
                Back
              </LargeButton.link>
            </Container>
          </Fragment>
        )
    }
  }

  render() {
    return (
      <Fragment>
        <Helmet title="Edit Club Application – Hack Club" />
        {this.content()}
      </Fragment>
    )
  }
}
