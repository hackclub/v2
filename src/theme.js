import { theme as DS } from '@hackclub/design-system'

export const colors = DS.colors

export const cx = DS.cx
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
  font: DS.font,
  monospace: 'SFMono-Regular, "Roboto Mono", Menlo, monospace'
}

export default theme
