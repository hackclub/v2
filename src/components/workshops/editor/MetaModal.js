import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Field, Button, theme } from '@hackclub/design-system'

import storage from 'storage'
import { Modal, Overlay } from 'components/Modal'

const NiceField = styled(Field).attrs({
  bg: 'snow'
})`
  border: 2px solid ${theme.colors.smoke};

  &:hover {
    border: 2px solid ${theme.colors.slate};
  }

  &:focus {
    outline: 0;
    box-shadow: none;
    border: 2px solid ${theme.colors.info};
  }
`

export default class extends Component {
  state = { name: this.props.name }

  handleInputChange = e => this.setState({ name: e.target.value })

  saveData = () => {
    const slug = 'draft-' + this.state.name.replace(/ /g, '-')
    const oldSlug = 'draft-' + this.props.name.replace(/ /g, '-')
    const { body, edited } = storage.get(oldSlug)

    storage.set(slug, { body, edited })
    storage.remove(oldSlug)
    window.location = `/workshops/submit?id=${slug}`
  }

  render() {
    const { active, toggleModal } = this.props
    const { name } = this.state

    return (
      <Fragment>
        {active && (
          <Fragment>
            <Modal align="left" my={4} p={[3, 4]}>
              <NiceField
                name="wname"
                label="Workshop name"
                placeholder="Getting started with React Hooks"
                defaultValue={name}
                onChange={this.handleInputChange}
              />
              <Button mt={3} bg="success" onClick={this.saveData}>
                Save
              </Button>
            </Modal>
            <Overlay onClick={toggleModal} />
          </Fragment>
        )}
      </Fragment>
    )
  }
}
