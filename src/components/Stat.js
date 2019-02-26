import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Text } from '@hackclub/design-system'

const Base = styled(Box).attrs({ mt: 1, mb: 1, width: 128, align: 'center' })`
  display: inline-block;
  line-height: 1;
`

const Stat = ({
  label,
  value,
  children,
  fontSize = [6, 7],
  labelColor = 'snow',
  ...props
}) => (
  <Base {...props}>
    {children}
    <Text.span fontSize={fontSize} m={0} bold children={value} />
    {label && (
      <Text color={labelColor} fontSize={2} m={0} caps children={label} />
    )}
  </Base>
)

Stat.propTypes = {
  label: PropTypes.string,
  value: PropTypes.element.isRequired,
  children: PropTypes.element,
  labelColor: PropTypes.string,
  fontSize: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.number,
    PropTypes.string
  ])
}

export default Stat
