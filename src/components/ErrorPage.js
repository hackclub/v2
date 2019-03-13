import React from 'react'
import { Text } from '@hackclub/design-system'

const alarm = (
  <span role="img" aria-label="alert emoji">
    🚨
  </span>
)

const ErrorPage = ({
  message = 'Something terrible has happened',
  ...props
}) => (
  <Text color="error" py={3} align="center" {...props}>
    {alarm} {message} {alarm}
    <br />
    Please let us know about this by emailing us at{' '}
    <a href="mailto:bug@hackclub.com">bug@hackclub.com</a>
  </Text>
)

export default ErrorPage
