import React, { Component }  from 'react'
import { AppRegistry, Text, View, ScrollView, StyleSheet } from 'react-native'
import { Col, Row, Grid }    from 'react-native-easy-grid';
import moment                from 'moment'
import Spinner               from '*/views/components/atoms/Spinner'
import { Button }            from 'react-native-elements'
import NavigatorService      from '*/utils/navigator'
import style                 from './style'
import colors                from '*/views/components/atoms/Colors'
import Swiper                from 'react-native-deck-swiper'
import { Constants, Location, Permissions } from 'expo'

export default class DashboardScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Welcome!',
    };
  };

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this._getLocationAsync()
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      // TODO show error
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    } else {
      let location = await Location.getCurrentPositionAsync({})
      this.props.getPeople(location)
    }
  };

  renderCard = card => {
    return (
      <View style={style.card}>
        <Text>{card.name}</Text>
        <Text>{card.age}</Text>
        <Text>{card.description}</Text>
      </View>
    )
  }

  swipedAll = () => {

  }

  swipedLeft = (index) => {
    let user = this.props.people.data[index]
    this.props.declineMatch(user.id)
  }

  swipedRight= (index) => {
    let user = this.props.people.data[index]
    this.props.createMatch(user.id)
  }


  render() {
    const { people } = this.props

    if (people.loading)
      return (<Spinner />)

    return (
      <View style={style.container}>
      <Swiper
          cards={people.data}
          renderCard={this.renderCard}
          onSwipedLeft={this.swipedLeft}
          onSwipedRight={this.swipedRight}
          onSwipedAll={this.swipedAll}
          cardIndex={0}
          stackSize={3}
          verticalSwipe={false}
          backgroundColor={'#4FD0E9'}>
      </Swiper>
    </View>
    );
  }
}
