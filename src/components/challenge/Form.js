import React, { Component, Fragment } from 'react'
import { Heading } from '@hackclub/design-system'
import { isEmpty } from 'lodash'
import api from 'api'
import storage from 'storage'
import LoginForm from 'components/apply/LoginForm'
import PostForm from 'components/challenge/PostForm'
import LoadingAnimation from 'components/LoadingAnimation'
import ErrorMessage from 'components/admin/ErrorPage'

class Form extends Component {
  state = { status: 'loading' }

  componentDidMount() {
    if (storage.get('authToken')) {
      api
        .get(`v1/users/current`)
        .then(res => {
          this.setState({ status: 'success' })
        })
        .catch(err => {
          if (err.status === 401) {
            this.setState({ status: 'needsToAuth' })
          } else {
            this.setState({ status: 'error' })
          }
        })
    } else {
      this.setState({ status: 'needsToAuth' })
    }
  }

  render() {
    const { status } = this.state
    switch (status) {
      case 'loading':
        return <LoadingAnimation />
      case 'success':
        return (
          <Fragment>
            <Heading.h2 mt={0} mb={3} f={[3, 4]}>
              Post your project
            </Heading.h2>
            <PostForm challengeId={this.props.challengeId} />
          </Fragment>
        )
      case 'needsToAuth':
        return (
          <Fragment>
            <Heading.h2 mt={0} mb={3} f={[3, 4]}>
              Sign in to post + upvote
            </Heading.h2>
            <LoginForm
              bg="black"
              color="white"
              inputProps={{ w: 18 * 16 }}
              textProps={{ color: 'black', align: 'left' }}
            />
          </Fragment>
        )
      default:
        return <ErrorMessage />
    }
  }
}

export default Form
