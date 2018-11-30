import React, { Component }       from 'react'
import { Text, View, ScrollView, FlatList } from 'react-native'
import moment                     from 'moment'
import Spinner                    from '*/views/components/atoms/Spinner'
import NavigatorService           from '*/utils/navigator'
import style                      from './style'
import colors                     from '*/views/components/atoms/Colors'
import { Button, Icon, Avatar, Card, ListItem }   from 'react-native-elements'

export default class MatchedUserScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: 'Profile',
      headerLeft: (
        <Icon
          name={'chevron-left'}
          color="#fff"
          onPress={ () => NavigatorService.navigate('MessageStack') }  />
      )
    };
  };

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    const { current_match } = this.props

    this.props.getPerson(current_match.data.user_id)
  }

  reportUser(id) {
    this.props.reportUser(id, "Reported User")
  }

  render() {
    const { people, current_match } = this.props

    if (people.loading || Object.keys(people.person).length === 0 )
      return (<Spinner />)

    const person = people.person

    return (
      <ScrollView style={style.mainBackground}>
      <Card
        title={`${person.name.split(" ")[0]}`}>
        <View style={{flex:1, alignItems: 'center'}}>
          {(person.profile_picture && person.matched) ?
            <Avatar
              xlarge
              rounded
              source={{uri: person.profile_picture}}
              containerStyle={{width: 100, height: 100}}
              activeOpacity={0.7}
            />
            :
            <Avatar
              xlarge
              rounded
              icon={{name: 'user', type: 'entypo', size: 75}}
              containerStyle={{width: 100, height: 100}}
              activeOpacity={0.7}
            />
          }
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
                <Text style={style.table_data}>{person.gender}</Text>
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
                  <Text style={style.table_data}>{person.age}</Text>
                </View>
              </View>
            } />
          {person.job_title &&
            <ListItem
              containerStyle={style.listView}
              hideChevron={true}
              title={
                <View style={{flexDirection: 'row'}}>
                  <View style={style.row}>
                    <Text style={style.table_header}>Job Title</Text>
                  </View>
                  <View style={style.row}>
                    <Text style={style.table_data}>{person.job_title}</Text>
                  </View>
                </View>
              } />
          }
          {person.school &&
            <ListItem
              containerStyle={style.listView}
              hideChevron={true}
              title={
                <View style={{flexDirection: 'row'}}>
                  <View style={style.row}>
                    <Text style={style.table_header}>School</Text>
                  </View>
                  <View style={style.row}>
                    <Text style={style.table_data}>{person.school}</Text>
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
                  {person.allow_male ? ' Males' : '' }
                  {person.allow_female ? ' Females' : '' }
                  {person.allow_other ? ' Others' : '' }
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
                  <Text numberOfLines={20}>{person.description}</Text>
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
                    data={person.interests}
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
        <Text onPress={() => this.reportUser(current_match.data.user_id)} style={style.contact_link}>Report User</Text>
      </ScrollView>
    );
  }
}
