import React from 'react'
import Button from './Button'
import theme from '../theme'
import { withRouter } from 'react-static'

export const destroySession = () => {
  window.localStorage.removeItem('authToken')
  window.localStorage.removeItem('applicantId')

  window.location.reload()
}

export const LogoutButton = () => {
  return (<Button bg="primary" color="white" onClick={destroySession} children="Logout" />)
}

export const LoginButton = withRouter(() => (
  <Button bg="primary" color="white" to="/apply/login" children="Login →" />
))
