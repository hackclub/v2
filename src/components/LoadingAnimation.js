import React, { Component } from 'react'
import { Flex, Text } from '@hackclub/design-system'

const Base = Flex.extend.attrs({ justify: 'center', align: 'center' })`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { dots: 1 }
  }

  componentDidMount() {
    this.id = setInterval(() => {
      const { dots } = this.state
      this.setState({
        dots: dots % 3 + 1
      })
    }, 300)
  }

  componentWillUnmount() {
    clearInterval(this.id)
  }

  render() {
    return (
      <Base>
        <Text>Loading{'.'.repeat(this.state.dots)}</Text>
      </Base>
    )
  }
}
