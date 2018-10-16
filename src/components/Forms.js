import React, { Component, Fragment } from 'react'
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Input,
  Label,
  LargeButton,
  Icon,
  Text,
  theme
} from '@hackclub/design-system'
import { Prompt } from 'react-router'
import MarkdownRenderer from 'components/MarkdownRenderer'
import styled from 'styled-components'

const SaveBaseIcon = styled(Icon)`
  position: fixed;
  bottom: 0;
  left: 0;
  opacity: ${props => (props.saved ? 0 : 0.25)};
  transition-duration: ${props => (props.saved ? 2 : 1)}s;
  transition-delay: ${props => (props.saved ? 4 : 0)}s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
`

const SaveStatusIcon = ({ saved }) => (
  <SaveBaseIcon
    name={saved ? 'cloud_done' : 'cloud_upload'}
    color={saved ? 'slate' : 'slate'}
    size={32}
    m={2}
    saved={saved}
  />
)

const SaveStatusLine = styled(Box)`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  border-style: solid;
  border-width: 0;
  border-top-width: 1px;
  opacity: ${props => (props.saved ? 2 / 3 : 1)};
  transition-duration: 1s;
  color: ${props => props.theme.colors[props.saved ? 'slate' : 'primary']};
  box-shadow: 0 0 4px ${props => (props.saved ? '0px' : '2px')};
`

const SaveStatus = ({ saved, type = 'all' }) => (
  <Fragment>
    {['all', 'text'].indexOf(type) !== -1 && <SaveStatusIcon saved={saved} />}
    {['all', 'underline'].indexOf(type) !== -1 && (
      <SaveStatusLine saved={saved} />
    )}
  </Fragment>
)

export class AutoSaver extends Component {
  state = { previousValues: this.props.values }

  componentWillMount() {
    const intervalId = setInterval(::this.autoSave, 1000)
    this.setState({ intervalId })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  autoSave() {
    const { handleSubmit, isSubmitting, values } = this.props
    const { previousValues } = this.state
    const unsavedChanges = previousValues !== values

    this.setState({ unsavedChanges })

    if (unsavedChanges && !isSubmitting) {
      /* This is super hacky and should be changed -- basically if we have a new
       * ID it's because the parent form is now holding a new record. We don't
       * want to save the new record though because it's just loaded, so we'll
       * set the previousValues to the new record's values */
      const changedRecord = previousValues.id !== values.id

      if (!changedRecord) {
        // We have to call handleSubmit this way because formik:
        // https://github.com/jaredpalmer/formik/issues/347
        handleSubmit({ preventDefault: () => null })
      }

      this.setState({
        previousValues: values
      })
    }
  }

  render() {
    const { unsavedChanges } = this.state
    const { saveNotification } = this.props
    return (
      <Fragment>
        <SaveStatus type={saveNotification} saved={!unsavedChanges} />
        {unsavedChanges && <ConfirmClose />}
      </Fragment>
    )
  }
}

export const Error = styled(Text.span).attrs({
  className: 'error',
  color: 'error',
  f: 1,
  ml: 1
})`
  text-transform: lowercase;
  &:before {
    content: '— ';
  }
`

export const Hint = styled(Text.span).attrs({
  color: 'slate',
  f: 1,
  mt: 1,
  align: 'left'
})`
  display: block;
  line-height: 1.375;
`

export class ConfirmClose extends Component {
  componentWillMount() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm
    window.onbeforeunload = () => window.confirm()
  }

  componentWillUnmount() {
    window.onbeforeunload = null
  }

  render() {
    return (
      <Prompt message="Hold on, you're about to lose unsaved changes! Sure you want to leave?" />
    )
  }
}

export const Optional = () => (
  <Text.span
    className="optional"
    f={1}
    ml={1}
    color="muted"
    children="(optional)"
  />
)

export class Field extends Component {
  componentWillMount() {
    const { type, renderMarkdown } = this.props
    const Tag = Input.withComponent(
      ['textarea', 'select'].indexOf(type) === -1 ? 'input' : type
    )

    this.setState({ Tag, isEditing: false })
  }

  onBlur = e => {
    const { renderMarkdown, onBlur } = this.props
    if (renderMarkdown) {
      this.setState({ isEditing: false })
    }
    if (onBlur) {
      return onBlur(e)
    }
  }

  onFocus = () => {
    if (this.props.renderMarkdown) {
      this.setState({ isEditing: true })
    }
  }

  render() {
    const {
      type = 'text',
      name = 'name',
      label,
      p,
      children,
      error,
      hint,
      optional,
      value,
      renderMarkdown,
      bg,
      mb = 3,
      ...props
    } = this.props

    const { Tag, isEditing } = this.state

    return (
      <Label className={type} mb={mb} id={name}>
        <Flex style={{ display: 'inline' }} wrap>
          <span>{label}</span>
          {optional ? <Optional /> : null}
          {error && <Error children={error} />}
        </Flex>
        {renderMarkdown && (
          <Card
            onClick={this.onFocus}
            hidden={isEditing}
            boxShadowSize="sm"
            mt={1}
            p={[2, 3]}
            w={1}
            bg={bg}
            style={{ cursor: 'pointer' }}
          >
            <MarkdownRenderer content={value || ' '} />
          </Card>
        )}
        <Tag
          name={name}
          type={type}
          rows={type === 'textarea' ? 5 : null}
          placeholder={p}
          children={children}
          {...this.props}
          onBlur={this.onBlur}
          value={value}
          bg={bg}
          hidden={renderMarkdown && !isEditing ? true : false}
        />
        {hint && <Hint children={hint} />}
        {renderMarkdown && <Hint children="click to edit" />}
      </Label>
    )
  }
}
export const Submit = styled(Button.withComponent('input')).attrs({
  type: 'submit',
  color: 'white',
  py: 2,
  px: 3,
  f: 2
})`
  text-transform: uppercase;
`
Submit.lg = styled(LargeButton.withComponent('input')).attrs({
  type: 'submit',
  color: 'white',
  py: 3,
  px: 4,
  f: 3
})`
  text-transform: uppercase;
`

export const FormWrapper = styled(Flex.withComponent(Container))`
  flex-direction: column;
`

export const Form = styled(Container.withComponent('form')).attrs({
  py: 4,
  px: 3,
  maxWidth: 42
})`
  display: grid;
  grid-gap: 1rem;
  ${theme.mediaQueries[1]} {
    grid-template-columns: repeat(1, 1fr);
    h2,
    .textarea {
      grid-column: 1 / -1;
    }
  }
  textarea {
    resize: vertical;
  }
`

export const Subheading = styled(Heading.h2).attrs({
  f: 4,
  color: 'primary'
})`
  text-transform: capitalize;
`

const HeadingBox = styled(Box).attrs({
  mr: 3
})`
  text-align: left;
  order: 1;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  ${theme.mediaQueries[1]} {
    flex-basis: 7rem;
    text-align: right;
  }
`

const FieldsBox = styled(Box).attrs({})`
  order: 2;
  flex-grow: 1;
`

export const Fieldset = props => (
  <Flex flexDirection={['column', 'row']}>
    <HeadingBox>
      <Subheading id={props.section}>{props.section}</Subheading>
    </HeadingBox>
    <FieldsBox>{props.children}</FieldsBox>
  </Flex>
)

export const Aside = props => <Box bg="snow" {...props} />
