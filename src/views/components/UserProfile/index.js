import React, { Component }  from 'react'
import { Text, View, ScrollView } from 'react-native'
import moment                from 'moment'
import Spinner               from '*/views/components/atoms/Spinner'
import NavigatorService      from '*/utils/navigator'
import style                 from './style'
import colors                from '*/views/components/atoms/Colors'

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

  render() {
    const { person } = this.state
    if (!person)
      return (<Spinner />)

    return (
      <ScrollView style={style.mainBackground}>
        <Text>{person.name}</Text>
      </ScrollView>
    );
  }
}
