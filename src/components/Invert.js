import React, { Component, Fragment } from 'react'
import { Button } from '@hackclub/design-system'
import IconButton from 'components/IconButton'

const css = `
:root {
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
      ...this.props,
      bg: active ? 'black' : 'slate',
      onClick: this.onClick,
      'aria-pressed': active,
      inverted: true
    }
    return (
      <Fragment>
        {active && <style dangerouslySetInnerHTML={{ __html: css }} />}
        <IconButton
          is={Button.button}
          bg={props.bg}
          name="filter_b_and_w"
          className="invert"
          children="Switch theme"
          inverted
          {...props}
        />
      </Fragment>
    )
  }
}

export default Invert
