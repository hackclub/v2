import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@hackclub/design-system'
import IconButton from 'components/IconButton'

const css = `
html {
  filter: invert(100%);
}

img:not([src*=".svg"]),
video,
.invert {
  filter: invert(100%);
}
`

class Invert extends Component {
  state = { active: false }

  onClick = e => {
    this.setState(state => ({ active: !state.active }))
  }

  render() {
    const { active } = this.state
    const props = {
      name: 'filter_b_and_w',
      className: 'invert',
      bg: active ? 'black' : 'slate',
      'aria-pressed': active,
      inverted: this.props.muted ? !active : true,
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

Invert.propTypes = {
  muted: PropTypes.bool,
  children: PropTypes.element
}

Invert.defaultProps = {
  muted: false,
  children: 'Switch theme'
}
