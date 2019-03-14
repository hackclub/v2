import React, { Fragment } from 'react'
import { Field, Button } from '@hackclub/design-system'
import { Formik } from 'formik'
import GithubSlugger from 'github-slugger'

import storage from 'storage'
import { Modal, Overlay } from 'components/Modal'
import { Subhline } from 'components/Content'

export default ({ active, toggleModal, name, description }) =>
  active ? (
    <Fragment>
      <Modal align="left" my={4} p={[3, 4]}>
        <Subhline fontSize={[3, 4]}>Workshop info</Subhline>
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
            const slugger = new GithubSlugger()
            const slug = 'draft-' + slugger.slug(values.name)
            const oldSlug = 'draft-' + slugger.slug(name)
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
              <Field
                type="input"
                name="name"
                label="Workshop name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={errors.name && touched.name && errors.name}
              />
              <Field
                type="input"
                name="description"
                label="Description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                error={
                  errors.description &&
                  touched.description &&
                  errors.description
                }
              />
              <Button mt={1} bg="info" onClick={handleSubmit}>
                Save
              </Button>
            </form>
          )}
        </Formik>
      </Modal>
      <Overlay onClick={toggleModal} />
    </Fragment>
  ) : null
