import React, { Component } from 'react'
import ErrorPage from 'components/admin/ErrorPage'
import LoadingBar from 'components/LoadingBar'
import api from 'api'
import { Label, Flex } from '@hackclub/design-system'
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


class IsTestForm extends Component {
  state = { status: 'loading' }

  toggle() {
    console.log(this.state.test)
    const data = { test: !this.state.test }
    this.setState({ status: 'loading' })
    api.patch(`v1/${this.props.model}/${this.props.id}`, { data }).then(x => {
      this.setState({
        test: x.test,
        status: 'success'
      })
    }).catch(e => {
      this.setState({
        status: 'error',
        errorMessage: e.statusText
      })
    })
  }
  toggle = this.toggle.bind(this)

  componentDidMount() {
    const { model, id } = this.props
    api.get(`v1/${model}/${id}`).then(x => {
      this.setState({
        test: x.test,
        status: 'success'
      })
    }).catch(e => {
      this.setState({
        status: 'error',
        errorMessage: e.statusText
      })
    })
  }

  render() {
    switch(this.state.status) {
      case 'loading':
        return <LoadingBar />
      case 'success':
        return (
          <Base test={this.state.test}>
            <Label>Test application</Label>
            <input
              type="checkbox"
              m={2}
              style={{ WebkitAppearance: 'checkbox' }}
              checked={this.state.test}
              onChange={this.toggle}
            />
          </Base>
        )
      case 'error':
      default:
        return <ErrorPage message={this.state.errorMessage} />
    }
  }
}

export default IsTestForm
