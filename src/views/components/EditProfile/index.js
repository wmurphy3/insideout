import React, { Component }               from 'react'
import { Text, View }                     from 'react-native';
import { Button }                         from 'react-native-elements'
import { Field }                          from 'redux-form'
import FieldInput                         from '*/views/components/atoms/FieldInput'
import FieldSelect                        from '*/views/components/atoms/FieldSelect'
import style                              from './style'
import NavigatorService                   from '*/utils/navigator'
import { KeyboardAwareScrollView }        from 'react-native-keyboard-aware-scroll-view'

export default class EditProfile extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: 'Edit Profile',
      headerRight:
        <Text
          name={'add-circle-outline'}
          style={{marginRight: 10, color: '#fff'}}
          onPress={ () => params.update() }>
          Update
        </Text>
    };
  };

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { handleSubmit } = this.props

    this.props.navigation.setParams({
      update: handleSubmit(this.update)
    })
  }

  update = (values) => {
    this.props.updateUser(values, this.props.user.id)
  }

  render() {
    const { handleSubmit } = this.props

    return(
      <KeyboardAwareScrollView style={style.mainBackground}>

        <Field
          name="name"
          type="text"
          placeholder="Name"
          label="First and Last Name"
          style={style.input}
          component={FieldInput} />

        <Field
          name="email"
          type="text"
          placeholder="Email"
          label="Email"
          style={style.input}
          component={FieldInput} />

        <Button
          title="Update"
          onPress={handleSubmit(this.update)}
          buttonStyle={style.button}
          containerViewStyle={{margin: 20}} />
      </KeyboardAwareScrollView>
    )
  }
}
