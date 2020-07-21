import React from 'react'
import styled from 'styled-components'
import {
  Box,
  Text,
  Flex,
  Icon,
  Avatar,
  theme as base
} from '@hackclub/design-system'
import { Title, Headline, Lead } from 'components/Content'

export const theme = {
  ...base,
  colors: {
    ...base.colors,
    darkless: '#252429',
    primary: '#ff8c37',
    red: '#ec3750',
    yellow: '#f1c40f',
    green: '#33d6a6',
    cyan: '#5bc0de',
    blue: '#338eda'
  }
}

export const Section = styled(Box.section).attrs({ py: [6, 7, 8] })``

export const SectionTitle = styled(Title).attrs({
  color: 'white',
  fontSize: [8, 9, 128]
})``

export const Cols = styled(Box)`
  display: grid;
  grid-gap: ${(props) => theme.space[props.gap[0]]}px;
  ${theme.mediaQueries.sm} {
    grid-gap: ${(props) => theme.space[props.gap[1]]}px;
    grid-template-columns: ${(props) => props.cols};
  }
  > ${Headline}:first-child {
    color: ${theme.colors.white};
    margin-bottom: 0;
  }
`
Cols.defaultProps = {
  cols: '1fr 1fr',
  gap: [3, 4],
  mt: [4, 5],
  mb: [4, 5]
}

const QuoteBase = styled(Box)`
  ${theme.mediaQueries.md} {
    svg {
      width: 48px;
      height: 48px;
      margin-left: -${theme.space[1]}px;
    }
  }
  img + div {
    line-height: 1.25;
  }
`

export const Quote = ({ body, img, name, detail, credential, ...props }) => (
  <QuoteBase {...props}>
    <Icon glyph="quote" color={theme.colors.primary} size={32} />
    <Lead color="muted" children={body} />
    <Flex align="center" mt={3}>
      <Avatar src={`/hackers/${img}`} size={48} mr={3} />
      <Box color="muted" align="left" fontSize={3}>
        <Text.span color="smoke" bold>
          {name}
        </Text.span>
        {detail && <Text.span>, {detail}</Text.span>}
        {credential && <Text fontSize={2}>{credential}</Text>}
      </Box>
    </Flex>
  </QuoteBase>
)

export default () => <></>
