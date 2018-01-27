import React, { Component } from 'react'
import { Text, Link } from '@hackclub/design-system'
import Login from '../components/Login'
import LoadingAnimation from '../components/LoadingAnimation'
import api from '../api'

const Dashboard = props => {
  const { clubs } = props

  return (
    <ul style={{ listStyleType: 'none' }}>
      {clubs.map((club, index) => (
        <li key={index}>
          <Link href={`/dashboard/club?id=${club.id}`} title={club.id}>
            {club.id} | {club.high_school_name || 'unset'}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'loading'
    }
  }

  componentDidMount() {
    const authToken = window.localStorage.getItem('authToken')

    api
      .get('v1/new_club_applications', { authToken: authToken })
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
    const { status, clubs } = this.state

    switch (status) {
      case 'loading':
        return <LoadingAnimation />
      case 'needsToAuth':
        return <Login />
      case 'success':
        return <Dashboard clubs={clubs} />
      case 'error':
        return <Text>Something terrible has happened.</Text>
    }
  }
}
