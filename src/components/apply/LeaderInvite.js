import React, { Component } from 'react'
import { Flex, IconButton, Text, theme } from '@hackclub/design-system'
import styled from 'styled-components'
import LeaderInviteForm from 'components/apply/LeaderInviteForm'

const SectionIcon = styled(IconButton).attrs({
  glyph: props => (props.open ? 'view-close' : 'member-add'),
  bg: props => (props.open ? 'gray.5' : 'success'),
  size: 32,
  p: 1,
  ml: 'auto',
  circle: true
})`
  transition: ${theme.transition} all;
  transform: rotate(${props => (props.open ? 90 : 0)}deg);
  user-select: none;
  box-shadow: ${theme.boxShadows[0]} !important;
  &:hover,
  &:focus {
    box-shadow: ${theme.boxShadows[1]} !important;
  }
`

class LeaderInvite extends Component {
  state = { open: false }

  toggle = e => this.setState(({ open }) => ({ open: !open }))

  render() {
    const { open } = this.state
    return (
      <>
        <Flex align="center" aria-expanded={open} mt={[4, 5]} mb={2}>
          <Text fontSize={4} color="muted" bold caps>
            Co-leaders
          </Text>
          <SectionIcon open={open} onClick={this.toggle} />
        </Flex>
        {open && <LeaderInviteForm {...this.props} />}
      </>
    )
  }
}

export default LeaderInvite
