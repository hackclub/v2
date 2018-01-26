import React, { Component } from 'react'
import { Head } from 'react-static'
import { ThemeProvider, Flex } from '@hackclub/design-system'
import Flag from '../components/Flag'
import EmailLoginForm from '../components/EmailLoginForm'
import LoginCodeForm from '../components/LoginCodeForm'
import Footer from '../components/Footer'

const Base = Flex.extend.attrs({
  flexDirection: 'column',
  justify: 'center',
  align: 'center',
  bg: 'primary',
  color: 'white'
})`
  width: 100vw;
  height: 100vh;
`

const FixedFlag = Flag.extend`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = { emailSent: false }
    this.submitCallback = this.submitCallback.bind(this)
  }

  submitCallback(data) {
    this.setState({
      ...data,
      emailSent: true
    })
  }

  render() {
    const { emailSent, applicantId, email } = this.state

    return (
      <ThemeProvider>
        <Head>
          <title>Log in – Hack Club</title>
        </Head>
        <FixedFlag />
        <Base>
          {emailSent ? (
            <LoginCodeForm id={applicantId} email={email} />
          ) : (
            <EmailLoginForm submitCallback={this.submitCallback} />
          )}
        </Base>
      </ThemeProvider>
    )
  }
}

export default Login
