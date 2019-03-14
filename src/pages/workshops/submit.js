import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Flex } from '@hackclub/design-system'
import Prism from 'prismjs'

import api from 'api'
import search from 'search'
import storage from 'storage'
import BG from 'components/BG'
import TitleBar from 'components/workshops/editor/TitleBar'
import Composer from 'components/workshops/editor/Composer'
import NotFound from 'components/workshops/editor/NotFound'

const FullHeight = styled(Flex).attrs({ flexDirection: 'column' })`
  min-height: 100vh;
`

export default class extends Component {
  constructor(props) {
    super(props)

    const slug = search.get('id')
    const data = storage.get(slug)

    this.state = {
      view: 'edit',
      name: slug || '',
      description: (data && data.description) || '',
      value: (data && data.body) || '',
      status: 'loading'
    }
  }

  componentDidMount() {
    if (storage.get('authToken')) {
      api
        .get(`v1/users/current`)
        .then(user => {
          this.setState({ status: 'success', userId: user.id })
        })
        .catch(err => {
          if (err.status === 401) {
            this.setState({ status: 'needsToAuth' })
          } else {
            this.setState({ status: 'error' })
          }
        })
    } else {
      this.setState({ status: 'needsToAuth' })
    }

    Prism.highlightAll()
  }

  componentDidUpdate() {
    Prism.highlightAll()
  }

  handleInputChange = e => {
    const data = {
      body: e.target.value,
      edited: new Date() / 1000
    }

    try {
      storage.set(this.state.name, data)
    } catch (error) {
      console.log(error)
    }

    this.setState({ value: e.target.value })
  }

  toggleView = () =>
    this.setState({ view: this.state.view === 'edit' ? 'preview ' : 'edit' })

  handlePublish = () => {
    const { name, description, value } = this.state

    const body = JSON.stringify({
      workshop_slug: 'WORKSHOP_SUBMISSION',
      feedback: { name, description, body: value }
    })
    console.log(body)
    api
      .post(`v1/workshop_feedbacks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
      })
      .then(res => {
        if (localStorage) {
          localStorage.removeItem(name)
        }
        window.location = `/workshops/success?name=${name}`
      })
      .catch(e => {
        console.log(e)
      })
  }

  render() {
    const { view, name, description, value } = this.state

    const cleanName = name.replace(/-/g, ' ').replace('draft ', '')

    return (
      <Fragment>
        <BG color="snow" />
        <FullHeight>
          {storage.keys().includes(name) ? (
            <Fragment>
              <TitleBar
                name={cleanName}
                description={description}
                handlePublish={this.handlePublish}
              />
              <Composer
                view={view}
                name={cleanName}
                description={description}
                value={value}
                toggleView={this.toggleView}
                handleInputChange={this.handleInputChange}
              />
            </Fragment>
          ) : (
            <NotFound />
          )}
        </FullHeight>
      </Fragment>
    )
  }
}
