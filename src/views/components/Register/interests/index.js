import React, { Component }               from 'react'
import { reduxForm }                      from 'redux-form'
import style                              from './../style'
import { KeyboardAwareScrollView }        from 'react-native-keyboard-aware-scroll-view'
import validate                           from './validate'
import { FieldArray }                     from 'redux-form'
import FieldInput                         from '*/views/components/atoms/FieldInput'
import { Button, Icon }                   from 'react-native-elements'
import {InterestFields }                    from './InterestFields'
import { View }                           from 'react-native'

const Interests = (props) => {
  const { handleSubmit, previousPage } = props

  return (
    <KeyboardAwareScrollView style={style.container}>
      <FieldArray name="interests" component={InterestFields} />

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
})(Interests)
