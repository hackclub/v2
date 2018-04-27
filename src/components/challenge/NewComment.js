import React, { Component } from 'react'
import { Flex, Input, IconButton } from '@hackclub/design-system'
import { withFormik } from 'formik'
import { isEmpty } from 'lodash'
import Composer, { LS_BODY_KEY } from './CommentComposer'
import yup from 'yup'
import api from 'api'

const Form = Flex.withComponent('form').extend`
  align-items: flex-start;

  > div:first-child {
    flex: 1 1 auto;
  }

  .public-DraftEditorPlaceholder-inner {
    color: ${props => props.theme.colors.muted};
    font-size: ${props => props.theme.fontSizes[2]}px;
  }

  .DraftEditor-editorContainer > div {
    border: 1px solid ${props => props.theme.colors.smoke};
    border-radius: 16px;
    padding: ${props => props.theme.space[2]}px ${props =>
  props.theme.space[3]}px;
    font-size: 14px !important;
    line-height: 1.375 !important;

    a {
      text-decoration: underline;
    }

    p,
    li {
      margin-top: ${props => props.theme.space[1]}px !important;
      margin-bottom: ${props => props.theme.space[1]}px !important;
    }
  }
`

const statusIcon = status =>
  status ? { success: 'check', error: 'error' }[status] : 'send'
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
    <IconButton
      type="submit"
      onClick={handleSubmit}
      disabled={isSubmitting || isEmpty(props.email)}
      name={statusIcon(status)}
      bg={statusColor(status)}
      color="white"
      style={{ borderRadius: 9999 }}
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
