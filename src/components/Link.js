// Based on https://sven-roettering.de/external-gatsby-links/
import React from 'react'
import { Link as GatsbyLink } from 'gatsby'

const isExternalLink = path => path.startsWith('http') || path.startsWith('//:')

const Link = ({ to, children, ...props }) =>
  isExternalLink(to) ? (
    <a href={to} {...props}>
      {children}
    </a>
  ) : (
    <GatsbyLink to={to} {...props}>
      {children}
    </GatsbyLink>
  )

export default Link
