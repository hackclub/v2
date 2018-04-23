import React, { Component } from 'react'
import {
  Box,
  Button,
  Container,
  Card,
  Flex,
  Heading,
  Text
} from '@hackclub/design-system'
import LoginForm from 'components/apply/LoginForm'
import storage from 'storage'
import { isEmpty } from 'lodash'

const Sheet = Container.withComponent(Card).extend([])

class Auth extends Component {
  state = { email: '' }

  componentDidMount() {
    const email = storage.get('userEmail')
    this.setState({ email })
  }

  signOut = e => {
    try {
      localStorage.removeItem('userEmail')
      this.setState({ email: null })
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const { email } = this.state
    const authed = !isEmpty(email)

    return authed ? (
      <Flex justify="center" align="baseline" mb={3} px={2}>
        <Text f={2} color="slate" mb={1}>
          You’re <strong>{email}</strong> (private).
        </Text>
        <Button.button f={2} ml={3} onClick={this.signOut} bg="info" inverted>
          Change
        </Button.button>
      </Flex>
    ) : (
      <Sheet maxWidth={20} p={3} bg="primary" boxShadowSize="md" mb={4}>
        <Heading.h2 color="white" mt={0} mb={2} f={[3, 4]}>
          Before you submit…
        </Heading.h2>
        <LoginForm
          bg="black"
          color="white"
          inputProps={{ w: 18 * 16 }}
          textProps={{ color: 'black', align: 'left' }}
        />
      </Sheet>
    )
  }
}

export default Auth
