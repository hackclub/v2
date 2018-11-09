import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, theme } from '@hackclub/design-system'
import IconButton from 'components/IconButton'

const css = `
  .invert {
    background-color: ${theme.colors.dark};
    color: ${theme.colors.white} !important;
  }

  .invert > * {
    filter: invert(100%);
  }

  .invert p > a {
    color: ${theme.colors.info} !important;
  }

  .invert h1,
  .invert h2 {
    border-bottom-color: ${theme.colors.muted};
  }

  .invert video,
  .invert .gatsby-resp-image-link,
  .invert div img,
  .invert p > img:not([src*=".svg"]) {
    filter: invert(100%) !important;
  }
`

class Invert extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  }

  static defaultProps = {
    children: 'Switch theme'
  }

  state = { active: false }

  onClick = e => {
    this.setState(state => ({ active: !state.active }))
  }

  render() {
    const { active } = this.state
    const props = {
      glyph: this.props.icon || (active ? 'view-fill' : 'view'),
      bg: active ? 'black' : 'slate',
      'aria-pressed': active,
      inverted: true,
      ...this.props
    }
    return (
      <>
        {active && <style dangerouslySetInnerHTML={{ __html: css }} />}
        <IconButton is={Button.button} onClick={this.onClick} {...props} />
      </>
    )
  }
}

export default Invert
