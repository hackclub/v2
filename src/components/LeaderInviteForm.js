import React, { Fragment, Component } from 'react'
import { api } from '../../data'
import { Field, Input } from '../components/Forms'
import {
  Box,
  Flex,
  Text,
  IconButton,
  cx,
  Link as A
} from '@hackclub/design-system'
import yup from 'yup'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { errors: undefined }
  }

  render() {
    const { id, authToken, callback } = this.props
    const { error } = this.state

    const handleChange = e => {
      if (e.keyCode === 13) {
        e.preventDefault()
        handleSubmit()
      }
    }

    const handleSubmit = () => {
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
          fetch(`${api}/v1/new_club_applications/${id}/add_applicant`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
            .then(res => {
              if (!res.ok) throw res
              return res.json()
            })
            .then(json => {
              alert(`Invite sent to ${data.email}!`)
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
      <Flex align="flex-end">
        <Field
          id="leader_invite"
          onKeyDown={handleChange}
          placeholder="Co-leader's email"
          error={error}
          hint={
            <Fragment>
              Still deciding who will be on your team?{' '}
              <A
                href="https://github.com/hackclub/hackclub/blob/master/clubs/leadership_preface.md"
                target="_blank"
              >
                Consider this
              </A>.
            </Fragment>
          }
        />
        <IconButton
          name="add"
          bg="success"
          color="white"
          size={24}
          ml={3}
          p={1}
          mb={2}
          circle
          onClick={handleSubmit}
          style={{ flexShrink: 'none' }}
        />
      </Flex>
    )
  }
}
