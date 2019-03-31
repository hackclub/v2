import styled, { keyframes } from 'styled-components'
import { Heading, Text, Container, theme } from '@hackclub/design-system'

export const Title = styled(Heading.h1).attrs({
  fontSize: [7, 8, 9],
  mt: 2,
  mb: [3, 4]
})`
  line-height: 1;
  letter-spacing: -0.015em;
  width: 100%;
`

export const Headline = styled(Heading.h2).attrs({
  fontSize: [6, 7],
  mb: [3, 4]
})`
  display: block;
  line-height: 1;
  width: 100%;
  letter-spacing: -0.009em;
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
  letter-spacing: -0.006em;
`

export const Featline = styled(Heading.h3).attrs({
  fontSize: 5,
  mb: 3,
  bold: true
})`
  line-height: 1;
  letter-spacing: -0.006em;
`

export const ColoredHeadline = styled(Headline).attrs({ pb: 2, mb: 3 })`
  color: ${({ colors }) => theme.cx(colors[2])};
  max-width: 54rem;
  letter-spacing: -0.009em;
  @supports (-webkit-background-clip: text) {
    background-image: linear-gradient(
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
})`
  letter-spacing: 0.006em;
`

export const Highlight = styled(Text.span)`
  border-radius: 1em;
  background-image: linear-gradient(
    -100deg,
    ${theme.hexa('yellow.2', 0.33)},
    ${theme.hexa('yellow.2', 0.95)},
    ${theme.hexa('yellow.2', 0.1)}
  );
`

const highlighter = keyframes`
  from { background-size: 0; }
  to {
    background-size: 100% 100%;
  }
`

export const AnimatedHighlight = styled(Text.span)`
  border-radius: 1em;
  animation: ${highlighter} 4s ease forwards;
  animation-delay: ${props => props.delay || 6}s;
  background-image: linear-gradient(
    -100deg,
    ${theme.hexa('yellow.2', 0.33)},
    ${theme.hexa('yellow.2', 0.95)},
    ${theme.hexa('yellow.2', 0.1)}
  );
  background-size: 0 100%;
`
