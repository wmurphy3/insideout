import React, { Component }               from 'react';
import { Text, Image, ScrollView }        from 'react-native';
import { Field }                          from 'redux-form'
import FieldInput                         from '*/views/components/atoms/FieldInput'
import { Button, Card, Divider }          from 'react-native-elements'
import { NavigationActions }              from 'react-navigation'
import NavigatorService                   from '*/utils/navigator'
import style                              from './style'
import { KeyboardAwareScrollView }        from 'react-native-keyboard-aware-scroll-view'

export default class Register extends Component {

  onRegister = (values) => {
    this.props.register(values)
  }

  goToLogin() {
    NavigatorService.navigate('Login')
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <KeyboardAwareScrollView style={style.mainBackground}>
        <Card
          containerStyle={style.container} >

            <Field
              name="email"
              type="text"
              placeholder="Email"
              component={FieldInput} />

            <Field
              name="name"
              placeholder="Name"
              component={FieldInput} />

            <Field
              name="description"
              multiline = {true}
              placeholder="Description"
              component={FieldInput} />

            <Field
              name="age"
              placeholder="Age"
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

          <Button
            title="Register"
            onPress={handleSubmit(this.onRegister)}
            containerViewStyle={{marginLeft: 0, marginRight: 0}}
            buttonStyle={style.button} />

          <Text style={style.link}>Already have an account? <Text onPress={() => this.goToLogin()} style={style.login_link}>Login</Text></Text>
          <Text style={style.link}>* Don't forget to add more to your profile once you register</Text>
        </Card>
      </KeyboardAwareScrollView>
    );
  }
}
