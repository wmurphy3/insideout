import React, { Component }   from 'react'
import { Text, View, ScrollView,
  ActionSheetIOS }            from 'react-native'
import moment                 from 'moment'
import Spinner                from '*/views/components/atoms/Spinner'
import NavigatorService       from '*/utils/navigator'
import style                  from './style'
import colors                 from '*/views/components/atoms/Colors'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { Avatar, Icon }       from 'react-native-elements'
import Pusher                 from 'pusher-js/react-native';

var pusher = new Pusher('5c97f200280b746920a2', {
  cluster: 'us2',
  encrypted: true
});

export default class MessageScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;

    return {
      headerTitle: (
        <Avatar
          small
          rounded
          title={params.name}
          onPress={() => params.goToProfile()}
          activeOpacity={0.7}
        />
      ),
      headerRight: (
        <Icon
          type="ionicon"
          name={'md-more'}
          containerStyle={{marginRight: 20}}
          color="#fff"
          onPress={ () => params.messageOptions() }  />
      )
    };
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      messages: [],
      match_id: null,
      user_id: null,
      row_id: null
    }
  }

  componentWillMount() {
    if(this.props.current_match) {
      this.props.getMessages(this.props.current_match.id)
      this.props.navigation.setParams({
        goToProfile: this.goToUserProfile,
        messageOptions: this.messageOptions,
        name: this.props.current_match.data.name.slice(0, 1)
      })

      var channel = pusher.subscribe(String(this.props.current_match.id));

      channel.bind('new-message', function(data) {
        console.log(data)
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      messages: nextProps.messages.data
    })
  }

  messageOptions = () => {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Cancel', 'Block User'],
      destructiveButtonIndex: 1,
      cancelButtonIndex: 0,
    },
    (buttonIndex) => {
      if (buttonIndex === 1) {
        this.props.blockUser();
      } else if (buttonIndex == 2) {
        this.setNextStep();
      }
    });
  }

  goToUserProfile = () => {
    NavigatorService.navigate('MatchedUserStack')
  }

  setNextStep = () => {
    this.props.setNextStep(this.props.current_match.id)
  }

  onSend = (messages = []) => {
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages),
    // }))

    this.props.setMessage(messages[0], this.props.current_match.id, this.props.user.id)
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#ffffff',
          }, right:{
            backgroundColor: '#F05757',
          }

        }}
      />
    );
  }

  render() {
    const { messages, user, current_match } = this.props

    if (messages.loading || !current_match)
      return (<Spinner />)

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        renderBubble={this.renderBubble}
        user={{
          _id: user.id,
        }}
      />
    );
  }
}
