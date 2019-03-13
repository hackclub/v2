import React from 'react'
import { LargeButton } from '@hackclub/design-system'
import api from 'api'

export default props => {
  const { application, updateApplication } = props

  return (
    <LargeButton
      children={application.accepted_at ? 'Accepted' : 'Accept Club'}
      bg={application.accepted_at ? 'success' : 'primary'}
      onClick={() => {
        if (application.accepted_at) {
          return
        }
        // eslint-disable-next-line
        if (!confirm('Are you sure you want to accept this club?')) {
          return
        }
        api
          .post(`v1/new_club_applications/${application.id}/accept`)
          .then(json => {
            updateApplication(json)
          })
          .catch(e => {
            alert(e.statusText)
          })
      }}
    />
  )
}
