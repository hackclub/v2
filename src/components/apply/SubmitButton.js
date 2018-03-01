import React, { Component } from 'react'
import api from 'api'
import storage from 'storage'
import { LargeButton } from '@hackclub/design-system'

class SubmitButton extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    const { status, applicationId, callback } = this.props

    if (status !== 'complete') {
      return null
    }

    api
      .post(`v1/new_club_applications/${applicationId}/submit`, {
        authToken: storage.get('authToken')
      })
      .then(json => {
        callback(json)
      })
      .catch(e => {
        alert(e.statusText)
      })
  }

  render() {
    // this.updateState() // I'm trying to update the update button state when an application is reset
    const { status } = this.props

    // incomplete, complete, submitted
    return (
      <LargeButton
        onClick={this.handleSubmit}
        bg={status === 'submitted' ? 'accent' : 'primary'}
        disabled={status !== 'complete'}
        w={1}
        mb={2}
      >
        {status === 'submitted'
          ? 'We’ve recieved your application'
          : 'Submit your application'}
      </LargeButton>
    )
  }
}

export default SubmitButton
