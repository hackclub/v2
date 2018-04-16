import React, { Component, Fragment } from 'react'
import { Heading } from '@hackclub/design-system'
import { isEmpty } from 'lodash'
import storage from 'storage'
import LoginForm from 'components/apply/LoginForm'
import PostForm from 'components/challenge/PostForm'

class Form extends Component {
  state = { authToken: '', userId: '' }

  componentDidMount() {
    const authToken = storage.get('authToken')
    const userId = storage.get('userId')
    this.setState({ authToken, userId })
  }

  render() {
    const { authToken, userId } = this.state
    const authed = !isEmpty(authToken) || !isEmpty(userId)

    return (
      <Fragment>
        <Heading.h2 mt={0} mb={3} f={[3, 4]}>
          {authed ? 'Post your project' : 'Sign in to post + upvote'}
        </Heading.h2>
        {authed ? (
          <PostForm challengeId={this.props.challengeId} />
        ) : (
          <LoginForm
            bg="black"
            color="white"
            inputProps={{ w: 18 * 16 }}
            textProps={{ color: 'black', align: 'left' }}
          />
        )}
      </Fragment>
    )
  }
}

export default Form
