import styled, { css } from 'styled-components'
import { Card, Container } from '@hackclub/design-system'
import PropTypes from 'prop-types'

const Sheet = styled(Card.withComponent(Container))`
  border-radius: ${({ theme }) => theme.radii[2]};
  ${props =>
    !props.flat &&
    css`
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.0625);
    `};
`
Sheet.defaultProps = {
  bg: 'rgba(255, 255, 255, 0.875)',
  p: [3, 4],
  color: 'black',
  w: 1,
  mb: 4
}
Sheet.propTypes = {
  flat: PropTypes.boolean
}

export default Sheet
