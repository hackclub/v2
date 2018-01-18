import React, { Component } from 'react'
import { Text } from '@hackclub/design-system'

const URL = 'https://finder.hackclub.com'

export default class extends Component {
  componentWillMount() {
    window.location = URL
  }

  render() {
    return (
      <Text>
        Redirecting you to <a href={URL}>{URL}</a>
      </Text>
    )
  }
}
