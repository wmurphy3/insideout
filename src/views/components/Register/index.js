import React, { Component }               from 'react';
import { Text, Image, ScrollView, View }        from 'react-native';
import { Field }                          from 'redux-form'
import FieldInput                         from '*/views/components/atoms/FieldInput'
import FieldSelect                        from '*/views/components/atoms/FieldSelect'
import { Button, Card, Divider }          from 'react-native-elements'
import { NavigationActions }              from 'react-navigation'
import NavigatorService                   from '*/utils/navigator'
import CustomCheckBox                     from '*/views/components/atoms/CustomCheckBox'
import style                              from './style'
import { KeyboardAwareScrollView }        from 'react-native-keyboard-aware-scroll-view'
import { Genders }                        from '*/utils/custom_services'
import Swiper                             from 'react-native-swiper'

export default class Register extends Component {

  onRegister = (values) => {
    this.props.register(values)
  }

  goToLogin() {
    NavigatorService.navigate('Login')
  }

  getGenders() {
    return Genders().map(m => ({ value: m.key, label: m.label}) )
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <View style={style.mainBackground}>
        <Swiper loop={false} showsButtons={false}>
          <View>
            <Card
              containerStyle={style.container}
              image={require('*/views/assets/logo.png')}
              imageWrapperStyle={{paddingHorizontal: 20}}
              imageStyle={{'maxHeight': 100}}
              imageProps={{resizeMode: "contain"}} >
              <Field
                name="email"
                type="text"
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
            </Card>
          </View>
          <View>
            <Card
              containerStyle={style.container}
              image={require('*/views/assets/logo.png')}
              imageWrapperStyle={{paddingHorizontal: 20}}
              imageStyle={{'maxHeight': 100}}
              imageProps={{resizeMode: "contain"}} >
              <Field
                name="name"
                placeholder="Name"
                component={FieldInput} />

              <Field
                name="gender"
                placeholder="Gender"
                style={style.input}
                width={90}
                options={this.getGenders()}
                component={FieldSelect} />

              <Field
                name="age"
                placeholder="Age"
                component={FieldInput} />
            </Card>
          </View>
          <View>
            <Card
              containerStyle={style.container}
              image={require('*/views/assets/logo.png')}
              imageWrapperStyle={{paddingHorizontal: 20}}
              imageStyle={{'maxHeight': 100}}
              imageProps={{resizeMode: "contain"}} >
              <Field
                name="description"
                multiline = {true}
                placeholder="Description"
                component={FieldInput} />
            </Card>
          </View>
          <View>
            <Card
              containerStyle={style.container}
              image={require('*/views/assets/logo.png')}
              imageWrapperStyle={{paddingHorizontal: 20}}
              imageStyle={{'maxHeight': 100}}
              imageProps={{resizeMode: "contain"}} >
              <Field
                name="favorite_movie"
                placeholder="Favorite Movie"
                component={FieldInput} />

              <Field
                name="favorite_food"
                placeholder="Favorite Food"
                component={FieldInput} />

              <Field
                name="favorite_song"
                placeholder="Favorite Song"
                component={FieldInput} />

            </Card>
          </View>
          <View>
            <Card
              containerStyle={style.container}
              image={require('*/views/assets/logo.png')}
              imageWrapperStyle={{paddingHorizontal: 20}}
              imageStyle={{'maxHeight': 100}}
              imageProps={{resizeMode: "contain"}} >
              <Field
                name="job_title"
                placeholder="Job Title"
                component={FieldInput} />

              <Field
                name="hobbies"
                placeholder="Hobbies"
                component={FieldInput} />

              <Field
                name="school"
                placeholder="School"
                component={FieldInput} />
            </Card>
          </View>
          <View>
            <Card
              containerStyle={style.container}
              image={require('*/views/assets/logo.png')}
              imageWrapperStyle={{paddingHorizontal: 20}}
              imageStyle={{'maxHeight': 100}}
              imageProps={{resizeMode: "contain"}} >
              <Field
                name="social_media_link"
                placeholder="Social Media Name"
                component={FieldInput} />

              <Field
                name="snap_chat_name"
                placeholder="Snap Chat Name"
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
                title="Register"
                onPress={handleSubmit(this.onRegister)}
                containerViewStyle={{marginLeft: 0, marginRight: 0}}
                buttonStyle={style.button} />
            </Card>
          </View>
        </Swiper>
      </View>
    )
  }
}
