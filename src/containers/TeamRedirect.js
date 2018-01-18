import React, { Component } from 'react'

const URL = '/people'

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
