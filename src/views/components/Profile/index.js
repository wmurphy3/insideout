import React, { Component }               from 'react'
import { Text, View, Switch, AlertIOS,
         ScrollView, FlatList }           from 'react-native';
import { Button, Card, ListItem , Avatar, Icon }   from 'react-native-elements'
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
        <Card
          title={`${user.name.split(" ")[0]}`}>
          {user.profile_picture &&
            <Avatar
              xlarge
              rounded
              source={{uri: user.profile_picture}}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
            />
          }
          <View style={{flex:1, alignItems: 'center'}}>
            <Avatar
              xlarge
              rounded
              icon={{name: 'user', type: 'entypo', size: 75}}
              containerStyle={{width: 100, height: 100}}
              activeOpacity={0.7}
            />
          </View>
          <ListItem
            containerStyle={style.listView}
            hideChevron={true}
            title={
              <View style={{flexDirection: 'row'}}>
                <View style={style.row}>
                  <Text style={style.table_header}>Gender</Text>
                </View>
                <View style={style.row}>
                  <Text style={style.table_data}>{user.gender}</Text>
                </View>
              </View>
            } />

            <ListItem
              containerStyle={style.listView}
              hideChevron={true}
              title={
                <View style={{flexDirection: 'row'}}>
                  <View style={style.row}>
                    <Text style={style.table_header}>Age</Text>
                  </View>
                  <View style={style.row}>
                    <Text style={style.table_data}>{user.age}</Text>
                  </View>
                </View>
              } />
            {user.job_title &&
              <ListItem
                containerStyle={style.listView}
                hideChevron={true}
                title={
                  <View style={{flexDirection: 'row'}}>
                    <View style={style.row}>
                      <Text style={style.table_header}>Job Title</Text>
                    </View>
                    <View style={style.row}>
                      <Text style={style.table_data}>{user.job_title}</Text>
                    </View>
                  </View>
                } />
            }
            {user.school &&
              <ListItem
                containerStyle={style.listView}
                hideChevron={true}
                title={
                  <View style={{flexDirection: 'row'}}>
                    <View style={style.row}>
                      <Text style={style.table_header}>School</Text>
                    </View>
                    <View style={style.row}>
                      <Text style={style.table_data}>{user.school}</Text>
                    </View>
                  </View>
                } />
            }
            <ListItem
              containerStyle={style.listView}
              hideChevron={true}
              title={
                <View style={{flexDirection: 'row'}}>
                  <View style={style.row}>
                    <Text style={style.table_header}>Interested In</Text>
                  </View>
                  <View style={style.row}>
                    <Text style={style.table_data}>
                    {user.allow_male ? ' Males' : '' }
                    {user.allow_female ? ' Females' : '' }
                    {user.allow_other ? ' Others' : '' }
                    </Text>
                  </View>
                </View>
              } />
            <ListItem
              containerStyle={style.listView}
              hideChevron={true}
              title={
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Text style={style.table_header}>About Me</Text>
                    <Text numberOfLines={20}>{user.description}</Text>
                  </View>
                </View>
              } />
            <ListItem
              containerStyle={style.listView}
              hideChevron={true}
              title={
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Text style={style.table_header}>Interests</Text>
                    <FlatList
                      horizontal
                      data={user.interests}
                      renderItem={({ item: rowData }) => {
                        return (
                          <Button
                            fontSize={14}
                            titleStyle={{color: colors.main}}
                            buttonStyle={style.interestButton}
                            title={rowData} />
                        );
                      }}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                </View>
              } />

        </Card>
      </ScrollView>
    )
  }
}
