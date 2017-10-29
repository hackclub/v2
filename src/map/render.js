require('babel-register')
const axios = require('axios')
const _ = require('lodash')
const { forEach, toNumber, join, first, keys } = _
const fs = require('fs')
const { renderToStaticMarkup } = require('react-dom/server')
const h = require('react').createElement
const Map = require('./Map').default
const cheerio = require('cheerio')
const SVGO = require('svgo/lib/svgo')
const colors = require('../theme').colors
const feature = require('topojson-client').feature

const args = require('minimist')(process.argv.slice(2), {
  default: {
    fill: colors.blue[0],
    stroke: colors.gray[0],
    pin: colors.primary,
    path: './public/map.svg'
  }
})
const { fill, stroke, pin, path } = args
const css = `.rsm-svg{width:100vw;height:100vh;object-fit:cover}
.rsm-geographies path{fill:${fill};stroke:${stroke};stroke-width:1;outline:none}
circle{fill:${pin};stroke-width:0;opacity:.667}`

const API = 'https://api.hackclub.com/v1/clubs'
const locations = []
axios
  .get(API)
  .then(res => {
    forEach(res.data, club => {
      const { name, latitude, longitude } = club
      const coordinates = [toNumber(longitude), toNumber(latitude)]
      locations.push({ name, coordinates })
    })
    return locations
  })
  .then(data => {
    fs.writeFile('./locations.json', JSON.stringify(locations), err => {
      console.log(err || `✅ Saved ${locations.length} locations`)
    })
  })

const GEO = 'https://unpkg.com/world-atlas@1.1.4/world/50m.json'
axios
  .get(GEO)
  .then(res => res.data)
  .then(
    paths => feature(paths, paths.objects[first(keys(paths.objects))]).features
  )
  .then(paths => {
    const body = renderToStaticMarkup(h(Map, { paths }))
    const $ = cheerio.load(body)
    $('svg').attr('xmlns', 'http://www.w3.org/2000/svg')
    $('.rsm-zoomable-group').removeAttr('transform')
    $('svg > g').prepend(`<style>${css.split(/\n/).join('')}</style>`)
    return $('body').html()
  })
  .then(svg => {
    const svgo = new SVGO({})
    svgo.optimize(svg, result => {
      if (result.error) {
        console.error(result.error)
      } else {
        fs.writeFile(path, result.data, err => {
          console.log(err || `✅ Saved map.svg`)
        })
      }
    })
  })
