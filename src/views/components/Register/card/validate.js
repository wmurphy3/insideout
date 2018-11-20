export const validate = (values) => {

  const errors = {}

  if(!values.description) {
    errors.description = 'Required'
  }

  return errors
}
