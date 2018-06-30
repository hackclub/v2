import React from 'react'
import { cx } from '@hackclub/design-system'
import {
  XYPlot,
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis
} from 'react-vis'
import 'components/../../node_modules/react-vis/dist/style.css'

export default ({ data, height = 150, width = 400 }) => (
  <XYPlot height={height} width={width} xType="ordinal">
    <VerticalGridLines />
    <HorizontalGridLines />
    <XAxis tickTotal={5} />
    <YAxis />
    <VerticalBarSeries data={data} color={cx('primary')} />
  </XYPlot>
)
