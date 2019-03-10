import React from 'react'
import { Button } from '@hackclub/design-system'
import { Link } from 'gatsby'
import storage from 'storage'

export const destroySession = () => {
  storage.remove('authToken')
  storage.remove('userId')
}

Button.link = Button.withComponent(Link)

export default props => (
  <Button.link to="/" onClick={destroySession} children="Logout" {...props} />
)
