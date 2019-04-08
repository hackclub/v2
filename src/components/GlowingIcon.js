import styled from 'styled-components'
import { Icon, hexa } from '@hackclub/design-system'

const GlowingIcon = styled(Icon)`
  filter: drop-shadow(0 0 4px ${({ color }) => hexa(color, 0.5)});
  position: relative;
`

export default GlowingIcon
