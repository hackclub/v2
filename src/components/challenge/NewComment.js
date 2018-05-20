import React, { Component } from 'react'
import { Flex, Input, IconButton } from '@hackclub/design-system'
import { withFormik } from 'formik'
import { isEmpty } from 'lodash'
import Composer, { LS_BODY_KEY } from './CommentComposer'
import styled from 'styled-components'
import yup from 'yup'
import api from 'api'

const Form = Flex.withComponent('form').extend`
  position: relative;
  z-index: 4;

  > div:first-child {
    flex: 1 1 auto;
  }

  select {
    display: none;
  }
`
const SubmitButton = styled(IconButton)`
  box-shadow: ${({ theme }) => theme.boxShadows[0]} !important;
  transition: ${({ theme }) => theme.transition} box-shadow;
  &:hover,
  &:focus {
    box-shadow: ${({ theme }) => theme.boxShadows[1]} !important;
  }
`

const statusIcon = status =>
  ({ success: 'check_circle', error: 'error' }[status] || 'send')
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
  parent,
  onUnparent,
  ...props
}) => (
  <Form align="flex-end" w={1} mt={3} onSubmit={handleSubmit}>
    <Composer
      value={values.body}
      clear={isEmpty(values.body) && touched.body}
      handleReturn={e => {
        !e.shiftKey && handleSubmit(e)
      }}
      onChange={setFieldValue}
      onBlur={handleBlur}
      parent={parent}
      onUnparent={onUnparent}
    />
    <SubmitButton
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
    let body = { body: data.body }
    if (!isEmpty(props.parent)) body.parent_id = props.parent.id
    body = JSON.stringify(body)
    api
      .post(`v1/posts/${props.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        authToken,
        body
      })
      .then(res => {
        setSubmitting(false)
        setValues({ body: '', parent_id: null })
        props.onUnparent()
        props.onSubmit(res)
        if (localStorage) localStorage.removeItem(LS_BODY_KEY)
        setStatus('success')
        setTimeout(() => setStatus(null), 1536)
      })
      .catch(e => {
        setSubmitting(false)
        setStatus('error')
        console.error(e)
      })
  },
  displayName: 'CommentForm'
})(InnerForm)
export default CommentForm
