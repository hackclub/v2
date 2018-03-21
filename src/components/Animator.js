import React, { Component, Fragment } from 'react'
import animator from 'animator'
import { merge } from 'lodash'

class Animator extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    animator()
  }

  render() {
    const { is = 'div', data, ...props } = this.props
    const Tag = is
    const settings = merge(
      {
        recalcOnResize: true,
        scrollOffset: true,
        range: [0, 0.25]
      },
      data
    )
    return <Tag data-animator={JSON.stringify(settings)} {...props} />
  }
}

export default Animator
