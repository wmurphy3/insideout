import React, { Component }                 from 'react'
import { Text, View, ScrollView }           from 'react-native'
import moment                               from 'moment'
import Spinner                              from '*/views/components/atoms/Spinner'
import { List, ListItem, Card, Button }     from 'react-native-elements'
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
      <ScrollView
        containerStyle={{marginBottom: 20, marginTop: 0}}
        renderScrollComponent={props => <InfiniteScrollView horizontal={false} onLoadMoreAsync={this.loadMorePage}
        canLoadMore={this.state.canLoadMoreContent}
        distanceFromEnd={10} />}>
        {people.data.map((p, i) => (
          <Card
            key={i}
            title={`${p.name.split(" ")[0]}`}>
            <List
            containerStyle={{marginBottom: 20}}>
            <ListItem
              containerStyle={{marginTop: 0}}
              hideChevron={true}
              title={
                <View style={{flexDirection: 'row'}}>
                  <View style={style.row}>
                    <Text style={style.table_header}>Gender</Text>
                  </View>
                  <View style={style.row}>
                    <Text style={style.table_data}>{p.gender}</Text>
                  </View>
                </View>
              } />
            <ListItem
              hideChevron={true}
              title={
                <View style={{flexDirection: 'row'}}>
                  <View style={style.row}>
                    <Text style={style.table_header}>Age</Text>
                  </View>
                  <View style={style.row}>
                    <Text style={style.table_data}>{p.age} years old</Text>
                  </View>
                </View>
              } />
            <ListItem
              hideChevron={true}
              title={
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Text style={style.table_header}>About Me</Text>
                    <Text numberOfLines={2}>{p.description}</Text>
                  </View>
                </View>
              } />
            </List>
            <Button
              icon={{name: 'visibility'}}
              backgroundColor='#F05757'
              fontSize={16}
              borderRadius={5}
              onPress={() => this.goToProfile(i)}
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='READ MORE' />
          </Card>
        ))}
        {people.data.length < 1 &&
          <Card
            title='No One Found'>
            <Text>Currently no one to chat with. Invite more friends to use the app!</Text>
          </Card>
        }
      </ScrollView>
    );
  }
}
