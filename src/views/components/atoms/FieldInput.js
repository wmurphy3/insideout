import React                          from 'react'
import { View, KeyboardAvoidingView } from 'react-native'
import { FormLabel, FormInput,
         FormValidationMessage}       from 'react-native-elements'
import colors                         from '*/views/components/atoms/Colors'

const FieldInput = ({ input, secureTextEntry, label, required, placeholder,
  children, disabled, autoCapitalize, style, className, multiline, meta: { touched, visited, error, warning } }) => {

  const capatalize = autoCapitalize || 'words'
  const is_multiline = multiline || false

  return (
    <View style={style}>
      <FormLabel
        labelStyle={{marginLeft: 0, marginRight: 0}}>
        {required && <abbr title="required">*</abbr> }
        {label}
      </FormLabel>
      <FormInput
        {...input}
        type="text"
        autoCapitalize={capatalize}
        id={input.name}
        multiline={is_multiline}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        containerStyle={{marginLeft: 0, marginRight: 0}}>
          {children}
      </FormInput>
      {touched &&
        ((error && <FormValidationMessage>{error}</FormValidationMessage>))}
    </View>
  )
}

export default FieldInput
