import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import { Flex, colors } from '@hackclub/design-system'
import Flag from 'components/Flag'
import EmailLoginForm from 'components/EmailLoginForm'
import LoginCodeForm from 'components/LoginCodeForm'
import Footer from 'components/Footer'

const Base = Flex.extend.attrs({
  flexDirection: 'column',
  justify: 'center',
  align: 'center'
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
    const { emailSent, userId, email } = this.state
    const { userType = 'applicant' } = this.props
    const color = userType === 'admin' ? colors.green[5] : 'white'
    const bg = userType === 'admin' ? '#000' : 'primary'

    return (
      <Fragment>
        <Helmet title="Log in – Hack Club" />
        <FixedFlag />
        <Base color={color} bg={bg}>
          {emailSent ? (
            <LoginCodeForm
              userId={userId}
              email={email}
              color={color}
              bg={bg}
            />
          ) : (
            <EmailLoginForm
              submitCallback={this.submitCallback}
              userType={userType}
              color={color}
              bg={bg}
            />
          )}
        </Base>
      </Fragment>
    )
  }
}

export default Login
