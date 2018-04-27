import React, { Component } from 'react'
import { Flex, Input } from '@hackclub/design-system'
import { Submit } from 'components/Forms'
import { withFormik } from 'formik'
import { isEmpty } from 'lodash'
import Composer, { LS_BODY_KEY } from './CommentComposer'
import yup from 'yup'
import api from 'api'

const Form = Flex.withComponent('form').extend`
  align-items: flex-end;

  > div:first-child {
    flex: 1 1 auto;
  }

  .DraftEditor-editorContainer > div {
    background-color: ${props => props.theme.colors.blue[0]};
    border-radius: ${props => props.theme.radii[2]};
    padding: ${props => props.theme.space[2]}px ${props =>
  props.theme.space[3]}px;
    min-height: 2rem;
  }

  .public-DraftEditorPlaceholder-inner {
    color: ${props => props.theme.colors.muted};
    font-size: ${props => props.theme.fontSizes[2]}px;
  }
`

const statusMessage = status =>
  status ? { success: 'Posted!', error: 'Error' }[status] : 'Post'
const statusColor = status =>
  status === 'success' || status === 'error' ? status.toString() : 'info'
const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  status,
  ...props
}) => (
  <Form w={1} mt={3} onSubmit={handleSubmit}>
    <Composer onChange={setFieldValue} onBlur={handleBlur} />
    <Submit
      onClick={handleSubmit}
      disabled={isSubmitting || isEmpty(props.email)}
      value={statusMessage(status)}
      bg={statusColor(status)}
      ml={3}
    />
  </Form>
)
const CommentForm = withFormik({
  validationSchema: yup.object().shape({
    body: yup.string()
  }),
  enableReinitialize: true,
  handleSubmit: (data, { props, setStatus, setSubmitting, resetForm }) => {
    const body = JSON.stringify({ body: data.body })
    console.log(body)
    api
      .post(`v1/posts/${props.id}/comments`, { method: 'POST', body })
      .then(res => {
        resetForm()
        if (localStorage) {
          localStorage.removeItem(LS_BODY_KEY)
        }
        setStatus('success')
      })
      .catch(e => {
        setSubmitting(false)
        setStatus('error')
      })
  },
  displayName: 'CommentForm'
})(InnerForm)
export default CommentForm
