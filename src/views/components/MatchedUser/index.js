import React, { Component }       from 'react'
import { Text, View, ScrollView } from 'react-native'
import moment                     from 'moment'
import Spinner                    from '*/views/components/atoms/Spinner'
import NavigatorService           from '*/utils/navigator'
import style                      from './style'
import colors                     from '*/views/components/atoms/Colors'
import { Col, Row, Grid }         from "react-native-easy-grid"
import { Button, Icon }           from 'react-native-elements'

export default class MatchedUserScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: 'Profile',
      headerLeft: (
        <Icon
          name={'chevron-left'}
          color="#fff"
          onPress={ () => NavigatorService.navigate('MessageStack', {id: params.id, user_id: params.user_id, row_id: params.row_id}) }  />
      )
    };
  };

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    let route = NavigatorService.getCurrentRoute()

    this.props.navigation.setParams({
      id: route.params.id,
      user_id: route.params.user_id,
      row_id: route.params.row_id
    })

    this.props.getPerson(route.params.user_id)
  }

  render() {
    const { people } = this.props

    if (people.loading || !people.person)
      return (<Spinner />)

    const person = people.person

    return (
      <ScrollView style={style.mainBackground}>
        <View style={style.container}>
          <Text style={style.name}>{person.name}({person.gender}) - {person.age}</Text>
        </View>
        <Text style={style.distance}>{person.distance} miles away</Text>
        <Text style={style.padding}>{person.description}</Text>
        <View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingTop: 10}}>
            <Text>Job Title:{"\n"}{person.job_title}</Text>
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingTop: 10}}>
            <Text>School:{"\n"}{person.school}</Text>
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingTop: 10}}>
            <Text>Hobbies:{"\n"}{person.hobbies}</Text>
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingTop: 10}}>
            <View style={style.column}>
              <Text>Favorite Movie:{"\n"}{person.favorite_movie}</Text>
            </View>
            <View style={style.column}>
              <Text>Favorite Food:{"\n"}{person.favorite_food}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingTop: 10}}>
            <View style={style.column}>
              <Text>Favorite Song:{"\n"}{person.favorite_song}</Text>
            </View>
            <View style={style.column}>
              <Text>
                Interested In:{"\n"}
                {person.allow_male ? ' Male' : '' }
                {person.allow_female ? ' Female' : '' }
                {person.allow_other ? ' Other' : '' }
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
