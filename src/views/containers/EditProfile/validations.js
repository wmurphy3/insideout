import validator from 'email-validator'
export const validate = (values) => {

  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!validator.validate(values.email)) {
    errors.email = 'Must be a valid email'
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

  if(!values.allow_male && !values.allow_female && !values.allow_other) {
    errors.allow_male = 'Must choose at least one'
  }

  if(!values.school && !values.job_title) {
    errors.school = 'Must enter at least one'
    errors.job_title = 'Must enter at least one'
  }

  return errors
}
