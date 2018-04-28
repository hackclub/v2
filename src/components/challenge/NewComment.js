import React, { Component } from 'react'
import { Flex, Input, IconButton } from '@hackclub/design-system'
import { withFormik } from 'formik'
import { isEmpty } from 'lodash'
import Composer, { LS_BODY_KEY } from './CommentComposer'
import yup from 'yup'
import api from 'api'

const Form = Flex.withComponent('form').extend`
  > div:first-child {
    flex: 1 1 auto;
  }

  .public-DraftEditorPlaceholder-inner {
    color: ${props => props.theme.colors.muted};
    font-size: ${props => props.theme.fontSizes[1]}px;
  }

  .DraftEditor-root {
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
`

const statusIcon = status => (status === 'error' ? 'error' : 'send')
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
  <Form
    align={isEmpty(values.body) ? 'flex-end' : 'flex-start'}
    w={1}
    mt={3}
    onSubmit={handleSubmit}
  >
    <Composer onChange={setFieldValue} onBlur={handleBlur} />
    <IconButton
      type="submit"
      onClick={handleSubmit}
      disabled={isSubmitting || isEmpty(values.body) || isEmpty(props.email)}
      name={statusIcon(status)}
      bg={statusColor(status)}
      color="white"
      size={20}
      style={{ borderRadius: 9999 /* next DS release */ }}
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
    console.log(body)
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
      })
      .catch(e => {
        setSubmitting(false)
        setStatus('error')
      })
  },
  displayName: 'CommentForm'
})(InnerForm)
export default CommentForm
