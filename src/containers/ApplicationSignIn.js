import React, { Component } from 'react'
import FormContainer from '../components/FormContainer'
import EmailLoginForm from '../components/EmailLoginForm'
import AuthTokenForm from '../components/AuthTokenForm'
import { Field, Submit } from '../components/Forms'
import { Text, Heading } from 'rebass'

const Subheading = Heading.extend.attrs({
  f: 4,
  mt: 2,
  mb: 0,
  color: 'primary'
})``

class ApplicationSignIn extends Component {
  constructor(props) {
    super(props)

    this.state = { emailSent: false }
    this.submitCallback = this.submitCallback.bind(this)
  }

  submitCallback() {
    this.setState({ emailSent: true })
  }

  render() {
    const { emailSent } = this.state

    return (
      <FormContainer>
        <EmailLoginForm submitCallback={this.submitCallback} />
        {emailSent ? <AuthTokenForm /> : null}
      </FormContainer>
    )
  }
}

export default ApplicationSignIn
