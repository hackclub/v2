import styled from 'styled-components'
import { Sheet, BackgroundImage, theme } from '@hackclub/design-system'

const Photo = styled(Sheet.withComponent(BackgroundImage)).attrs({
  role: 'img',
  p: 0
})`
  min-height: 18rem;
  position: relative;
  ${theme.mediaQueries.md} {
    min-height: 25rem;
  }
  &:after {
    content: attr(alt);
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.875);
    border-radius: 0 0 ${theme.radii[2]} ${theme.radii[2]};
    bottom: 0;
    color: ${theme.colors.white};
    display: block;
    font-size: ${theme.fontSizes[2]}px;
    padding: ${theme.space[2]}px ${theme.space[3]}px;
    position: absolute;
    width: 100%;
    max-width: 100%;
    @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
      background-color: rgba(0, 0, 0, 0.75);
      -webkit-backdrop-filter: saturate(180%) blur(16px);
    }
    ${theme.mediaQueries.reduceTransparency} {
      -webkit-backdrop-filter: auto !important;
    }
  }
`

export default Photo
