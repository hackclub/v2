import React from 'react'
import ClubApplicationForm from 'components/apply/ClubApplicationForm'

export default props => (
  <React.Fragment>
    <ul>
      {props.application.leader_profiles.map((app, index) => (
        <li key={index}>{app.user.email}</li>
      ))}
    </ul>
    <ClubApplicationForm params={props.application} disableAutosave />
  </React.Fragment>
)
