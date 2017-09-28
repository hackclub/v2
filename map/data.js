const axios = require('axios')
const _ = require('lodash')
const { forEach, toNumber, join } = _
const fs = require('fs')

const API = 'https://api.hackclub.com/v1/clubs'
const GEO = 'https://unpkg.com/world-atlas@1.1.4/world/50m.json'

const locations = []
axios
  .get(API)
  .then(res => {
    forEach(res.data, club => {
      const { name } = club
      const coordinates = [toNumber(club.longitude), toNumber(club.latitude)]
      locations.push({ name, coordinates })
    })
    return locations
  })
  .then(data => {
    fs.writeFile('./map/locations.json', JSON.stringify(locations), err => {
      if (err) {
        console.log(err)
      } else {
        console.log(`✅ Saved ${locations.length} locations`)
      }
    })
  })

axios.get(GEO).then(res => {
  fs.writeFile('./static/geo.json', JSON.stringify(res.data), err => {
    if (err) {
      console.log(err)
    } else {
      console.log(`✅ Saved geographies`)
    }
  })
})
