import React, { Component } from 'react'
import {
  Flex,
  Text
} from '@hackclub/design-system'
import {
} from 'components/Forms'
import Login from 'components/Login'
import LogoutButton from 'components/LogoutButton'
import LoadingAnimation from 'components/LoadingAnimation'
import { Formik } from 'formik'
import api from 'api'
import styles from 'styled-components'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { status: 'loading' }
  }

  componentDidMount() {
    const authToken = window.localStorage.getItem('authToken')
    this.setState({ authToken })

    api
      .get('v1/new_club_applications', { authToken })
      .then(json => {
        this.setState({
          status: 'success',
          clubs: json
        })
      })
      .catch(e => {
        if (e.status === 401) {
          this.setState({ status: 'needsToAuth' })
        } else {
          this.setState({ status: 'error' })
        }
      })
  }

  render() {
    const {status} = this.state
    switch (status) {
      case 'loading':
        return <LoadingAnimation />
      case 'needsToAuth':
        return <Login />
      case 'success':
        return (
          <React.Fragment>
            <Flex justify="flex-end">
              <LogoutButton m={2} inverted={false} />
            </Flex>
          </React.Fragment>
        )
      default:
        return <Text>Something terrible has happened</Text>
    }
  }
}
