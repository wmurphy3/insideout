import React, { Component }       from 'react'
import { Text, View, ScrollView } from 'react-native'
import moment                     from 'moment'
import Spinner                    from '*/views/components/atoms/Spinner'
import NavigatorService           from '*/utils/navigator'
import style                      from './style'
import colors                     from '*/views/components/atoms/Colors'
import { Col, Row, Grid }         from "react-native-easy-grid"
import { Button }                 from 'react-native-elements'

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
    NavigatorService.navigate('MessageStack', {id: null, user_id: id})
  }

  render() {
    const { person } = this.state
    if (!person)
      return (<Spinner />)

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
        <Button
          title="Message"
          onPress={() => this.goToMessage(person.id)}
          containerViewStyle={{marginLeft: 0, marginRight: 0}}
          buttonStyle={style.button} />
      </ScrollView>
    );
  }
}
