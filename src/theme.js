import palx from 'palx'
import dotProp from 'dot-prop'

const red = '#e42d42'
const blue = '#2d9ce4'
export const palette = palx(blue)

export const grays = {
  black: palette.black,
  slate: palette.gray[8],
  silver: palette.gray[7],
  smoke: palette.gray[2],
  snow: palette.gray[0],
  white: '#ffffff'
}

export const brand = {
  primary: red,
  accent: palette.indigo[4],
  success: palette.teal[5],
  info: palette.blue[5],
  danger: palette.red[5],
  error: palette.red[7],
  muted: grays.silver
}

export const campTheme = {
  campPrimary: 'rgb(255, 75, 85)',
  campSecondary: 'rgb(212, 78, 116)'
}

export const colors = {
  ...brand,
  ...grays,
  ...campTheme,
  ...palette
}

export const cx = key =>
  dotProp.has(colors, key) ? dotProp.get(colors, key) : key
export const gradient = (n, from, to) =>
  `linear-gradient(${n}deg, ${cx(from)}, ${cx(to)})`
export const geo = color => `background: ${color} url('/pattern.svg') repeat`
export const wk = a => [a + ';', '-webkit-' + a + ';'].join('\n')

export const mp = [32, 48, 64, 80]
export const mx = mp.map(w => `@media screen and (min-width:${w}em)`)
export const mm = mp.map(w => `@media screen and (max-width:${w}em)`)

const theme = {
  colors,
  radius: 4,
  weights: [400, 700],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72, 96],
  font:
    'Averta, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  monospace: 'SFMono-Regular, "Roboto Mono", Menlo, monospace'
}

export default theme
