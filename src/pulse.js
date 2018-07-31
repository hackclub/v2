import React from 'react'
import Helmet from 'react-helmet'
import { cx } from '@hackclub/design-system'
import { keyframes } from 'styled-components'

const colors =
  'blue indigo violet fuschia pink red orange yellow green teal cyan gray blue'
const names = colors.split(' ')
const s = n => (100 / 12) * n
const step = n => `${s(n)}%`
const points = Array.from({ length: 13 }, (m, n) => n)
const frames = points.map(n => `background-color: ${cx(`${names[n]}.0`)}`)
const styles = points.map(p => `${step(p)} { ${frames[p]} }`).join('\n')
const pulse = keyframes([], styles)

const Pulse = () => (
  <Helmet>
    <style
      children={`
        body {
          background-color: ${cx('blue.0')};
          background-image: linear-gradient(
            128deg,
            rgba(255, 0, 0, 0.0625),
            rgba(0, 255, 255, 0.125)
          );
          background-blend-mode: overlay;
          animation: ${pulse} 48s linear infinite;
        }
      `}
    />
  </Helmet>
)

export default Pulse
