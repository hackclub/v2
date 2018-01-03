import React from 'react'
import theme from '../theme'
import { Link } from 'react-static'

export const destroySession = () => {
  window.localStorage.removeItem('authToken')
  window.localStorage.removeItem('applicantId')
}

export default (props) => (
  <Link to="/" onClick={destroySession} children="Logout" {...props} />
)
