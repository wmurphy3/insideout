import React, { Component }                 from 'react';
import { Text, Image, ScrollView, View }    from 'react-native';
import { NavigationActions }                from 'react-navigation'
import NavigatorService                     from '*/utils/navigator'
import style                                from './style'
import { KeyboardAwareScrollView }          from 'react-native-keyboard-aware-scroll-view'
import Spinner                              from '*/views/components/atoms/Spinner'
import General                              from './general'
import Description                          from './description'
import Interests                            from './interests'
import Work                                 from './work'
import Into                                 from './into'

export default class Register extends Component {

  constructor(props) {
    super(props)

    this.state = {
      page: 1
    }
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.onRegister = this.onRegister.bind(this)
  }

  onRegister = (values) => {
    this.props.register(values)
  }

  goToLogin() {
    NavigatorService.navigate('Login')
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  render() {
    const { handleSubmit, user } = this.props
    const { page } = this.state

    if(user.loading) {
      return (<Spinner />)
    }

    return (
      <View style={style.mainBackground}>
        <View style={{paddingHorizontal: 0, alignSelf: 'center', marginTop: 50}}>
          <Image
            style={{maxHeight: 100, alignSelf: 'center'}}
            source={require('*/views/assets/logo.png')}
            resizeMode="contain" />
        </View>
        <View style={{paddingHorizontal: 20, alignSelf: 'center', marginTop: 10}}>
          <Text>{this.state.page} of 5 Complete</Text>
        </View>
        { page === 1 && <General onSubmit={this.nextPage} /> }
        { page === 2 && <Description previousPage={this.previousPage} onSubmit={this.nextPage} /> }
        { page === 3 && <Interests previousPage={this.previousPage} onSubmit={this.nextPage} /> }
        { page === 4 && <Work previousPage={this.previousPage} onSubmit={this.nextPage} />}
        { page === 5 && <Into previousPage={this.previousPage} onSubmit={this.onRegister} /> }

        <Text style={style.link}>Already have an account? <Text onPress={() => this.goToLogin()} style={style.login_link}>Login</Text></Text>
      </View>
    )
  }
}
