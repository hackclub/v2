require('babel-register')
const axios = require('axios')
const _ = require('lodash')
const { forEach, toNumber, join, first, keys } = _
const { createElement: h } = require('react')
const {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} = require('react-simple-maps')
const { renderToStaticMarkup } = require('react-dom/server')
const cheerio = require('cheerio')
const SVGO = require('svgo/lib/svgo')
const colors = require('@hackclub/design-system').theme.colors
const feature = require('topojson-client').feature
const fs = require('fs')

const Map = props =>
  h(
    ComposableMap,
    { width: 768 },
    h(
      ZoomableGroup,
      { disablePanning: true },
      h(Geographies, { geography: props.paths }, (geographies, projection) =>
        geographies.map(geography =>
          h(Geography, { key: geography.id, geography, projection })
        )
      ),
      h(
        Markers,
        {},
        props.locations.map((marker, i) =>
          h(
            Marker,
            {
              key: i,
              marker
            },
            h('circle', { cx: 0, cy: 0, r: 6 })
          )
        )
      )
    )
  )

const args = require('minimist')(process.argv.slice(2), {
  default: {
    fill: colors.black,
    pin: colors.blue[6],
    path: './static/map.svg'
  }
})
const { fill, pin, path } = args
const css = `.rsm-svg{width:100vw;height:100vh;object-fit:cover}
.rsm-geographies path{fill:${fill};stroke-width:0;outline:none}
.rsm-markers circle{fill:${pin};stroke-width:0;opacity:.667}`

const API = 'https://api.hackclub.com/v1/new_clubs'
const GEO = 'https://unpkg.com/world-atlas@1.1.4/world/110m.json'
const locations = []
axios(API)
  .then(res => {
    forEach(res.data, club => {
      const { high_school_latitude, high_school_longitude } = club
      const coordinates = [
        toNumber(high_school_longitude),
        toNumber(high_school_latitude)
      ]
      locations.push({ coordinates })
    })
    return locations
  })
  .then(locations =>
    axios(GEO)
      .then(res => res.data)
      .then(
        paths =>
          feature(paths, paths.objects[first(keys(paths.objects))]).features
      )
      .then(paths => ({ paths, locations }))
  )
  .then(props => {
    console.log('Downloaded data')
    const body = renderToStaticMarkup(h(Map, props))
    const $ = cheerio.load(body)
    $('svg').attr('xmlns', 'http://www.w3.org/2000/svg')
    $('.rsm-zoomable-group').removeAttr('transform')
    $('.rsm-markers circle').removeAttr('tabindex')
    $('svg > g').prepend(`<style>${css.split(/\n/).join('')}</style>`)
    return $('body').html()
  })
  .then(svg => {
    console.log('Rendered SVG')
    const svgo = new SVGO({
      plugins: [
        {
          convertPathData: {
            floatPrecision: 1,
            transformPrecision: 1,
            leadingZero: false
          }
        }
      ]
    })
    svgo
      .optimize(svg)
      .then(result => {
        console.log('Optimized SVG')
        fs.writeFile(path, result.data, err => {
          const size = fs.statSync(path)['size'] / 1000
          console.log(err || `✅  Saved ${path} (${size} KB)`)
        })
      })
      .catch(error => console.error(result.error))
  })
