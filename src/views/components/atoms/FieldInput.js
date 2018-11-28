import React                          from 'react'
import { View }                       from 'react-native'
import { Input, Icon }                from 'react-native-elements'
import colors                         from '*/views/components/atoms/Colors'
const Dimensions = require('Dimensions');

const FieldInput = ({ input, secureTextEntry, label, required, placeholder, icon,
  children, disabled, autoCapitalize, style, className, multiline, meta: { touched, visited, error, warning } }) => {

  const is_multiline = multiline || false
  const inputHeight = is_multiline ? {minHeight: Dimensions.get('window').height - 450} : {}
  const icon_comp = icon ? (
    <Icon
      name={icon}
      size={24}
      color='#e7eaec'
    />
  ) : null

  return (
    <View style={[style], {marginBottom: 15}}>
      <Input
        {...input}
        placeholder={placeholder}
        label={label}
        id={input.name}
        leftIcon={
          icon_comp
        }
        multiline={is_multiline}
        secureTextEntry={secureTextEntry}
        inputContainerStyle={{ borderWidth: 1, borderRadius: 5, marginLeft: 0, borderColor: '#e7eaec'}}
        inputStyle={[{color: '#838383'}, inputHeight]}
        containerStyle={{marginLeft: 0, marginRight: 0, width: '100%'}}
        errorMessage={touched ? error : null}>
        {children}
      </Input>

    </View>
  )
}

export default FieldInput
