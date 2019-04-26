import styled, { css, keyframes } from 'styled-components'
import { Heading, Text, Container, theme } from '@hackclub/design-system'

export const Title = styled(Heading.h1).attrs({
  fontSize: [7, 8, 9],
  mb: [3, 4]
})`
  letter-spacing: -0.03125em;
  line-height: 1.125;
`

export const Headline = styled(Heading.h2).attrs({
  fontSize: [6, 7],
  mb: [3, 4]
})`
  display: block;
  line-height: 1;
  letter-spacing: -0.02em;
`

export const Subhline = styled(Heading.h3).attrs({
  fontSize: [5, 6],
  bold: true,
  mb: 2
})`
  line-height: 1.125;
  letter-spacing: -0.02em;
`

export const Featline = styled(Heading.h3).attrs({
  fontSize: 5,
  mb: 3,
  bold: true
})`
  line-height: 1;
  letter-spacing: -0.01em;
`

const color = css`
  color: ${({ colors }) => theme.cx(colors[2])};
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
// Colored text needs pb: 2 to avoid cropping descenders
export const ColoredTitle = styled(Title).attrs({ pb: 2 })`
  ${color}
`
export const ColoredHeadline = styled(Headline).attrs({
  pb: 2,
  mb: [2, 3],
  maxWidth: 54
})`
  ${color}
`

export const Lead = styled(Container.withComponent(Text)).attrs({
  fontSize: [3, 4]
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
