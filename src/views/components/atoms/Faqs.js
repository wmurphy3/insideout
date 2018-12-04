import React                              from 'react'
import { StyleSheet, Text, View,
         ScrollView, ActionSheetIOS }     from 'react-native'
import { connect }                        from 'react-redux'
import { NavigationActions }              from 'react-navigation'
import { ListItem }                       from 'react-native-elements'
import { MaterialIcons, Ionicons }        from '@expo/vector-icons'
import NavigatorService                   from '*/utils/navigator'

class Faqs extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { navigation } = this.props
    return (
      <ScrollView style={styles.container}>
        <ListItem
          title={"How does this app work?"}
          subtitle={"Press on an user on the dashboard. Once you decide to connect with that person, message that at any point. Once you both have connected for more than a day you can view their profile picture."}
          containerStyle={styles.listView}
          titleStyle={{color: '#838383'}} />

        <ListItem
          title={"How do I add a profile picture?"}
          subtitle={"Go your your profile. CLick the profile icon and choose form you photo album or camera roll."}
          containerStyle={styles.listView}
          titleStyle={{color: '#838383'}} />

        <ListItem
          title={"Can I block an user?"}
          subtitle={"Yes, at anytime after you have connected you can block an user."}
          containerStyle={styles.listView}
          titleStyle={{color: '#838383'}} />

        <ListItem
          title={"Can I report an user?"}
          subtitle={"Yes, go to their profile and report the user."}
          containerStyle={styles.listView}
          titleStyle={{color: '#838383'}} />

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
)(Faqs)

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
