import React, { Component }               from 'react'
import { reduxForm }                      from 'redux-form'
import style                              from './../style'
import { KeyboardAwareScrollView }        from 'react-native-keyboard-aware-scroll-view'
import validate                           from './validate'
import { Field }                          from 'redux-form'
import FieldInput                         from '*/views/components/atoms/FieldInput'
import { Genders }                        from '*/utils/custom_services'
import FieldSelect                        from '*/views/components/atoms/FieldSelect'
import { Button }                         from 'react-native-elements'

const getGenders = () => {
  return Genders().map(m => ({ value: m.key, label: m.label}) )
}

const General = (props) => {
  const { handleSubmit } = props

  return (
    <KeyboardAwareScrollView style={style.container}>
      <Field
        name="name"
        placeholder="Name"
        component={FieldInput} />

      <Field
        name="email"
        placeholder="Email"
        component={FieldInput} />

      <Field
        name="password"
        secureTextEntry={true}
        placeholder="Password"
        component={FieldInput} />

      <Field
        name="password_confirmation"
        secureTextEntry={true}
        placeholder="Re-enter Password"
        component={FieldInput} />

      <Field
        name="gender"
        placeholder="Gender"
        style={style.input}
        options={getGenders()}
        component={FieldSelect} />

      <Field
        name="age"
        placeholder="Age"
        component={FieldInput} />

      <Button
        title="NEXT"
        fontSize={16}
        borderRadius={5}
        onPress={handleSubmit}
        containerViewStyle={{marginTop: 20, marginRight: 0, alignItems: 'flex-end'}}
        buttonStyle={style.button} />
    </KeyboardAwareScrollView>
  )
}

export default reduxForm({
  form: 'register',              // <------ same form name
  destroyOnUnmount: false,     // <------ preserve form data
  validate
})(General)
