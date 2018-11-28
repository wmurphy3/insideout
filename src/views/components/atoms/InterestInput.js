import React                          from 'react'
import { View, KeyboardAvoidingView } from 'react-native'
import { Input, Icon }                from 'react-native-elements'
import colors                         from '*/views/components/atoms/Colors'
const Dimensions = require('Dimensions');

const InterestInput = ({ input, secureTextEntry, label, required, placeholder, icon,
  children, disabled, autoCapitalize, style, className, multiline, meta: { touched, visited, error, warning } , buttonPressed}) => {

  const width = Dimensions.get('window').width;

  const is_multiline = multiline || false
  const color = icon === 'plus' ? 'green' : '#F05757'
  const icon_comp = icon ? (
    <Icon
      name={icon}
      size={20}
      type='font-awesome'
      color={color}
      containerStyle={{paddingRight: 10}}
      onPress={buttonPressed}
    />
  ) : null

  return (
    <View style={[style], {marginBottom: 15}}>
      <Input
        {...input}
        placeholder={placeholder}
        label={label}
        id={input.name}
        multiline={is_multiline}
        secureTextEntry={secureTextEntry}
        inputContainerStyle={{ borderWidth: 1, borderRadius: 5, marginLeft: 0, borderColor: '#e7eaec', width: '100%'}}
        inputStyle={{color: '#838383'}}
        rightIcon={
          icon_comp
        }
        containerStyle={{marginLeft: 0, marginRight: 0, width: '100%'}}
        errorMessage={touched ? error : null}>
        {children}
      </Input>

    </View>
  )
}

export default InterestInput
