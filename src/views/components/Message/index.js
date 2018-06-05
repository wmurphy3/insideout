import React, { Component }  from 'react'
import { Text, View, ScrollView } from 'react-native'
import moment                from 'moment'
import Spinner               from '*/views/components/atoms/Spinner'
import NavigatorService      from '*/utils/navigator'
import style                 from './style'
import colors                from '*/views/components/atoms/Colors'
import { GiftedChat, Bubble }        from 'react-native-gifted-chat'

export default class MessageScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Message',
    };
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      messages: [],
      match_id: null,
      user_id: null
    }
  }

  componentWillMount() {
    let route = NavigatorService.getCurrentRoute()
    this.setState({match_id: route.params.id, user_id: route.params.user_id})
    this.props.getMessages(route.params.id)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      messages: nextProps.messages.data
    })
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
