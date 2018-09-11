import React, { Component, Fragment } from 'react'
import EmailLoginForm from 'components/auth/EmailLoginForm'
import LoginCodeForm from 'components/auth/LoginCodeForm'
import search from 'search'

class Login extends Component {
  state = { emailSent: false }

  componentDidMount() {
    this.setState({ email: search.get('email') })
  }

  submitCallback = data => {
    this.setState({
      ...data,
      emailSent: true
    })
  }

  render() {
    const { emailSent, userId, email } = this.state
    const { userType = 'applicant', ...props } = this.props

    return emailSent ? (
      <LoginCodeForm userId={userId} email={email} {...props} />
    ) : (
      <EmailLoginForm
        submitCallback={this.submitCallback}
        userType={userType}
        email={email}
        {...props}
      />
    )
  }
}

export default Login
