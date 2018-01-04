import React, { Component } from 'react'
import { Head } from 'react-static'
import Flag from '../components/Flag'
import EmailLoginForm from '../components/EmailLoginForm'
import LoginCodeForm from '../components/LoginCodeForm'
import { Box, Provider } from 'rebass'
import theme, { mx } from '../theme'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const Base = Box.extend.attrs({
  bg: 'primary',
  color: 'white'
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
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
    const { emailSent, applicantId } = this.state

    return (
      <Provider theme={theme}>
        <Head>
          <title children="Login" />
        </Head>
        <FixedFlag />
        <Base>
          {emailSent ? (
            <LoginCodeForm id={applicantId} />
          ) : (
            <EmailLoginForm submitCallback={this.submitCallback} />
          )}
        </Base>
      </Provider>
    )
  }
}

export default Login
