import React                              from 'react'
import { StyleSheet, Text, View,
         ScrollView, ActionSheetIOS }     from 'react-native'
import { connect }                        from 'react-redux'
import { NavigationActions }              from 'react-navigation'
import { List, ListItem }                 from 'react-native-elements'
import { MaterialIcons, Ionicons }        from '@expo/vector-icons'
import NavigatorService                   from '*/utils/navigator'
import { unsetUser }                      from '*/core/user'

class DrawerContainer extends React.Component {

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
        <List>
          <ListItem
            title={"Dashboard"}
            onPress={() => this._pop('Dashboard')}
            leftIcon={{name: "home"}} />

          <ListItem
            title={"Matches"}
            onPress={() => this._pop('Matches')}
            leftIcon={{name: "favorite"}} />

          <ListItem
            title="Profile"
            onPress={() => this._pop('Profile')}
            leftIcon={{name: "person"}} />

          <ListItem
            title="Logout"
            onPress={() => this.logout()}
            leftIcon={{name: "exit-to-app"}} />

        </List>
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
)(DrawerContainer)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10
  },
  child: {
    backgroundColor: '#E8E8E8',
    paddingLeft: 20
  }
})
