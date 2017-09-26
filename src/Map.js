import React, { Component } from 'react'
import axios from 'axios'
import { forEach, toNumber, join } from 'lodash'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from 'react-simple-maps'
import { colors, grays } from './theme'

const CORS = 'https://cors-anywhere.herokuapp.com/'
const DATA = 'https://api.hackclub.com/v1/clubs'

const Pin = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={12}
    height={12}
  >
    <path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z "
      fill={colors.primary}
    />
  </svg>
)

class Map extends Component {
  constructor() {
    super()
    this.state = { locations: [] }
  }

  componentWillMount() {
    this.fetchData()
  }

  fetchData() {
    const locations = []
    axios
      .get(CORS + DATA)
      .then(res => {
        forEach(res.data, club => {
          const { name } = club
          const coordinates = [
            toNumber(club.longitude),
            toNumber(club.latitude)
          ]
          locations.push({ name, coordinates })
        })
        return locations
      })
      .then(data => {
        this.setState({ locations })
      })
  }

  render() {
    const { locations } = this.state
    return (
      <ComposableMap
        style={{
          width: '100%',
          height: '100vh'
        }}
      >
        <ZoomableGroup disablePanning>
          <Geographies geographyUrl="https://unpkg.com/world-atlas@1.1.4/world/50m.json">
            {(geographies, projection) =>
              geographies.map((geography, i) => (
                <Geography
                  key={i}
                  geography={geography}
                  projection={projection}
                  style={{
                    default: {
                      fill: grays.smoke,
                      stroke: grays.snow,
                      strokeWidth: 0.75,
                      outline: 'none'
                    },
                    hover: {
                      fill: grays.smoke,
                      stroke: grays.snow
                    },
                    pressed: {
                      fill: grays.smoke,
                      stroke: grays.snow
                    }
                  }}
                />
              ))}
          </Geographies>
          <Markers>
            {locations.map((marker, i) => (
              <Marker key={i} marker={marker} children={<Pin />} />
            ))}
          </Markers>
        </ZoomableGroup>
      </ComposableMap>
    )
  }
}

export default Map
