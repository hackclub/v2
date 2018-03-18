const { createElement: h } = require('react')
const theme = require('@hackclub/design-system').theme

const width = 512
const widthIcon = 0.75 * width

module.exports = props =>
  h(
    'main',
    {
      style: {
        boxSizing: 'border-box',
        width,
        height: width,
        paddingLeft: (width - widthIcon) / 2,
        background: `${theme.colors.primary}
          url(http://0.0.0.0:3000/pattern.svg) repeat`
      }
    },
    h('div', {
      style: {
        width: widthIcon,
        height: width,
        background: 'url(http://0.0.0.0:3000/logo-stacked.svg) no-repeat',
        backgroundSize: '100% auto',
        backgroundPosition: 'center'
      }
    })
  )
