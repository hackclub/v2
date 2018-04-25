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
        backgroundColor: '#e42d42',
        backgroundImage: 'linear-gradient(32deg, #e42d9e, #e42d42)'
      }
    },
    h('img', {
      src: 'https://icon.now.sh/poll/ffffff',
      style: { width: widthIcon }
    })
  )
