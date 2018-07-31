import React from 'react'
import styled from 'styled-components'
import { Badge, Text } from '@hackclub/design-system'

const Base = styled(Badge)`
  font-weight: inherit;
`

const Status = ({ type, ...props }) => {
  const data = {
    unopened: { bg: 'primary', children: 'not started' },
    incomplete: { bg: 'warning', children: 'in progress' },
    complete: { bg: 'success', children: 'complete' },
    submitted: { bg: 'success', children: 'submitted' }
  }[type]
  return <Base {...data} {...props} />
}

export default Status
