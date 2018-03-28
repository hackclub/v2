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
  Text,
  colors
} from '@hackclub/design-system'
import { Prompt } from 'react-router'
import MarkdownRenderer from 'components/MarkdownRenderer'

const SaveStatusText = Text.extend.attrs({
  f: [1, 3],
  p: 1,
  m: 2,
  bg: 'white',
  children: props => (props.saved ? 'Saved' : 'Saving...'),
  color: props => (props.saved ? 'slate' : 'primary')
})`
  position: fixed;
  bottom: 0;
  left: 0;
  border-style: solid;
  border-width: 1px;
  border-color: ${props =>
    props.theme.colors[props.saved ? 'slate' : 'primary']};
  border-radius: 4px;
  opacity: ${props => (props.saved ? 0 : 1)};
  transition-duration: ${props => (props.saved ? 2 : 1)}s;
  transition-delay: ${props => (props.saved ? 4 : 0)}s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
`

const SaveStatusLine = Box.extend`
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

const SaveStatus = props => (
  <Fragment>
    <SaveStatusText saved={props.saved} />
    <SaveStatusLine saved={props.saved} />
  </Fragment>
)

export class AutoSaver extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previousValues: props.values
    }
    this.autoSave = this.autoSave.bind(this)
  }

  componentWillMount() {
    const intervalId = setInterval(this.autoSave, 1000)
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
    if (this.state.unsavedChanges) {
      return (
        <Fragment>
          <SaveStatus />
          <ConfirmClose />
        </Fragment>
      )
    } else {
      return <SaveStatus saved="true" />
    }
  }
}

export const Error = Text.span.extend.attrs({
  className: 'error',
  color: 'error',
  f: 1,
  ml: 1
})`
  text-transform: lowercase;
  &:before { content: '— '; }
`

export const Hint = Text.span.extend.attrs({
  color: 'slate',
  f: 1,
  align: 'left'
})`&:before { content: ' — '; }`

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
  constructor(props) {
    super(props)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  componentWillMount() {
    const { type, renderMarkdown } = this.props
    const Tag = Input.withComponent(
      ['textarea', 'select'].indexOf(type) === -1 ? 'input' : type
    )

    this.setState({ Tag, isEditing: false })
  }

  onBlur(e) {
    const { renderMarkdown, onBlur } = this.props
    if (renderMarkdown) {
      this.setState({ isEditing: false })
    }
    if (onBlur) {
      return onBlur(e)
    }
  }

  onFocus() {
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
      ...props
    } = this.props

    const { Tag, isEditing } = this.state

    return (
      <Label className={type} mb={2} id={name}>
        <Flex style={{ display: 'inline' }} wrap>
          <span>{label}</span>
          {optional ? <Optional /> : null}
          {error && <Error children={error} />}
          {hint && <Hint children={hint} />}
          {renderMarkdown && <Hint children="click to edit" />}
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
        <div hidden={renderMarkdown && !isEditing ? true : false}>
          <Tag
            name={name}
            type={type}
            height={type === 'textarea' ? '10rem' : 'inherit'}
            placeholder={p}
            children={children}
            {...this.props}
            onBlur={this.onBlur}
            value={value}
            bg={bg}
          />
        </div>
      </Label>
    )
  }
}

export const Submit = Button.withComponent('input').extend.attrs({
  type: 'submit'
})``
Submit.lg = LargeButton.withComponent('input').extend.attrs({
  type: 'submit'
})``

export const FormWrapper = Flex.withComponent(Container).extend`
  flex-direction: column;
`

export const Form = Container.withComponent('form').extend.attrs({
  py: 4,
  px: 3,
  maxWidth: 42
})`
  display: grid;
  grid-gap: 1rem;
  ${props => props.theme.mediaQueries[1]} {
    grid-template-columns: repeat(1, 1fr);
    h2, .textarea { grid-column: 1 / -1; }
  }
`

export const Subheading = Heading.h2.extend.attrs({
  f: 4,
  color: 'primary'
})`
  text-transform: capitalize;
`

const HeadingBox = Box.extend.attrs({
  mr: 3
})`
  text-align: left;
  order: 1;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  ${props => props.theme.mediaQueries[1]} {
    flex-basis: 7rem;
    text-align: right;
  }
`

const FieldsBox = Box.extend.attrs({})`
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
