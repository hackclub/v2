import React, { Component } from 'react'
import styled from 'styled-components'
import QuotedComment from 'components/challenge/QuotedComment'
import { Box, Input, theme } from '@hackclub/design-system'

const Root = styled(Box)`
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.smoke};
  border-radius: 21px;
  ${Input} {
    border: 0;
    box-shadow: none !important;
    padding: ${theme.space[1]}px ${theme.space[2]}px;
  }
`

class Composer extends Component {
  onChange = e => {
    const { value } = e.target
    this.props.onChange('body', value)
  }

  render() {
    const { parent, onUnparent, ...props } = this.props
    return (
      <Root>
        {parent && (
          <QuotedComment
            data={parent}
            onDelete={onUnparent}
            bg="snow"
            pb={3}
            p={2}
          />
        )}
        <Input
          name="body"
          placeholder="Add your comment…"
          {...props}
          onChange={this.onChange}
        />
      </Root>
    )
  }
}

export default Composer
