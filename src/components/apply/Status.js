import React from 'react'
import { Badge } from '@hackclub/design-system'

const Status = ({ type, ...props }) => {
  const data = {
    unopened: { bg: 'primary', children: 'not started' },
    incomplete: { bg: 'warning', children: 'in progress' },
    complete: { bg: 'success', children: 'complete' },
    submitted: { bg: 'success', children: 'submitted' }
  }[type]
  return <Badge normal {...data} {...props} />
}

export default Status
