const { createElement: h } = require('react')
const theme = require('@hackclub/design-system').theme

const width = 1024
const widthIcon = 2 * width / 3

module.exports = props =>
  h(
    'main',
    {
      style: {
        boxSizing: 'border-box',
        width,
        height: width,
        paddingLeft: (width - widthIcon) / 2 + 16,
        background: `${theme.colors.primary}
          url(http://0.0.0.0:3000/pattern.svg) repeat`,
        backgroundSize: width
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
