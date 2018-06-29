import React, { Component }                 from 'react'
import { Text, View, ScrollView }           from 'react-native'
import moment                               from 'moment'
import Spinner                              from '*/views/components/atoms/Spinner'
import { List, ListItem }                   from 'react-native-elements'
import NavigatorService                     from '*/utils/navigator'
import style                                from './style'
import InfiniteScroll                       from 'react-native-infinite-scroll'
import colors                               from '*/views/components/atoms/Colors'
import { Constants, Location, Permissions,
         Notifications }                    from 'expo'

export default class DashboardScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Welcome!',
    };
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      page: 1,
      canLoadMoreContent: true
    }
  }

  componentWillMount() {
    this._getLocationAsync()
    this.configure_notifications()
  }

  componentWillReceiveProps(nextProps) {
    let meta = nextProps.people.data.length > 0 ? nextProps.people.meta : {"total_pages": 1, "current_page": 1}

    this.setState({
      canLoadMoreContent: (meta["total_pages"] != this.state.page)
    })
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
      this.props.getPeople(location, {page_number: this.state.page})
    }
  };

  configure_notifications = async() => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    this.props.saveToken(token)
  }

  goToProfile = (id) => {
    NavigatorService.navigate('ProfileStack', {id: id})
  }

  loadMorePage = () => {
    if(this.state.canLoadMoreContent) {
      let page = this.state.page + 1

      this.setState({
        page: page
      })

      this.props.getPeople(null, {page_number: page})
    }
  }

  render() {
    const { people } = this.props

    if (people.loading)
      return (<Spinner />)

    return (
      <List containerStyle={{marginBottom: 20, marginTop: 0}} renderScrollComponent={props => <InfiniteScrollView horizontal={false} onLoadMoreAsync={this.loadMorePage} canLoadMore={this.state.canLoadMoreContent} distanceFromEnd={10} />}>
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
