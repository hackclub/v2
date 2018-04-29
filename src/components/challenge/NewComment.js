import React, { Component } from 'react'
import { Flex, Input, IconButton } from '@hackclub/design-system'
import { withFormik } from 'formik'
import { isEmpty } from 'lodash'
import Composer, { LS_BODY_KEY } from './CommentComposer'
import yup from 'yup'
import api from 'api'

const Form = Flex.withComponent('form').extend`
  min-height: 3rem;
  position: relative;
  z-index: 4;

  > div:first-child {
    flex: 1 1 auto;
  }

  // remove with next DS
  > button:last-child {
    border-radius: ${props => props.theme.pill};
  }

  .public-DraftEditorPlaceholder-inner {
    position: absolute;
    top: -${props => props.theme.space[2] * 1.5}px;
    padding-left: ${props => props.theme.space[3]}px;
    color: ${props => props.theme.colors.muted};
    font-size: ${props => props.theme.fontSizes[1]}px;
  }

  .DraftEditor-editorContainer > div {
    background-color: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.smoke};
    border-radius: 18px;
    padding: ${props => props.theme.space[2]}px ${props =>
  props.theme.space[3]}px;
    font-size: ${props => props.theme.fontSizes[1]}px !important;
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

  select {
    display: none;
  }
`

const statusIcon = status =>
  ({ success: 'check', error: 'error' }[status] || 'send')
const statusColor = status => (status === 'error' ? 'error' : 'info')
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
  <Form align="flex-end" w={1} mt={3} onSubmit={handleSubmit}>
    <Composer
      value={values.body}
      clear={isEmpty(values.body) && touched.body}
      onChange={setFieldValue}
      onBlur={handleBlur}
    />
    <IconButton
      type="submit"
      aria-label="Post your comment"
      onClick={handleSubmit}
      disabled={isEmpty(props.email)}
      name={statusIcon(status)}
      bg={statusColor(status)}
      color="white"
      size={20}
      ml={3}
    />
  </Form>
)
const CommentForm = withFormik({
  validationSchema: yup.object().shape({
    body: yup.string()
  }),
  enableReinitialize: true,
  handleSubmit: (data, { props, setStatus, setSubmitting, setValues }) => {
    const authToken = localStorage ? localStorage.getItem('authToken') : null
    const body = JSON.stringify({ body: data.body })
    api
      .post(`v1/posts/${props.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        authToken,
        body
      })
      .then(res => {
        setSubmitting(false)
        setValues({ body: '' })
        props.onSubmit(res)
        if (localStorage) localStorage.removeItem(LS_BODY_KEY)
        setStatus('success')
        setTimeout(() => setStatus(null), 1536)
      })
      .catch(e => {
        setSubmitting(false)
        setStatus('error')
      })
  },
  displayName: 'CommentForm'
})(InnerForm)
export default CommentForm
