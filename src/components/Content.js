import styled from 'styled-components'
import { Heading, Text, Container, hexa, cx } from '@hackclub/design-system'

export const Title = styled(Heading.h1).attrs({
  f: [7, 8, 9],
  mt: 2,
  mb: [3, 4]
})`
  line-height: 1;
  width: 100%;
`

export const Headline = styled(Heading.h2).attrs({
  f: [6, 7],
  mb: [3, 4]
})`
  display: block;
  line-height: 1;
  width: 100%;
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
  color: ${({ colors }) => cx(colors[2])};
  max-width: 54rem;
  @supports (-webkit-background-clip: text) {
    background: linear-gradient(
      to right,
      ${({ colors }) => cx(colors[0])} 25%,
      ${({ colors }) => cx(colors[1])} 50%,
      ${({ colors }) => cx(colors[2])}
    );
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

export const Lead = styled(Container.withComponent(Text)).attrs({ f: 3 })``

export const Highlight = styled(Text.span)`
  border-radius: 1em;
  background-image: linear-gradient(
    -100deg,
    ${hexa('yellow.2', 0.33)},
    ${hexa('yellow.2', 0.95)},
    ${hexa('yellow.2', 0.1)}
  );
`
