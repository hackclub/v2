import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@hackclub/design-system'
import IconButton from 'components/IconButton'

const css = `
  .invert {
    background-color: #fff;
    filter: invert(100%);
  }

  img:not([src*=".svg"]),
  video {
    filter: invert(100%);
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
      name: this.props.icon || (active ? 'invert_colors_off' : 'invert_colors'),
      bg: active ? 'black' : 'slate',
      'aria-pressed': active,
      inverted: true,
      ...this.props
    }
    return (
      <Fragment>
        {active && <style dangerouslySetInnerHTML={{ __html: css }} />}
        <IconButton is={Button.button} onClick={this.onClick} {...props} />
      </Fragment>
    )
  }
}

export default Invert
