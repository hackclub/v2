const React = require('react')
const {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} = require('react-simple-maps')
const { colors, grays } = require('../src/theme')
const locations = require('./locations')
const geo = require('./geo')
const styled = require('styled-components').default

const Pin = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={12}
    height={12}
  >
    <path
      d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z "
      fill={colors.primary}
    />
  </svg>
)

// const StyledGeo = styled(Geography)`
//   fill: ${grays.smoke};
//   stroke: ${grays.snow};
//   stroke-width: 0.75;
//   outline: none;
//   /* hide antarctica */
//   &[d^='M239.4352835706319'] {
//     display: none;
//   }
// `

const Map = props => (
  <ComposableMap width={1024} {...props}>
    <ZoomableGroup disablePanning>
      <Geographies geographyUrl="/static/geo.json">
        {(geographies, projection) =>
          geographies.map((geography, i) => (
            <Geography key={i} geography={geography} projection={projection} />
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

export default Map
