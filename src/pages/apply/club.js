import React, { Component } from 'react'
import Helmet from 'react-helmet'
import search from 'search'
import api from 'api'
import { Container, Heading, LargeButton } from '@hackclub/design-system'

import { Link } from 'gatsby'
import Layout from 'components/Layout'
import Login from 'components/auth/Login'
import Sheet from 'components/Sheet'
import ApplyNav from 'components/apply/ApplyNav'
import LoadingBar from 'components/LoadingBar'
import ClubApplicationForm from 'components/apply/ClubApplicationForm'

LargeButton.link = LargeButton.withComponent(Link)

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

  render() {
    return (
      <Layout bg="snow">
        <Helmet title="Edit Club Application – Hack Club" />
        <Content {...this.state} />
      </Layout>
    )
  }
}

const Content = ({ status, formFields, id }) => {
  switch (status) {
    case 'needsToAuth':
      return <Login />
    case 'loading':
      return <LoadingBar fill />
    default:
      return (
        <>
          <ApplyNav />
          <Sheet maxWidth={48} mt={3} mb={5}>
            <ClubApplicationForm params={formFields} id={id} />
          </Sheet>
          <Heading.h4 align="center">
            Your form is automatically saved{' '}
            <span role="img" aria-label="">
              ✨
            </span>
          </Heading.h4>
          <Container align="center" mt={4} mb={5}>
            <LargeButton.link to="/apply" chevronLeft>
              Back
            </LargeButton.link>
          </Container>
        </>
      )
  }
}
