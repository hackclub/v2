import React, { Component } from 'react'

const URL = 'https://finder.hackclub.com'

export default class extends Component {
  componentDidMount() {
    window.location = URL
  }

  render() {
    return (
      <p>
        Redirecting you to <a href={URL}>{URL}</a>
      </p>
    )
  }
}
