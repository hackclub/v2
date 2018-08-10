import styled from 'styled-components'
import { Heading } from '@hackclub/design-system'

const Name = styled(Heading.h1)`
  mix-blend-mode: screen;
  background-color: ${({ theme }) => theme.colors.white};
  color: black;
  display: inline-block;
  padding-left: ${({ theme }) => theme.space[3]}px;
  padding-right: ${({ theme }) => theme.space[3]}px;
  clip-path: polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.125);
`

export default Name
