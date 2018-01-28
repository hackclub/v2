import React from 'react'
import { Button } from '@hackclub/design-system'
import Link from 'gatsby-link'

export const destroySession = () => {
  window.localStorage.removeItem('authToken')
  window.localStorage.removeItem('applicantId')
}

Button.link = Button.withComponent(Link)

export default props => (
  <Button.link
    inverted
    to="/"
    onClick={destroySession}
    children="Logout"
    {...props}
  />
)
