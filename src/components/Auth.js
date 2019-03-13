import React, { Component } from 'react'
import { Button, Flex, Heading, Text } from '@hackclub/design-system'
import Sheet from 'components/Sheet'
import LoginForm from 'components/auth/LoginForm'
import storage from 'storage'
import api from 'api'

class Auth extends Component {
  state = { authed: false, authData: {} }

  componentDidMount() {
    const { preAuthData = null } = this.props

    if (!preAuthData) {
      api
        .get(`v1/users/current`)
        .then(authData => {
          console.log(
            `User is authorized! Auth data: ${JSON.stringify(authData)}`
          )
          this.setState({ authed: true, authData })
        })
        .catch(error => {
          console.log(`User is not authorized! Error: ${error.toString()}`)
          this.setState({ authed: false, authData: {} })
        })
    }
  }

  signOut = e => {
    const { signOutCallback } = this.props

    try {
      storage.remove('userEmail')
      storage.remove('authToken')

      if (signOutCallback) signOutCallback()

      this.setState({ authed: false, authData: {} })
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const {
      textProps,
      type,
      cardProps,
      headline,
      preAuthed = false,
      preAuthData = {},
      loginCallback = null
    } = this.props

    const { authed, authData } = this.state
    const { email } = preAuthData ? preAuthData : authData

    return preAuthed || authed ? (
      <Flex align="baseline" {...textProps}>
        <Text
          color="inherit"
          mb={1}
          style={{
            overflowWrap: 'break-word',
            wordWrap: 'break-word',
            wordBreak: 'break-all'
          }}
        >
          You’re <strong>{email}</strong> ({type}
          ).
        </Text>
        <Button.button
          fontSize={2}
          ml={3}
          onClick={this.signOut}
          bg="info"
          inverted
        >
          Change
        </Button.button>
      </Flex>
    ) : (
      <Sheet {...cardProps}>
        <Heading.h2
          color="white"
          mt={0}
          mb={2}
          fontSize={3}
          children={headline}
        />
        <LoginForm
          bg="black"
          color="white"
          inputProps={{ width: 18 * 16 }}
          textProps={{ color: 'black', align: 'left' }}
          loginCallback={loginCallback}
        />
      </Sheet>
    )
  }
}

Auth.defaultProps = {
  headline: 'Before you submit…',
  type: 'private',
  textProps: { justify: 'center', mb: 3, px: 2, color: 'slate' },
  cardProps: {
    maxWidth: 20,
    p: 3,
    mb: 4,
    bg: 'primary'
  }
}

export default Auth
