import styled from 'styled-components'
import { Box, hexa } from '@hackclub/design-system'
import Icon from '@hackclub/icons'

const GlowingIcon = styled(Box.withComponent(Icon))`
  filter: drop-shadow(0 0 4px ${({ color }) => hexa(color, 0.75)});
  position: relative;
`

export default GlowingIcon
