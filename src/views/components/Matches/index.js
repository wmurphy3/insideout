import React, { Component }  from 'react'
import { Text, View, ScrollView } from 'react-native'
import moment                from 'moment'
import Spinner               from '*/views/components/atoms/Spinner'
import { List, ListItem } from 'react-native-elements'
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
  }

  componentWillMount() {
    this.props.getMatches()
  }

  goToMessage = (id) => {
    NavigatorService.navigate("MessageStack", {id: id})
  }

  render() {
    const { matches } = this.props

    if (matches.loading)
      return (<Spinner />)

    return (
      <ScrollView style={style.container}>
        <List>
          {
            matches.data.map((match, i) => (
              <ListItem
                key={i}
                title={match.name}
                subtitle={`${match.age} yeard old`}
                onPress={() => this.goToMessage(match.id)}
              />
            ))
          }
        </List>
      </ScrollView>
    );
  }
}
