import React, { Component, Fragment } from 'react'
import EmailLoginForm from 'components/apply/EmailLoginForm'
import LoginCodeForm from 'components/apply/LoginCodeForm'
import search from 'search'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = { emailSent: false }
    this.submitCallback = this.submitCallback.bind(this)
  }

  componentDidMount() {
    this.setState({ email: search.get('email') })
  }

  submitCallback(data) {
    this.setState({
      ...data,
      emailSent: true
    })
  }

  render() {
    const { emailSent, userId, email } = this.state
    const {
      color,
      bg,
      userType = 'applicant',
      inputProps = {},
      textProps = {}
    } = this.props

    return emailSent ? (
      <LoginCodeForm
        userId={userId}
        email={email}
        color={color}
        bg={bg}
        inputProps={inputProps}
        textProps={textProps}
      />
    ) : (
      <EmailLoginForm
        submitCallback={this.submitCallback}
        userType={userType}
        color={color}
        bg={bg}
        inputProps={inputProps}
        textProps={textProps}
        email={email}
      />
    )
  }
}

export default Login
