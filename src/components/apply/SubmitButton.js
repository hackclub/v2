import React, { Component } from 'react'
import PropTypes from 'prop-types'
import api from 'api'
import styled from 'styled-components'
import { LargeButton, theme } from '@hackclub/design-system'

const Root = styled(LargeButton).attrs({
  py: 4,
  px: 4,
  fontSize: [3, 4],
  width: 1
})`
  background-image: linear-gradient(
    to bottom,
    ${theme.colors.orange[5]},
    ${theme.colors.red[5]}
  );
`

class SubmitButton extends Component {
  static propTypes = {
    status: PropTypes.oneOf(['incomplete', 'complete', 'submitted']).isRequired,
    applicationId: PropTypes.number.isRequired,
    callback: PropTypes.func
  }
  state = {
    loading: false
  }

  handleSubmit = () => {
    const { status, applicationId, callback } = this.props
    this.setState({ loading: true })
    if (status !== 'complete') return null
    // NOTE(@maxwofford): Give it 3 seconds of waiting to build up anticipation
    setTimeout(() => {
      api
        .post(`v1/new_club_applications/${applicationId}/submit`)
        .then(json => {
          callback(json)
        })
        .catch(e => {
          alert(e.statusText)
        })
        .finally(_ => {
          this.setState({ loading: false })
        })
    }, 3000)
  }

  render() {
    const { status } = this.props
    const { loading } = this.state
    return (
      <Root
        onClick={this.handleSubmit}
        bg={loading ? 'black' : status === 'submitted' ? 'success' : 'primary'}
        disabled={status !== 'complete' || loading}
        children={
          status === 'submitted'
            ? 'We’ve recieved your application'
            : 'Submit your application'
        }
      />
    )
  }
}

export default SubmitButton
