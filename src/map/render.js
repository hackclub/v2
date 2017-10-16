require('babel-register')
const fs = require('fs')
const path = require('path')
const { renderToStaticMarkup } = require('react-dom/server')
const h = require('react').createElement
const Map = require('./Map').default

const body = renderToStaticMarkup(h(Map))

const filename = path.join(__dirname, './map/index.html')
fs.writeFileSync(filename, body)
