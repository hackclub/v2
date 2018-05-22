import React, { Component, Fragment } from 'react'
import ErrorPage from 'components/admin/ErrorPage'
import api from 'api'

class LeaderPosition extends Component {
  state = {
    status: 'loading'
  }

  componentDidMount() {
    // api
    //   .get(`v1/new_leaders/${this.props.position.new_leader_id}`)
    //   .then(leader => {
    //     this.setState({
    //       status: 'success',
    //       leader: leader
    //     })
    //   })
  }

  render() {
    switch (this.state.status) {
      case 'loading':
        return null
      case 'success':
        return null
      default:
        return <ErrorPage />
    }
  }
}

export default class extends Component {
  state = {
    status: 'loading',
    positions: []
  }

  render() {
    console.log(this.props.positions)
    return (
      <Fragment>
        {this.props.positions.map(position => (
          <LeaderPosition position={position} key={position.id} />
        ))}
      </Fragment>
    )
  }
}
