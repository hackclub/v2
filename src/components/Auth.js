import React, { Component } from 'react'
import { Button, Flex, Heading, Text } from '@hackclub/design-system'
import { wordWrap } from 'polished'
import Sheet from 'components/Sheet'
import LoginForm from 'components/auth/LoginForm'
import storage from 'storage'
import { isEmpty } from 'lodash'

class Auth extends Component {
  state = { email: '' }

  componentDidMount() {
    const email = storage.get('userEmail')
    this.setState({ email })
  }

  signOut = e => {
    try {
      storage.remove('userEmail')
      this.setState({ email: null })
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const { textProps, type, cardProps, headline } = this.props
    const { email } = this.state
    const authed = !isEmpty(email)

    return authed ? (
      <Flex align="baseline" {...textProps}>
        <Text color="inherit" mb={1} style={wordWrap('break-word')}>
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
