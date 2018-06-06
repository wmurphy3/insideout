import React, { Component }   from 'react'
import { Text, View, ScrollView } from 'react-native'
import moment                 from 'moment'
import Spinner                from '*/views/components/atoms/Spinner'
import NavigatorService       from '*/utils/navigator'
import style                  from './style'
import colors                 from '*/views/components/atoms/Colors'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { Avatar, Icon }       from 'react-native-elements'

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
          type="entypo"
          name={'magnifying-glass'}
          containerStyle={{marginRight: 10}}
          color="#fff"
          onPress={ () => params.setNextStep() }  />
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
    let route = NavigatorService.getCurrentRoute()
    this.setState({match_id: route.params.id, user_id: route.params.user_id, row_id: route.params.row_id})
    this.props.getMessages(route.params.id)

    this.props.navigation.setParams({
      goToProfile: this.goToUserProfile,
      setNextStep: this.setNextStep,
      name: this.props.matches.data[route.params.row_id]["name"].slice(0, 1)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      messages: nextProps.messages.data
    })
  }

  goToUserProfile = () => {
    NavigatorService.navigate('MatchedUserStack', {id: this.state.match_id, user_id: this.state.user_id, row_id: this.state.row_id})
  }

  setNextStep = () => {
    this.props.setNextStep(this.state.match_id)
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    this.props.setMessage(messages[0], this.state.match_id, this.state.user_id)
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  render() {
    const { messages, user } = this.props

    if (messages.loading)
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
