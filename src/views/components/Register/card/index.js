import React, { Component }               from 'react'
import { reduxForm }                      from 'redux-form'
import style                              from './../style'
import { KeyboardAwareScrollView }        from 'react-native-keyboard-aware-scroll-view'
import validate                           from './validate'
import { Field }                          from 'redux-form'
import FieldInput                         from '*/views/components/atoms/FieldInput'
import CreditCardInput                    from '*/views/components/atoms/CreditCardInput'
import { Button }                         from 'react-native-elements'
import { View, Text }                     from 'react-native'

const Card = (props) => {
  const { handleSubmit, previousPage } = props

  return (
    <KeyboardAwareScrollView style={style.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{width: '70%'}}>
          <Field
            name="number"
            component={CreditCardInput} />
        </View>
        <View style={{width: '20%'}}>
          <Field
            name="cvc"
            placeholder="CVC"
            component={FieldInput} />
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{width: '45%'}}>
          <Field
            name="exp_month"
            placeholder="Exp Month(01)"
            component={FieldInput} />
        </View>
        <View style={{width: '45%'}}>
          <Field
            name="exp_year"
            placeholder="Exp Year(19)"
            component={FieldInput} />
        </View>
      </View>

      <Text style={style.contact_link}>
        You are being charged a one-time $10.00 fee. This helps keep out bots and maintians the application
        for fututre versions. By clicking register, you are authorizing a one-time $10.00 payment and understanding
        that there are NO refunds.
      </Text>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          title="PREV"
          fontSize={16}
          borderRadius={5}
          onPress={previousPage}
          containerStyle={{marginTop: 20, marginRight: 0, marginLeft: 0, alignItems: 'flex-start'}}
          buttonStyle={style.button} />

        <Button
          title="REGISTER"
          fontSize={16}
          borderRadius={5}
          onPress={handleSubmit}
          containerStyle={{marginTop: 20, marginRight: 0, alignItems: 'flex-end'}}
          buttonStyle={style.button} />
      </View>
    </KeyboardAwareScrollView>
  )
}

export default reduxForm({
  form: 'register',              // <------ same form name
  destroyOnUnmount: false,     // <------ preserve form data
  validate
})(Card)
