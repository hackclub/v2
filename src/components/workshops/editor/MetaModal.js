import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Field, Button, theme } from '@hackclub/design-system'
import { Formik } from 'formik'

import storage from 'storage'
import { Modal, Overlay } from 'components/Modal'

const NiceField = styled(Field).attrs({
  bg: 'snow'
})`
  border: 2px solid ${theme.colors.smoke};

  &:hover {
    border: 2px solid ${theme.colors.slate};
  }

  &:focus {
    outline: 0;
    box-shadow: none;
    border: 2px solid ${theme.colors.info};
  }
`

export default ({ active, toggleModal, name, description }) =>
  active ? (
    <Fragment>
      <Modal align="left" my={4} p={[3, 4]}>
        <Formik
          initialValues={{ name, description }}
          validate={values => {
            let errors = {}
            if (!values.name) {
              errors.name = 'Required'
            }
            if (!values.description) {
              errors.description = 'Required'
            }
            return errors
          }}
          onSubmit={values => {
            const slug = 'draft-' + values.name.replace(/ /g, '-')
            const oldSlug = 'draft-' + name.replace(/ /g, '-')
            const { body, edited } = storage.get(oldSlug)

            storage.set(slug, {
              body,
              edited,
              description: values.description
            })
            window.location.reload()
            if (slug !== oldSlug) {
              storage.remove(oldSlug)
              window.location = `/workshops/submit?id=${slug}`
            }
            toggleModal()
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <NiceField
                type="input"
                name="name"
                label="Workshop name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={errors.name && touched.name && errors.name}
              />

              <NiceField
                type="input"
                name="description"
                label="Workshop description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                error={
                  errors.description &&
                  touched.description &&
                  errors.description
                }
              />

              <Button mt={3} bg="success" onClick={handleSubmit}>
                Save
              </Button>
            </form>
          )}
        </Formik>
      </Modal>
      <Overlay onClick={toggleModal} />
    </Fragment>
  ) : null
