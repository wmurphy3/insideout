import React                              from 'react'
import { StyleSheet, Text, View,
         ScrollView, ActionSheetIOS }     from 'react-native'
import { connect }                        from 'react-redux'
import { NavigationActions }              from 'react-navigation'
import { ListItem }                       from 'react-native-elements'
import { MaterialIcons, Ionicons }        from '@expo/vector-icons'
import NavigatorService                   from '*/utils/navigator'
import { unsetUser }                      from '*/core/user'
import Faqs                               from '*/views/components/atoms/Faqs'

class Menu extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      toggle_profile: false
    }
  }

  logout = () => {
    const { logout } = this.props

    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Cancel', 'Log Out'],
      destructiveButtonIndex: 1,
      cancelButtonIndex: 0,
    },
    (buttonIndex) => {
      if (buttonIndex === 1) {
        logout();
        NavigatorService.reset('loginStack')
      }
    });
  }

  showProfile() {
    this.setState({
      toggle_profile: !this.state.toggle_profile
    })
  }

  _pop = (location) => {
    this.setState({ toggle_profile: false })
    NavigatorService.navigate(location)
  }

  render() {
    const { navigation } = this.props
    return (
      <ScrollView style={styles.container}>
        <ListItem
          title={"Meet People"}
          onPress={() => this._pop('Dashboard')}
          containerStyle={styles.listView}
          titleStyle={{color: '#838383'}}
          leftIcon={{name: "home", color: '#838383'}} />

        <ListItem
          title={"Message Center"}
          onPress={() => this._pop('Matches')}
          containerStyle={styles.listView}
          titleStyle={{color: '#838383'}}
          leftIcon={{name: "favorite", color: '#838383'}} />

        <ListItem
          title="My Profile"
          onPress={() => this._pop('Profile')}
          containerStyle={styles.listView}
          titleStyle={{color: '#838383'}}
          leftIcon={{name: "person", color: '#838383'}} />

        <ListItem
          title="FAQs"
          onPress={() => this._pop('Faqs')}
          containerStyle={styles.listView}
          titleStyle={{color: '#838383'}}
          leftIcon={{name: "person", color: '#838383'}} />

        <ListItem
          title="Logout"
          onPress={() => this.logout()}
          containerStyle={styles.listView}
          titleStyle={{color: '#838383'}}
          leftIcon={{name: "exit-to-app", color: '#838383'}} />
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = (dispatch, props) => {
  return {
    logout: () => dispatch(unsetUser())
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  child: {
    backgroundColor: '#E8E8E8',
    paddingLeft: 20
  },
  listView: {
    borderBottomWidth: 1,
    borderColor: '#838383',
    paddingBottom: 15
  }
})
