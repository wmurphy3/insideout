import React, { Component }  from 'react'
import { Text, View, ScrollView } from 'react-native'
import moment                from 'moment'
import Spinner               from '*/views/components/atoms/Spinner'
import { List, ListItem }    from 'react-native-elements'
import NavigatorService      from '*/utils/navigator'
import style                 from './style'
import colors                from '*/views/components/atoms/Colors'
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

  goToProfile = (id) => {
    NavigatorService.navigate('ProfileStack', {id: id})
  }

  render() {
    const { people } = this.props

    if (people.loading)
      return (<Spinner />)

    return (
      <List containerStyle={{marginBottom: 20, marginTop: 0}}>
        {people.data.map((p, i) => (
          <ListItem
            key={p.id}
            title={
              <Text style={style.name}>{p.name}({p.gender}) - {p.age}</Text>
            }
            onPress={() => this.goToProfile(i)}
            subtitle={
              <View>
                <View>
                  <Text style={style.distance}>{p.distance} miles away</Text>
                </View>
                <View style={style.container}>
                  <Text numberOfLines={2} style={style.text}>{p.description}</Text>
                </View>
              </View>
            }
            rightIcon={{name: 'visibility'}}
          />
        ))}
      </List>
    );
  }
}
