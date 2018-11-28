import colors        from '*/views/components/atoms/Colors'
import { Dimensions }from 'react-native'

export default {
  mainBackground: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    marginLeft: 20,
    marginRight: 20,
    width: (Dimensions.get('window').width - 40)
  },
  forgot_password_link: {
    color: colors.main,
    marginTop: 5,
    alignSelf: 'flex-end'
  },
  touch_link: {
    color: colors.main,
    marginTop: 5,
    alignSelf: 'center'
  },
  button: {
    backgroundColor: colors.main,
    marginTop: 10,
    padding: 5
  },
  register_link: {
    marginTop: 20,
    padding: 10,
    color: colors.main,
    textAlign: 'center'
  },
  link: {
    marginTop: 20,
    textAlign: 'center'
  },
  contact_link: {
    color: colors.main,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10
  },
  divider: {
    backgroundColor: colors.border,
    marginTop: 10
  }
}
