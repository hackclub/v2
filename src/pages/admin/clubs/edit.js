import React, { Component, Fragment } from 'react'
import search from 'search'
import api from 'api'
import ClubForm from 'components/admin/clubs/ClubForm'
import NotesForm from 'components/admin/NotesForm'
import ErrorPage from 'components/admin/ErrorPage'
import LoadingBar from 'components/LoadingBar'
import Nav from 'components/apply/ApplyNav'
import {
  Heading,
  Text,
  Link,
  Input,
  Container,
  Box
} from '@hackclub/design-system'
import Autocomplete from 'react-autocomplete'
import styled from 'styled-components'

class OwnerForm extends Component {
  state = {
    value: '',
    cache: {},
    isLoading: false
  }

  removeOwner() {
    const { club } = this.props
    api
      .patch(`v1/new_clubs/${club.id}`, { data: { owner_id: null } })
      .then(_res => {
        window.location.reload()
      })
      .catch(err => {
        console.error(err)
      })
  }

  handleChange = e => {
    const { cache } = this.state
    const value = e.target.value
    this.setState({ value })
    if (!cache[value]) {
      const tempCache = { ...this.state.cache }
      tempCache[value] = [
        {
          id: '',
          label: 'loading...'
        }
      ]
      this.setState({ cache: tempCache })
      api.get(`v1/users?email=${value}`).then(users => {
        const emails = users.map(user => ({
          id: user.email,
          label: user.email
        }))
        const modifiedCache = { ...this.state.cache }
        modifiedCache[value] = emails
        this.setState({ cache: modifiedCache })
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ isLoading: true })

    const { cache, value } = this.state
    api.get(`v1/users?email=${this.state.value}`).then(users => {
      const newOwner = users.find(user => user.email === this.state.value)
      if (newOwner) {
        api
          .patch(`v1/new_clubs/${this.props.club.id}`, {
            data: { owner_id: newOwner.id }
          })
          .then(_res => {
            window.location.reload()
          })
          .catch(err => {
            this.setState({ isLoading: false })
            alert('User not found')
          })
      } else {
        this.setState({ isLoading: false })
        alert('Unable to find user with that email')
      }
    })
  }

  renderSwitch() {
    const { club } = this.props
    const { value, cache, isLoading } = this.state
    if (isLoading) {
      return <LoadingBar />
    }
    if (club.owner) {
      return (
        <Text>
          Owned by {club.owner.email}.{' '}
          <Link onClick={() => this.removeOwner()}>Remove</Link>.
        </Text>
      )
    } else {
      return (
        <Fragment>
          <Text>Club owner unset.</Text>
          <form onSubmit={this.handleSubmit}>
            <Autocomplete
              getItemValue={item => item.label}
              items={cache[value] || []}
              renderInput={props => <input {...props} width="32px" />}
              renderItem={(item, isHighlighted) => (
                <Box bg={isHighlighted ? 'smoke' : 'white'}>{item.label}</Box>
              )}
              value={value}
              onChange={this.handleChange}
              onSelect={value => this.setState({ value })}
            />
          </form>
        </Fragment>
      )
    }
  }

  render() {
    return <Container>{this.renderSwitch()}</Container>
  }
}

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      club: {},
      status: 'loading'
    }
  }
  componentDidMount() {
    const clubId = search.get('id')
    api
      .get(`v1/new_clubs/${clubId}`)
      .then(club => {
        this.setState({
          status: 'success',
          club
        })
      })
      .catch(err => {
        this.setState({
          status: err.status === 401 ? 'needsToAuth' : 'failure'
        })
      })
  }
  render() {
    const { status, club } = this.state
    switch (status) {
      case 'loading':
        return <LoadingBar fill />
      case 'success':
        return (
          <React.Fragment>
            <Nav />
            <Heading>Club #{club.id}</Heading>
            <OwnerForm club={club} />
            {/*<ClubForm {...club} />*/}
            <NotesForm modelId={club.id} modelType="new_clubs" />
          </React.Fragment>
        )
      default:
        return <ErrorPage />
    }
  }
}
