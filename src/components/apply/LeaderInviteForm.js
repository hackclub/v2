import React, { Component } from 'react'
import { Field } from '@hackclub/design-system'
import { SendForm, SendButton } from '../SendForm'
import api from 'api'
import * as yup from 'yup'

class LeaderInviteForm extends Component {
  state = { errors: undefined }

  render() {
    const { id, callback } = this.props
    const { error } = this.state

    const handleChange = e => {
      if (e.keyCode === 13) {
        e.preventDefault()
        handleSubmit(e)
      }
    }

    const handleSubmit = e => {
      if (e) e.preventDefault()
      const leaderInvite = document.querySelector('#leader_invite')
      const schema = yup.object().shape({
        email: yup
          .string()
          .required('required')
          .email('email')
      })

      schema
        .validate({ email: leaderInvite.value })
        .then(data => {
          this.setState({ error: undefined })
          api
            .post(`v1/new_club_applications/${id}/add_user`, {
              data
            })
            .then(json => {
              leaderInvite.value = ''
              callback()
            })
            .catch(e => {
              console.error(e.errors)
              this.setState({ error: e.statusText })
            })
        })
        .catch(e => {
          if (e.type === 'required') {
            // skip
          } else if (e.message === 'email') {
            this.setState({ error: 'Invalid email address' })
          } else {
            this.setState({ error: 'Something went terribly wrong' })
          }
        })
    }

    return (
      <SendForm onSubmit={handleSubmit}>
        <Field
          id="leader_invite"
          name="new_leader_invite_email"
          onKeyDown={handleChange}
          label="New co-leader’s email"
          placeholder="friend@gmail.com"
          error={error}
          mb={4}
        />
        <SendButton
          aria-label="Send this invitation"
          onClick={handleSubmit}
          bg="info"
          mb={4}
        />
      </SendForm>
    )
  }
}

export default LeaderInviteForm
