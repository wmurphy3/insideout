import React                          from 'react'
import { View, KeyboardAvoidingView } from 'react-native'
import { FormLabel, FormInput,
         FormValidationMessage}       from 'react-native-elements'
import colors                         from '*/views/components/atoms/Colors'
const Dimensions = require('Dimensions');

const FieldInput = ({ input, secureTextEntry, label, required, placeholder,
  children, disabled, autoCapitalize, style, className, multiline, meta: { touched, visited, error, warning } }) => {

  const is_multiline = multiline || false
  const width = Dimensions.get('window').width;

  return (
    <View style={[style], {marginBottom: 15}}>
      {label &&
        <FormLabel
          labelStyle={{marginLeft: 0, marginRight: 0}}>
          {required && <abbr title="required">*</abbr> }
          {label}
        </FormLabel>
      }
      <FormInput
        {...input}
        type="text"
        id={input.name}
        multiline={is_multiline}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        inputStyle={{width: (Dimensions.width - 60)}}
        containerStyle={{marginLeft: 0, marginRight: 0}}>
          {children}
      </FormInput>
      {touched &&
        ((error && <FormValidationMessage labelStyle={{marginLeft: 0}}>{error}</FormValidationMessage>))}
    </View>
  )
}

export default FieldInput
