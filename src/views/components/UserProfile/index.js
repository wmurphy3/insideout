import React, { Component }       from 'react'
import { Text, View, ScrollView, FlatList } from 'react-native'
import moment                     from 'moment'
import Spinner                    from '*/views/components/atoms/Spinner'
import NavigatorService           from '*/utils/navigator'
import style                      from './style'
import colors                     from '*/views/components/atoms/Colors'
import { Col, Row, Grid }         from "react-native-easy-grid"
import { Button, Card, ListItem , Avatar } from 'react-native-elements'

export default class UserProfileScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Profile',
    };
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      person: null
    }
  }

  componentWillMount() {
    const { people } = this.props
    let route = NavigatorService.getCurrentRoute()
    this.setState({person: people.data[route.params.id]})
  }

  goToMessage(id) {
    this.props.createMatch(id)
  }

  reportUser(id) {
    this.props.reportUser(id, "Reported User")
  }

  render() {
    const { person, loading } = this.state
    if (!person || loading)
      return (<Spinner />)

    return (
      <ScrollView style={style.mainBackground}>
        <Card
          title={`${person.name.split(" ")[0]}`}>
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
                    <Text style={style.table_header}>Miles Away</Text>
                  </View>
                  <View style={style.row}>
                    <Text style={style.table_data}>{person.distance}</Text>
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

            <Button
              icon={{name: 'md-chatboxes', color: '#fff', type: 'ionicon'}}
              fontSize={16}
              onPress={() => this.goToMessage(person.id)}
              buttonStyle={style.button}
              title='CONNECT' />
          </Card>

        <Text onPress={() => this.reportUser(person.id)} style={style.contact_link}>Report User</Text>
      </ScrollView>
    );
  }
}
