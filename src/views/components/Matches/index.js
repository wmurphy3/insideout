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

  goToMessage = (id, row_id, user_id) => {
    NavigatorService.navigate("MessageStack", {id: id, user_id: user_id, row_id: row_id})
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
                onPress={() => this.goToMessage(match.id, i, match.user_id)}
              />
            ))
          }
        </List>
      </ScrollView>
    );
  }
}
