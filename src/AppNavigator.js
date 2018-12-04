import React                  from 'react'
import { Text, Animated,
  Easing, Image }             from 'react-native'
import { StackNavigator,
         DrawerView,
         DrawerNavigator }    from 'react-navigation'

import Login                  from '*/views/containers/Login'
import ForgotPassword         from '*/views/containers/ForgotPassword'
import Register               from '*/views/containers/Register'
import Dashboard              from '*/views/containers/Dashboard'
import Matches                from '*/views/containers/Matches'
import Message                from '*/views/containers/Message'
import UserProfile            from '*/views/containers/UserProfile'
import MatchedUser            from '*/views/containers/MatchedUser'
import Profile                from '*/views/containers/Profile'
import EditProfile            from '*/views/containers/EditProfile'
import TermsOfService         from '*/views/containers/TermsOfService'

import Menu                   from '*/views/components/atoms/Menu'
import Faqs                   from '*/views/components/atoms/Faqs'
import colors                 from '*/views/components/atoms/Colors'
import { Icon }               from 'react-native-elements'
import style                  from './style'
import NavigatorService       from '*/utils/navigator'

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

const LoginStack = StackNavigator({
  Login:          { screen: Login },
  ForgotPassword: { screen: ForgotPassword },
  Register:       { screen: Register },
  TermsOfService: { screen: TermsOfService }
}, {
    headerMode: 'none',
    navigationOptions: {
      headerStyle: null,
      title: null,
      headerTintColor: null
    }
})

const drawerButton = (navigation) =>
  <Icon
    onPress={() => {
        // Coming soon: navigation.navigate('DrawerToggle')
        // https://github.com/react-community/react-navigation/pull/2492
        if (navigation.state.index === 0) {
          navigation.navigate('DrawerOpen')
        } else {
          navigation.navigate('DrawerClose')
        }
      }
    }
    color='#fff'
    name='menu'
    containerStyle={{marginLeft: 10}}
    size={35} />

const DrawerStack = DrawerNavigator({
  Dashboard:  { screen: Dashboard },
  Matches:    { screen: Matches },
  Login:      { screen: Login },
  Profile:     { screen: Profile },
  Faqs:       { screen: Faqs }
}, {
  gesturesEnabled: false,
  contentComponent: Menu
})

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'screen',
  navigationOptions: ({navigation}, header) => ({
    headerStyle: {backgroundColor: colors.main},
    headerTintColor: 'white',
    gesturesEnabled: false,
    headerLeft: drawerButton(navigation),
    ...header,
  })
})

// Children stacks
const goBackButton = (url) =>
  <Icon
    name={'chevron-left'}
    color="#fff"
    containerStyle={{marginLeft: 10}}
    onPress={ () => NavigatorService.navigate(url) }  />

// Recurring
const MessageStack = DrawerNavigator({
  Message: { screen: Message }
}, {
  gesturesEnabled: false
})

const MessageNavigation = StackNavigator({
  MessageStack: { screen: MessageStack },
}, {
  headerMode: 'screen',
  navigationOptions: ({navigation}, header) => ({
    headerStyle: {backgroundColor: colors.main},
    headerTintColor: 'white',
    gesturesEnabled: false,
    headerLeft: goBackButton('Matches'),
    ...header,
  })
})

const MatchedUserStack = DrawerNavigator({
  MatchedUser: { screen: MatchedUser }
}, {
  gesturesEnabled: false
})

const MatchedUserNavigation = StackNavigator({
  MatchedUserStack: { screen: MatchedUserStack },
}, {
  headerMode: 'screen',
  navigationOptions: ({navigation}, header) => ({
    headerStyle: {backgroundColor: colors.main},
    headerTintColor: 'white',
    gesturesEnabled: false,
    ...header,
  })
})

const ProfileStack = DrawerNavigator({
  UserProfile: { screen: UserProfile }
}, {
  gesturesEnabled: false
})

const ProfileNavigation = StackNavigator({
  ProfileStack: { screen: ProfileStack },
}, {
  headerMode: 'screen',
  navigationOptions: ({navigation}, header) => ({
    headerStyle: {backgroundColor: colors.main},
    headerTintColor: 'white',
    gesturesEnabled: false,
    headerLeft: goBackButton('DrawerStack'),
    ...header,
  })
})

const EditProfileStack = DrawerNavigator({
  EditProfile: { screen: EditProfile }
}, {
  gesturesEnabled: false
})

const EditProfileNavigation = StackNavigator({
  EditProfileStack: { screen: EditProfileStack }
}, {
  headerMode: 'screen',
  navigationOptions: ({navigation}, header) => ({
    headerStyle: {backgroundColor: colors.main},
    headerTintColor: 'white',
    gesturesEnabled: false,
    headerLeft: goBackButton('Profile'),
    ...header,
  })
})

// Master stack
export default StackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: DrawerNavigation },
  MessageStack: { screen: MessageNavigation },
  ProfileStack: { screen: ProfileNavigation },
  EditProfileStack: { screen: EditProfileNavigation },
  MatchedUserStack: { screen: MatchedUserNavigation }
}, {
  // Default config for all screens
  headerMode: 'none',
  title: null,
  initialRouteName: 'loginStack',
  transitionConfig: noTransitionConfig
})
