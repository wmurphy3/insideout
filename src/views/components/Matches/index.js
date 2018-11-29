import React, { Component }  from 'react'
import { Text, View, ScrollView } from 'react-native'
import moment                from 'moment'
import Spinner               from '*/views/components/atoms/Spinner'
import { ListItem }          from 'react-native-elements'
import NavigatorService      from '*/utils/navigator'
import style                 from './style'
import colors                from '*/views/components/atoms/Colors'

export default class MatchesScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Message Center',
    };
  };

  constructor(props, context) {
    super(props, context);

    this.goToMessage = this.goToMessage.bind(this)
  }

  componentWillMount() {
    this.props.getMatches()
  }

  goToMessage(i) {
    console.log(i)
    this.props.setCurrentMatch(i)
  }

  render() {
    const { matches } = this.props

    if (matches.loading)
      return (<Spinner />)

    console.log(matches.data)
    return (
      <ScrollView>
      {
        matches.data.map((match, i) => (
          <ListItem
            key={i}
            title={match.name}
            subtitle={`${match.age} yeard old`}
            onPress={() => this.goToMessage(i)}
            chevronColor='#e7eaec'
            chevron
          />
        ))
      }
      </ScrollView>
    );
  }
}
