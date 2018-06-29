import React, { Component }               from 'react';
import { AppRegistry, Text, Image, View } from 'react-native';
import { Field }                          from 'redux-form'
import FieldInput                         from '*/views/components/atoms/FieldInput'
import { Button, Card }                   from 'react-native-elements'
import NavigatorService                   from '*/utils/navigator'
import style                              from './style'

export default class TermsOfService extends Component {

  gotToLogin() {
    NavigatorService.navigate('Login')
  }

  render() {

    return (
      <View style={style.mainBackground}>
        <Card
          containerStyle={style.container}
          image={require('*/views/assets/logo.png')}
          imageWrapperStyle={{paddingHorizontal: 20}}
          imageStyle={{'maxHeight': 100}}
          imageProps={{resizeMode: "contain"}} >

          <Text></Text>

        </Card>
      </View>
    );
  }
}
