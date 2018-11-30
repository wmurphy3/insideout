import React, { Component }               from 'react'
import { Text, View }                     from 'react-native';
import { Button, Avatar }                 from 'react-native-elements'
import { Field }                          from 'redux-form'
import FieldInput                         from '*/views/components/atoms/FieldInput'
import FieldSelect                        from '*/views/components/atoms/FieldSelect'
import CustomCheckBox                     from '*/views/components/atoms/CustomCheckBox'
import { FieldArray }                     from 'redux-form'
import {InterestFields }                  from '*/views/components/Register/interests/InterestFields'
import style                              from './style'
import NavigatorService                   from '*/utils/navigator'
import { KeyboardAwareScrollView }        from 'react-native-keyboard-aware-scroll-view'
import { Genders }                        from '*/utils/custom_services'

const getGenders = () => {
  return Genders().map(m => ({ value: m.key, label: m.label}) )
}

export default class EditProfile extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: 'Edit Profile'
    };
  };

  constructor(props) {
    super(props)

    this.state = {
      imgUri: null
    }
  }

  update = (values) => {
    this.props.updateUser(values, this.props.user.id)
  }

  render() {
    const { handleSubmit } = this.props

    return(
      <KeyboardAwareScrollView style={style.mainBackground}>

        <Field
          name="name"
          placeholder="Name"
          label="Name"
          component={FieldInput} />

        <Field
          name="email"
          placeholder="Email"
          label="Email"
          component={FieldInput} />

        <Text style={style.label}>Gender</Text>
        <Field
          name="gender"
          placeholder="Gender"
          label="Gender"
          style={style.input}
          options={getGenders()}
          component={FieldSelect} />

        <Field
          name="age"
          placeholder="Age"
          label="Age"
          component={FieldInput} />

        <Field
          name="description"
          multiline = {true}
          numberOfLines={20}
          placeholder="Description"
          label="Description"
          component={FieldInput} />

        <Text style={style.label}>Interests</Text>
        <FieldArray name="interests" component={InterestFields} />

        <Field
          name="job_title"
          label="Job Title"
          placeholder="Job Title"
          component={FieldInput} />

        <Field
          name="school"
          placeholder="School"
          label="School"
          component={FieldInput} />

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


        <Button
          title="UPDATE"
          onPress={handleSubmit(this.update)}
          fontSize={16}
          borderRadius={5}
          containerViewStyle={{marginLeft: 0, marginRight: 0}}
          buttonStyle={style.button} />

      </KeyboardAwareScrollView>
    )
  }
}
