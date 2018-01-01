import React from 'react'
import theme from '../theme'
import { Link } from 'react-static'

export const destroySession = () => {
  window.localStorage.removeItem('authToken')
  window.localStorage.removeItem('applicantId')
}

export const LogoutButton = props => (
  <Link to="/" onClick={destroySession} children="Logout" {...props} />
)

export const BackButton = () => {
  const { pathname } = window.location
  const backLink = pathname.substring(0, pathname.lastIndexOf('/'))

  return (
    <Link to={backLink} children="Back »" {...props} />
  )
}
