import styled from 'styled-components'
import { Box, Text, theme } from '@hackclub/design-system'
import { Title, Headline, Lead } from 'components/Content'

export const Section = styled(Box.section).attrs({ py: [5, 6, 7, 8] })``

export const SectionTitle = styled(Title).attrs({ fontSize: [7, 8, 9, 10] })``

export const Cols = styled(Box)`
  display: grid;
  grid-gap: ${theme.space[3]}px;
  ${theme.mediaQueries.sm} {
    grid-gap: ${theme.space[4]}px;
    grid-template-columns: ${props => props.cols};
  }
`
Cols.defaultProps = {
  cols: '1fr 1fr',
  my: [3, 4]
}

export const SectionEyebrow = styled(Text).attrs({
  fontSize: [4, 5],
  bold: true,
  color: 'muted'
})``
export const SectionHeadline = styled(Headline).attrs({
  fontSize: [7, 8],
  mt: 1,
  mb: 4
})`
  line-height: 1;
`
export const SectionLead = styled(Lead).attrs({
  fontSize: [3, 4],
  maxWidth: 48,
  mx: 0,
  pb: 3,
  mb: [4, 5]
})``
