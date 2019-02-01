import React from 'react'
import styled from 'styled-components'
import {
  Box,
  IconButton,
  Heading,
  theme,
  mediaQueries
} from '@hackclub/design-system'
import ReactMarkdown from 'react-markdown'

import Sheet from 'components/Sheet'
import MarkdownBody from 'components/MarkdownBody'
import Name from 'components/Name'

const TwoColumn = styled(Box).attrs({
  p: [0, 5]
})`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${theme.space[5]}px;
  flex: 1;

  ${mediaQueries.lg} {
    grid-template-columns: repeat(2, 1fr);
  }

  > div {
    height: 100%;
    color: ${theme.colors.black};
  }

  > div:first-child {
    display: ${props => (props.view === 'edit' ? 'block' : 'none')};
  }

  > div:nth-child(2) {
    display: ${props => (props.view === 'edit' ? 'none' : 'block')};

    ${mediaQueries.lg} {
      display: block;
    }
  }
`

const Toggle = styled(IconButton)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  opacity: 0.3;
  display: block;

  ${mediaQueries.lg} {
    display: none;
  }
`

const Editor = styled.textarea`
  border: 0;
  outline: 0;
  font-family: ${theme.mono};
  font-size: 18px;
  width: 100%;
  height: 100%;
  background: none;
`

const MetaPreview = styled(Box)`
  background-image: url('/workshops/personal_website.svg');
  text-align: center;
  padding: 32px 16px;
`

const BodyPreview = styled(MarkdownBody)`
  > div {
    ${mediaQueries.lg} {
      // half the screen - 36px * 3
      max-width: calc(50vw - 108px);
    }
  }
`

export default ({
  view,
  toggleView,
  value,
  handleInputChange,
  name,
  description
}) => (
  <TwoColumn view={view}>
    <Sheet p={5}>
      <Toggle bg="slate" circle glyph="view" onClick={toggleView} />
      <Editor
        autoFocus
        autoCorrect
        autoCapitalize
        autoComplete
        placeholder="Write your *markdown* here..."
        value={value}
        onChange={handleInputChange}
      />
    </Sheet>

    <Sheet p={0}>
      <Toggle bg="slate" circle glyph="view" onClick={toggleView} />
      <MetaPreview>
        <Name>{name}</Name>
        <Heading.h2 fontSize={[4, 5]} color="white" bold mt={1}>
          {description}
        </Heading.h2>
      </MetaPreview>

      <Box p={5} pt={1}>
        <BodyPreview>
          <ReactMarkdown source={value} />
        </BodyPreview>
      </Box>
    </Sheet>
  </TwoColumn>
)
