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
          title={"What is the purpose of this App?"}
          subtitle={"Other dating Apps have all been streamlined to swipe left or swipe right based on the looks of the other person which embraces and propels the hookup culture. Our team at InsideOut has designed this App to steer away from the same tendencies you see from other dating Apps and to get people to make true connections - whether it is finding a friend or finding true love. The idea of this App is to get to know people from the InsideOut and this is why your initial impression of people who use this app is purely informational and interest based."}
          containerStyle={styles.listView}
          titleStyle={{color: '#838383'}} />

        <ListItem
          title={"How does this App work?"}
          subtitle={"Scroll through the dashboard and read the information that different users have provided. Once you have seen someone’s “About Me” that interests you - click Read More in order to find out more about that person. If they seem like someone of interest, click Connect to start a chat with them and start truly getting to know them from the InsideOut!"}
          containerStyle={styles.listView}
          titleStyle={{color: '#838383'}} />

        <ListItem
          title={"When can I view someone’s picture?"}
          subtitle={"After 24 hours of initially connecting with someone you will have access to view their photo!"}
          containerStyle={styles.listView}
          titleStyle={{color: '#838383'}} />

        <ListItem
          title={"Can I block someone?"}
          subtitle={"Yes, at anytime after you have connected with another person - you can block a user by going to the chat that you have with them and clicking the 3 dots in the top right of the screen - then click “Block User”"}
          containerStyle={styles.listView}
          titleStyle={{color: '#838383'}} />

        <ListItem
          title={"Can I report someone?"}
          subtitle={"Yes, when you are viewing someone’s profile whether you are connected with them or not - you can scroll to the bottom and click “Report User” - this will notify our team and go up for review."}
          containerStyle={styles.listView}
          titleStyle={{color: '#838383'}} />

      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = (dispatch, props) => {
  return {}
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
