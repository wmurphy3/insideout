import React, { Component }               from 'react'
import { Text, View, Switch, AlertIOS,
         ScrollView }                     from 'react-native';
import { Button, List, ListItem, Icon }   from 'react-native-elements'
import style                              from './style'
import Spinner                            from '*/views/components/atoms/Spinner'
import NavigatorService                   from '*/utils/navigator'

export default class UserInformation extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: 'My Profile',
      headerRight:
        <Icon
          name={'edit'}
          containerStyle={{marginRight: 10}}
          color="#fff"
          onPress={ () => params.goToEdit() }  />
    };
  };

  constructor(props) {
    super(props)

    this.state = {
      toggle: false,
      show: false
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({
      goToEdit: this.goToEdit
    })
  }

  goToEdit = () => {
    NavigatorService.navigate("EditProfileStack")
  }

  render() {
    const { user } = this.props

    return(
      <ScrollView style={style.mainBackground}>
        <View style={style.container}>
          <Text style={style.name}>{user.name}({user.gender}) - {user.age}</Text>
        </View>
        <Text style={style.padding}>{user.description}</Text>
        <View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingTop: 10}}>
            <Text>Job Title:{"\n"}{user.job_title}</Text>
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingTop: 10}}>
            <Text>School:{"\n"}{user.school}</Text>
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingTop: 10}}>
            <Text>Hobbies:{"\n"}{user.hobbies}</Text>
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingTop: 10}}>
            <View style={style.column}>
              <Text>Favorite Movie:{"\n"}{user.favorite_movie}</Text>
            </View>
            <View style={style.column}>
              <Text>Favorite Food:{"\n"}{user.favorite_food}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingTop: 10}}>
            <View style={style.column}>
              <Text>Favorite Song:{"\n"}{user.favorite_song}</Text>
            </View>
            <View style={style.column}>
              <Text>
                Interested In:{"\n"}
                {user.allow_male ? ' Male' : '' }
                {user.allow_female ? ' Female' : '' }
                {user.allow_other ? ' Other' : '' }
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}
