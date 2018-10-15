import React, { Component } from 'react'
import ErrorPage from 'components/admin/ErrorPage'
import LoadingBar from 'components/LoadingBar'
import { NewClubApplication, User } from 'models'
import { Field } from '@hackclub/design-system'

class AssignmentForm extends Component {
  state = {
    status: 'loading',
    value: null,
    possibleOwners: []
  }
  componentDidMount() {
    NewClubApplication.get(this.props.id).then(nca => {
      const emails = new Set(['zach@zachlatta.com', 'max@maxwofford.com'])
      if (nca.owner) {
        emails.add(nca.owner.email)
      }
      const userSearches = Array.from(emails).map(email =>
        User.get_by({ email }).then(response => response[0])
      )
      Promise.all(userSearches).then(possibleOwners => {
        this.setState({
          status: 'success',
          value: nca.owner && nca.owner.id,
          possibleOwners
        })
      })
    })
  }
  handleChange(e) {
    e.preventDefault()
    const ownerId = e.target.value
    this.setState({ value: ownerId })
    NewClubApplication.get(this.props.id).then(_ =>
      NewClubApplication.update({ owner_id: ownerId || null })
    )
  }
  render() {
    switch (this.state.status) {
      case 'loading':
        return <LoadingBar />
      case 'success':
        return (
          <Field
            label="Assignee"
            type="select"
            onChange={::this.handleChange}
            value={this.state.value}
          >
            <option value="">Unset</option>
            {this.state.possibleOwners.map(possibleOwner => (
              <option
                value={possibleOwner.id}
                id={possibleOwner.id}
                children={possibleOwner.email}
              />
            ))}
          </Field>
        )
      case 'error':
      default:
        return <ErrorPage message={this.state.errorMessage} />
    }
  }
}

export default AssignmentForm
