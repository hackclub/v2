import validator from 'validator'

export const required = a => {
  if (!a.toString().trim().length) {
    return 'This field is required'
  }
}
