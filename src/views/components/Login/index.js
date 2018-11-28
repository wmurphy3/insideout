import React, { Component }               from 'react';
import { AppRegistry, Text, Image, View } from 'react-native';
import { Field }                          from 'redux-form'
import FieldInput                         from '*/views/components/atoms/FieldInput'
import CustomCheckBox                     from '*/views/components/atoms/CustomCheckBox'
import { Button, Card, Divider, Icon }    from 'react-native-elements'
import { NavigationActions }              from 'react-navigation'
import NavigatorService                   from '*/utils/navigator'
import style                              from './style'
import { displayError }                   from '*/utils/toastr'
import colors                             from '*/views/components/atoms/Colors'
import { KeyboardAwareScrollView }        from 'react-native-keyboard-aware-scroll-view'
import Spinner                            from '*/views/components/atoms/Spinner'

export default class LoginScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: null,
      show: false,
      authorized: true
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

  render() {
    const { handleSubmit, user } = this.props

    if (user.loading)
      return (<Spinner />)

    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center', flex: 1}}
        style={style.mainBackground}>
        <View style={style.container}>
          <Image
            style={{'width': '100%', paddingHorizontal: 20}}
            source={require('*/views/assets/logo.png')}
            resizeMode="contain" />

          <Field
            name="username"
            type="text"
            icon='email'
            autoCapitalize={'none'}
            placeholder="Email"
            component={FieldInput} />

          <Text onPress={() => this.gotToForgotPassword()} style={style.forgot_password_link}>Forgot Password?</Text>

          <Field
            name="password"
            icon='lock'
            secureTextEntry={true}
            placeholder="Password"
            component={FieldInput} />

          <Button
            title="LOGIN"
            onPress={handleSubmit(this.onLogin)}
            fontSize={16}
            borderRadius={5}
            containerViewStyle={{marginLeft: 0, marginRight: 0}}
            buttonStyle={style.button} />

          <Text style={style.link}>
            Don't have an account? <Text onPress={() => this.goToRegister()} style={style.register_link}>Register</Text></Text>
            <Divider style={style.divider} />
            <Text onPress={() => this.goToContactUs()} style={style.contact_link}>Terms of Service
          </Text>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
