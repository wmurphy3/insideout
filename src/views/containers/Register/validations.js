import validator from 'email-validator'

export const validate = (values) => {

  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!validator.validate(values.email)) {
    errors.email = 'Must be a valid email'
  }

  if(!values.password) {
    errors.password = 'Required'
  }

  if(!values.password_confirmation) {
    errors.password_confirmation = 'Required'
  } else if(values.password_confirmation !== values.password) {
    errors.password_confirmation = 'Doesn\'t match password'
  }

  if(!values.age) {
    errors.age = 'Required'
  }

  if(!values.gender) {
    errors.gender = 'Required'
  }

  if(!values.name) {
    errors.name = 'Required'
  }

  if(!values.description) {
    errors.description = 'Required'
  }

  return errors
}
