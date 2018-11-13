import React, { Component }               from 'react';
import { AppRegistry, Text, Image, View,
         KeyboardAvoidingView }           from 'react-native';
import { Field }                          from 'redux-form'
import FieldInput                         from '*/views/components/atoms/FieldInput'
import CustomCheckBox                     from '*/views/components/atoms/CustomCheckBox'
import { Button, Card, Divider, Icon }    from 'react-native-elements'
import { NavigationActions }              from 'react-navigation'
import NavigatorService                   from '*/utils/navigator'
import style                              from './style'
import { SecureStore, Fingerprint }       from 'expo'
import FingerprintWaitingNotification     from '*/views/components/atoms/FingerprintWaitingNotification'
import { displayError }                   from '*/utils/toastr'
import colors                             from '*/views/components/atoms/Colors'

export default class LoginScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: null,
      show: false,
      authorized: true,
      turn_touch_id_on: false
    }
  }

  onLogin = (values) => {
    this.props.onLogin(values)
  }

  gotToForgotPassword() {
    NavigatorService.navigate('ForgotPassword')
  }

  goToRegister() {
    NavigatorService.navigate('Register')
  }

  goToContactUs() {
    NavigatorService.navigate('TermsOfService')
  }

  touchView() {
    const { handleSubmit, user } = this.props
      return (
        <Button
          title="LOGIN"
          onPress={handleSubmit(this.onLogin)}
          fontSize={16}
          borderRadius={5}
          containerViewStyle={{marginLeft: 0, marginRight: 0}}
          buttonStyle={style.button} />
      )
  }

  render() {
    const { handleSubmit, user } = this.props

    return (
      <View style={style.mainBackground}>
        <Card
          containerStyle={style.container}
          image={require('*/views/assets/logo.png')}
          imageWrapperStyle={{paddingHorizontal: 20}}
          imageStyle={{'maxHeight': 100}}
          imageProps={{resizeMode: "contain"}} >

          <KeyboardAvoidingView
            behavior='position'
            keyboardVerticalOffset={-30}
          >
            <Field
              name="username"
              type="text"
              autoCapitalize={'none'}
              placeholder="Email"
              component={FieldInput} />

            <Field
              name="password"
              secureTextEntry={true}
              placeholder="Password"
              component={FieldInput} />

            <Text onPress={() => this.gotToForgotPassword()} style={style.forgot_password_link}>Forgot Password?</Text>

          </KeyboardAvoidingView>

          { this.touchView() }

          <Text style={style.link}>
            Don't have an account? <Text onPress={() => this.goToRegister()} style={style.register_link}>Register</Text></Text>
            <Divider style={style.divider} />
            <Text onPress={() => this.goToContactUs()} style={style.contact_link}>Terms of Service
          </Text>
        </Card>
      </View>
    );
  }
}
