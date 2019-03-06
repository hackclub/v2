import React from 'react'
import styled from 'styled-components'
import {
  Flex,
  Icon,
  Text,
  IconButton,
  Field,
  theme
} from '@hackclub/design-system'

import IconTextButton from 'components/IconButton'
import Sheet from 'components/Sheet'

const CreateButton = styled(IconTextButton)`
  background-image: radial-gradient(
    ellipse farthest-corner at top left,
    ${theme.colors.cyan[5]},
    ${theme.colors.teal[6]},
    ${theme.colors.green[7]}
  );
`

export default ({
  transitionStyle,
  cancelCreation,
  newName,
  handleNewNameChange,
  newDesc,
  handleNewDescChange,
  createDraft
}) => (
  <Sheet style={transitionStyle}>
    <Flex align="center" style={{ textAlign: 'left' }} mb={4}>
      <Icon color="success" size={48} glyph="idea" mr={2} />
      <Text fontSize={4} bold>
        <Text.span color="success">Create</Text.span> a workshop here.
      </Text>
      <IconButton
        glyph="view-close-small"
        bg="smoke"
        color="black"
        ml="auto"
        p={1}
        mb={1}
        onClick={cancelCreation}
        circle
        style={{ opacity: 0.5 }}
      />
    </Flex>
    <Field
      name="name"
      label="What are we learning?"
      placeholder="Getting started with React Hooks"
      value={newName}
      onChange={handleNewNameChange}
    />

    <Field
      name="description"
      label="Give your workshop a description."
      placeholder="How to create amazing apps using Hooks."
      value={newDesc}
      onChange={handleNewDescChange}
    />

    <CreateButton
      disabled={newName === ''}
      onClick={createDraft}
      bg="success"
      mt={4}
      glyph="markdown"
    >
      Start writing
    </CreateButton>
  </Sheet>
)
