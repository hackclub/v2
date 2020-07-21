import styled, { css } from 'styled-components'
import { Sheet, BackgroundImage, theme } from '@hackclub/design-system'
import PropTypes from 'prop-types'

const Photo = styled(Sheet.withComponent(BackgroundImage)).attrs({
  role: 'img',
  p: 0
})`
  min-height: 18rem;
  position: relative;
  ${theme.mediaQueries.md} {
    min-height: 25rem;
  }
  ${(props) =>
    props.captioned &&
    css`
      &:after {
        content: attr(alt);
        box-sizing: border-box;
        border-radius: 0 0 ${theme.radii[2]} ${theme.radii[2]};
        display: block;
        font-size: ${theme.fontSizes[2]}px;
        padding: ${theme.space[2]}px ${theme.space[3]}px;
        position: absolute;
        ${props.captionTop
          ? css`
              top: 0;
            `
          : css`
              bottom: 0;
            `};
        width: 100%;
        max-width: 100%;
        ${(props) =>
          props.dark
            ? css`
                background-color: rgba(0, 0, 0, 0.875);
                color: ${theme.colors.white};
                @supports (-webkit-backdrop-filter: none) or
                  (backdrop-filter: none) {
                  background-color: rgba(0, 0, 0, 0.75);
                  -webkit-backdrop-filter: saturate(180%) blur(16px);
                }
              `
            : css`
                background-color: rgba(255, 255, 255, 0.98);
                color: ${theme.colors.black};
                @supports (-webkit-backdrop-filter: none) or
                  (backdrop-filter: none) {
                  background-color: rgba(255, 255, 255, 0.75);
                  -webkit-backdrop-filter: saturate(180%) blur(20px);
                }
              `};
        ${theme.mediaQueries.reduceTransparency} {
          -webkit-backdrop-filter: auto !important;
        }
      }
    `}
`

Photo.defaultProps = {
  captioned: true
}

Photo.propTypes = {
  captioned: PropTypes.bool,
  captionTop: PropTypes.bool,
  dark: PropTypes.bool
}

export default Photo
