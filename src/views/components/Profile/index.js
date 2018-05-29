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
        <View style={style.border_bottom}>

          <List
            containerStyle={{marginBottom: 20}}>
            <ListItem
              hideChevron={true}
              title={
                <View style={{flexDirection: 'row'}}>
                  <View style={style.row}>
                    <Text style={style.table_header}>Name</Text>
                  </View>
                  <View style={style.row}>
                    <Text style={style.table_data}>{user.name}</Text>
                  </View>
                </View>
              } />


          </List>
        </View>
      </ScrollView>
    )
  }
}
