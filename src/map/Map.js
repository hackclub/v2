const React = require('react')
const {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} = require('react-simple-maps')

const Map = ({ paths, locations, ...props }) => (
  <ComposableMap width={768} {...props}>
    <ZoomableGroup disablePanning>
      <Geographies geography={paths}>
        {(geographies, projection) =>
          geographies.map(geo => (
            <Geography key={geo.id} geography={geo} projection={projection} />
          ))}
      </Geographies>
      <Markers>
        {locations.map((marker, i) => (
          <Marker
            key={i}
            marker={marker}
            children={<circle cx={0} cy={0} r={5} />}
          />
        ))}
      </Markers>
    </ZoomableGroup>
  </ComposableMap>
)

export default Map
