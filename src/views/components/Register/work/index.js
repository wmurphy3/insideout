import React, { Component }               from 'react'
import { reduxForm }                      from 'redux-form'
import style                              from './../style'
import { KeyboardAwareScrollView }        from 'react-native-keyboard-aware-scroll-view'
import validate                           from './validate'
import { Field }                          from 'redux-form'
import { Button }                         from 'react-native-elements'
import { View }                           from 'react-native'
import CustomCheckBox                     from '*/views/components/atoms/CustomCheckBox'
import FieldInput                         from '*/views/components/atoms/FieldInput'

const Work = (props) => {
  const { handleSubmit, previousPage } = props

  return (
    <KeyboardAwareScrollView style={style.container}>
      <Field
        name="job_title"
        placeholder="Job Title"
        component={FieldInput} />

      <Field
        name="school"
        placeholder="School"
        component={FieldInput} />

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
})(Work)
