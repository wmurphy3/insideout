import React, { Component }               from 'react'
import { reduxForm }                      from 'redux-form'
import style                              from './../style'
import { KeyboardAwareScrollView }        from 'react-native-keyboard-aware-scroll-view'
import validate                           from './validate'
import { Field }                          from 'redux-form'
import { Button }                         from 'react-native-elements'
import { View }                           from 'react-native'
import CustomCheckBox                     from '*/views/components/atoms/CustomCheckBox'

const Into = (props) => {
  const { handleSubmit, previousPage } = props

  return (
    <KeyboardAwareScrollView style={style.container}>
      <Field
        name="allow_male"
        label="Into Males"
        style={{marginTop: 10}}
        component={CustomCheckBox} />

      <Field
        name="allow_female"
        label="Into Females"
        component={CustomCheckBox} />

      <Field
        name="allow_other"
        label="Into Other"
        component={CustomCheckBox} />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          title="PREV"
          fontSize={16}
          borderRadius={5}
          onPress={previousPage}
          containerStyle={{marginTop: 20, marginRight: 0, marginLeft: 0, alignItems: 'flex-start'}}
          buttonStyle={style.button} />

        <Button
          title="NEXT"
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
})(Into)
