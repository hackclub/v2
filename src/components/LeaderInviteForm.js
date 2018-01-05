import React from 'react'
import { api } from '../../data'
import { Field } from '../components/Forms'
import { Box, Flex, Text, IconButton, cx } from '@hackclub/design-system'
import yup from 'yup'

const InnerForm = props => {
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
        fetch(`${api}/v1/new_club_applications/${props.id}/add_applicant`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${props.authToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(res => {
            return res.json()
            if (!res.ok) throw res
          })
          .then(json => {
            alert(`Invite sent to ${data.email}!`)
            leaderInvite.value = ''
          })
          .catch(e => {
            console.error(e.errors)
            alert(e)
          })
      })
      .catch(e => {
        console.log(e)
        if (e.type === 'required') {
          // skip
        } else if (e.message === 'email') {
          alert('Invalid co-leader email')
        } else {
          alert('Something has gone terribly wrong')
        }
      })
  }

  return (
    <Flex align="flex-end" mb={2}>
      <Field
        id="leader_invite"
        onKeyDown={handleChange}
        label="Please provide the email addresses of the other club leaders"
        placeholder="Co-leader's email"
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

export default InnerForm
