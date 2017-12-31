import React from 'react'
import Button from './Button'
import theme from '../theme'
import { Link } from 'react-static'

export const destroySession = () => {
  window.localStorage.removeItem('authToken')
  window.localStorage.removeItem('applicantId')
}

export const LogoutButton = () => (
  <Button is={Link} to="/" onClick={destroySession} children="Logout" />
)

export const BackButton = () => {
  const { pathname } = window.location
  const backLink = pathname.substring(0, pathname.lastIndexOf('/'))

  return (
    <Button is={Link} to={backLink} children="Back »" />
  )
}
