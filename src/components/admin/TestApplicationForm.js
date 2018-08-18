import React, { Component } from 'react'
import { Flex, Label } from '@hackclub/design-system'
import api from 'api'
import styled from 'styled-components'

const Base = styled(Flex)`
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => theme.colors.smoke};
  background: ${({ theme, test }) =>
    test ? theme.colors.blue[1] : theme.colors.white}44;
`
Base.defaultProps = {
  p: 1,
  m: 1,
  align: 'center',
  justify: 'center',
  color: 'gray.9'
}

class TestApplicationForm extends Component {
  state = { status: 'finished' }

  toggle() {
    this.setState({ status: 'loading' })
    const test = !this.props.application.test
    api
      .patch(`v1/new_club_applications/${this.props.application.id}`, {
        data: { test }
      })
      .then(updatedApp => {
        this.props.updateApplication(updatedApp)
        this.setState({ status: 'finished' })
      })
  }
  toggle = this.toggle.bind(this)

  render() {
    const { status } = this.state
    const { test } = this.props.application
    return (
      <Base test={test}>
        <Label>Test application</Label>
        <input
          type="checkbox"
          m={2}
          style={{ webkitAppearance: 'checkbox' }}
          checked={test}
          onChange={this.toggle}
        />
      </Base>
    )
  }
}

export default TestApplicationForm
