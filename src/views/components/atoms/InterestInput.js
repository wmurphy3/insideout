import React                          from 'react'
import { View, KeyboardAvoidingView } from 'react-native'
import { FormLabel, FormInput,
         FormValidationMessage}       from 'react-native-elements'
import colors                         from '*/views/components/atoms/Colors'
const Dimensions = require('Dimensions');

const InterestInput = ({ input, secureTextEntry, label, required, placeholder,
  children, disabled, autoCapitalize, style, className, multiline, meta: { touched, visited, error, warning } }) => {

  const is_multiline = multiline || false
  const width = Dimensions.get('window').width;

  return (
    <View style={style}>
      <FormInput
        {...input}
        type="text"
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

export default InterestInput
