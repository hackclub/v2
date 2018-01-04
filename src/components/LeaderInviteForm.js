import React from 'react'
import { api } from '../../data'
import { Field } from '../components/Forms'
import { Text, Column, Row } from 'rebass'
import yup from 'yup'
import { cx } from '../theme'
import styled from 'styled-components'

const InviteLink = styled.a`
  color: ${cx('primary')};
  background: white;
  cursor: pointer;
`

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
            if (res.ok) {
              return res.json()
            } else {
              throw res
            }
          })
          .then(json => {
            alert(`Invite sent to ${data.email}!`)
            leaderInvite.value = ''
          })
          .catch(e => {
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
    <Row>
      <Column width={3 / 5}>
        <Text>
          Please provide the email addresses of the other club leaders
        </Text>
        <Field
          id="leader_invite"
          onKeyDown={handleChange}
          p="Co-leader's email"
        />
      </Column>
      <Column style={{ alignSelf: 'flex-end' }}>
        <InviteLink onClick={handleSubmit}>Add co-lead</InviteLink>
      </Column>
    </Row>
  )
}

export default InnerForm
