import React, { Component } from 'react'
import PropTypes from 'prop-types'
import api from 'api'
import storage from 'storage'
import { LargeButton } from '@hackclub/design-system'

class SubmitButton extends Component {
  static propTypes = {
    status: PropTypes.oneOf(['incomplete', 'complete', 'submitted']).isRequired,
    applicationId: PropTypes.number.isRequired,
    callback: PropTypes.func
  }

  handleSubmit = () => {
    const { status, applicationId, callback } = this.props
    if (status !== 'complete') return null
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
    // this.updateState() // NOTE(@maxwofford): I'm trying to update the update button state when an application is reset
    const { status } = this.props
    return (
      <LargeButton
        onClick={this.handleSubmit}
        bg={status === 'submitted' ? 'success' : 'primary'}
        disabled={status !== 'complete'}
        w={1}
        mt={2}
        mb={4}
        f={3}
        children={
          status === 'submitted'
            ? 'We’ve recieved your application'
            : 'Submit your application'
        }
      />
    )
  }
}

export default SubmitButton
