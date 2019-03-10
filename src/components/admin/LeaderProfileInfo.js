import React from 'react'
import LeaderApplicationForm from 'components/apply/LeaderApplicationForm'

export default props => (
  <LeaderApplicationForm params={props.leaderProfile} disableAutosave />
)
