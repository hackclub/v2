import React from 'react'
import Button from './Button'
import theme from '../theme'
import { Link } from 'react-static'

export const destroySession = () => {
  window.localStorage.removeItem('authToken')
  window.localStorage.removeItem('applicantId')
}

export const LogoutButton = () => (
  <Button is={Link} to="/apply/login" onClick={destroySession} children="Logout" />
)

export const LoginButton = () => (
  <Button is={Link} to="/apply/login" children="Login →" />
)
