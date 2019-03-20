import styled from 'styled-components'
import { Heading, Text, Container, theme } from '@hackclub/design-system'

export const Title = styled(Heading.h1).attrs({
  fontSize: [7, 8, 9],
  mt: 2,
  mb: [3, 4]
})`
  line-height: 1;
  width: 100%;
`

export const Headline = styled(Heading.h2).attrs({
  fontSize: [6, 7],
  mb: [3, 4]
})`
  display: block;
  line-height: 1;
  width: 100%;
  ${theme.mediaQueries.lg} {
    line-height: 0.9375;
  }
`

export const Subhline = styled(Heading.h3).attrs({
  fontSize: [5, 6],
  mb: 3,
  bold: true
})`
  line-height: 1;
`

export const Featline = styled(Heading.h3).attrs({
  fontSize: 5,
  mb: 3,
  bold: true
})`
  line-height: 1;
`

export const ColoredHeadline = styled(Headline).attrs({ pb: 2, mb: 3 })`
  color: ${({ colors }) => theme.cx(colors[2])};
  max-width: 54rem;
  @supports (-webkit-background-clip: text) {
    background: linear-gradient(
      to right,
      ${({ colors }) => theme.cx(colors[0])} 25%,
      ${({ colors }) => theme.cx(colors[1])} 50%,
      ${({ colors }) => theme.cx(colors[2])}
    );
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

export const Lead = styled(Container.withComponent(Text)).attrs({
  fontSize: 3
})``

export const Highlight = styled(Text.span)`
  border-radius: 1em;
  background-image: linear-gradient(
    -100deg,
    ${theme.hexa('yellow.2', 0.33)},
    ${theme.hexa('yellow.2', 0.95)},
    ${theme.hexa('yellow.2', 0.1)}
  );
`
