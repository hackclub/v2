import React from 'react'
import { LargeButton } from '@hackclub/design-system'
import api from 'api'

export default props => {
  const { application, updateApplicationList } = props

  return (
    <LargeButton
      children={application.accepted_at ? 'Accepted' : 'Accept Club'}
      bg={application.accepted_at ? 'success' : 'primary'}
      onClick={() => {
        if (application.accepted_at) {
          return
        }
        if (!window.confirm('Are you sure you want to accept this club?')) {
          return
        }
        api
          .post(`v1/new_club_applications/${application.id}/accept`)
          .then(json => {
            updateApplicationList(json)
          })
          .catch(e => {
            alert(e.statusText)
          })
      }}
    />
  )
}
