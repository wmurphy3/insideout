import React, { Component }               from 'react';
import { Text, Image, ScrollView, View }  from 'react-native';
import { Field, FieldArray }              from 'redux-form'
import FieldInput                         from '*/views/components/atoms/FieldInput'
import InterestInput                      from '*/views/components/atoms/InterestInput'
import FieldSelect                        from '*/views/components/atoms/FieldSelect'
import { Button, Card, Divider }          from 'react-native-elements'
import { NavigationActions }              from 'react-navigation'
import NavigatorService                   from '*/utils/navigator'
import CustomCheckBox                     from '*/views/components/atoms/CustomCheckBox'
import style                              from './style'
import { KeyboardAwareScrollView }        from 'react-native-keyboard-aware-scroll-view'
import { Genders }                        from '*/utils/custom_services'
import { List, ListItem, FormInput, Icon }      from 'react-native-elements'

import {PagerDotIndicator, IndicatorViewPager} from 'rn-viewpager'
import StepIndicator from 'react-native-step-indicator'

const firstIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize:40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: '#F05757',
  separatorFinishedColor: '#F05757',
  separatorUnFinishedColor: '#F05757',
  stepIndicatorFinishedColor: '#F05757',
  stepIndicatorUnFinishedColor: '#F05757',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 12,
  currentStepLabelColor: '#F05757'
}

const renderInterests = ({ fields, meta: { error } }) => (
  <View style={{flex: 1, borderTopWidth: 0}}>
    <ScrollView style={{flex: 1, borderTopWidth: 0}}>
      <List containerStyle={{borderTopWidth: 0, borderBottomWidth: 0, borderColor: '#fff'}}>
        {
          fields.map((item, i) => (
            <ListItem
              key={i}
              hideChevron={true}
              containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}
              title={
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '80%'}}>
                    <Field
                      name={item}
                      placeholder={`Interest #${i + 1}`}
                      component={InterestInput} />
                  </View>
                  <View style={{width: '20%'}}>
                    {(fields.length - 1) === i ?
                      <Icon
                        raised
                        name='plus'
                        type='font-awesome'
                        color='green'
                        onPress={() => fields.push()} />
                      :
                      <Icon
                        raised
                        name='remove'
                        type='font-awesome'
                        color='#F05757'
                        onPress={() => fields.remove(i)} />
                    }
                  </View>
                </View>
              }
            />
          ))
        }
      </List>
    </ScrollView>
  </View>
)

export default class Register extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentPage: 0
    }
  }

  onRegister = (values) => {
    this.props.register(values)
  }

  goToLogin() {
    NavigatorService.navigate('Login')
  }

  getGenders() {
    return Genders().map(m => ({ value: m.key, label: m.label}) )
  }

  updatePage (myPage) {
    this.viewPager.setPage(myPage);
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <View style={style.mainBackground}>
        <View style={{paddingHorizontal: 20, alignSelf: 'center', marginTop: 50}}>
          <Image
            style={{maxHeight: 100, alignSelf: 'center'}}
            source={require('*/views/assets/logo.png')}
            resizeMode="contain" />
        </View>
        <View style={{marginVertical:10}}>
          <StepIndicator
            customStyles={firstIndicatorStyles}
            stepCount={5}
            onPress={(p) => this.updatePage(p)}
            currentPosition={this.state.currentPage} />
        </View>
        <IndicatorViewPager
          style={style.mainBackground}
          setPage={this.state.currentPage}
          ref={viewPager => { this.viewPager = viewPager; }}
          onPageSelected={(page) => {this.setState({currentPage:page.position})}} >
          <View>
            <KeyboardAwareScrollView style={style.container}>
              <Field
                name="name"
                placeholder="Name"
                component={FieldInput} />
              <Field
                name="email"
                placeholder="Email"
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

              <Field
                name="gender"
                placeholder="Gender"
                style={style.input}
                options={this.getGenders()}
                component={FieldSelect} />

              <Field
                name="age"
                placeholder="Age"
                component={FieldInput} />
            </KeyboardAwareScrollView>
          </View>
          <View>
            <KeyboardAwareScrollView style={style.container}>
              <Field
                name="description"
                multiline = {true}
                placeholder="Description"
                component={FieldInput} />
            </KeyboardAwareScrollView>
          </View>
          <View style={style.container}>
            <FieldArray name="interests" component={renderInterests} />
          </View>
          <View>
            <KeyboardAwareScrollView style={style.container}>
              <Field
                name="job_title"
                placeholder="Job Title"
                component={FieldInput} />

              <Field
                name="school"
                placeholder="School"
                component={FieldInput} />
            </KeyboardAwareScrollView>
          </View>
          <View style={style.container}>
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
              title="REGISTER"
              fontSize={16}
              borderRadius={5}
              onPress={handleSubmit(this.onRegister)}
              containerViewStyle={{marginLeft: 0, marginRight: 0}}
              buttonStyle={style.button} />
          </View>
        </IndicatorViewPager>
      </View>
    )
  }
}
