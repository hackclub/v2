import React, { Component } from 'react'
import { Flex, Text, Link, ThemeProvider } from '@hackclub/design-system'
import Login from '../components/Login'
import LogoutButton from '../components/LogoutButton'
import LoadingAnimation from '../components/LoadingAnimation'
import Flag from '../components/Flag'
import api from '../api'

const Dashboard = props => {
  const { clubs } = props

  return (
    <table>
      <thead>
        <tr>
          <th align="left">ID</th>
          <th align="left">Name</th>
          <th align="left">URL</th>
        </tr>
      </thead>
      <tbody>
        {clubs.map((club, index) => (
          <tr key={index}>
            <td>
              <Link href={`/dashboard/club?id=${club.id}`} title={club.id}>
                {club.id}
              </Link>
            </td>
            <td>
              {club.high_school_name ? (
                 <Text>{club.high_school_name}</Text>
              ) : (
                 <Text color="silver">Unset</Text>
              )}
            </td>
            <td title={club.high_school_url}>{club.high_school_url}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
        return (
          <ThemeProvider>
            <Flex
              px={[2, 4]}
              pb={2}
              justify="space-between"
              align="center"
              style={{ position: 'relative' }}
            >
              <Flag />
              <LogoutButton mt={2} inverted={false} />
            </Flex>
            <Dashboard clubs={clubs} />
          </ThemeProvider>
        )
      case 'error':
        return <Text>Something terrible has happened.</Text>
    }
  }
}
