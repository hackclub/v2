const { createElement: h } = require('react')

const width = 512
const widthIcon = 0.75 * width
const padding = 0.125 * width

module.exports = props =>
  h(
    'div',
    {
      style: {
        boxSizing: 'border-box',
        margin: 0,
        padding,
        width,
        height: width,
        backgroundColor: '#e4732d',
        backgroundImage: 'linear-gradient(96deg, #e4732d, #e42d42)'
      }
    },
    h('img', {
      src: 'https://icon.now.sh/extension/ffffff',
      style: { width: widthIcon }
    })
  )
