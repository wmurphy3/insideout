import validator from 'email-validator'

export const luhn = (value) => {
  let len = value.length,
      arr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9],
      bit = 1,
      sum = 0,
      val;

  while (len) {
    val = parseInt(value.charAt(--len), 10);
    sum += (bit ^= 1) ? arr[val] : val;
  }

  return sum && sum % 10 === 0 ;
}

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

  if(!values.number) {
    errors.number = 'Required'
  } else if (!luhn(values.number)) {
    errors.number = 'Invalid number'
  }

  if(!values.cvc) {
    errors.cvc = 'Required'
  } else if (values.cvc && values.cvc.length > 4) {
    errors.cvc = 'Must be 4 characters or less'
  }

  if(!values.exp_month) {
    errors.exp_month = 'Required'
  } else if(values.exp_month && Number(values.exp_month) < 0 || Number(values.exp_month) > 12) {
    errors.exp_month = 'Must be a valid month'
  }

  if(!values.exp_year) {
    errors.exp_year = 'Required'
  } else if(values.exp_year && Number(values.exp_year) < 19) {
    errors.exp_year = 'Must be a valid year. Ex: 19'
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
