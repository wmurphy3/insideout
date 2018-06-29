import React, { Component }               from 'react'
import { Text, View, ActionSheetIOS }     from 'react-native';
import { Button, Avatar }                 from 'react-native-elements'
import { Field }                          from 'redux-form'
import FieldInput                         from '*/views/components/atoms/FieldInput'
import FieldSelect                        from '*/views/components/atoms/FieldSelect'
import CustomCheckBox                     from '*/views/components/atoms/CustomCheckBox'
import style                              from './style'
import NavigatorService                   from '*/utils/navigator'
import { KeyboardAwareScrollView }        from 'react-native-keyboard-aware-scroll-view'
import { Genders }                        from '*/utils/custom_services'

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

    this.state = {
      imgUri: null
    }
  }

  componentWillMount() {
    const { handleSubmit } = this.props

    this.props.navigation.setParams({
      update: handleSubmit(this.update)
    })
  }

  getGenders() {
    return Genders().map(m => ({ value: m.key, label: m.label}) )
  }

  _editProfile = () => {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Cancel', 'Photo Album', 'Take Photo'],
      destructiveButtonIndex: 1,
      cancelButtonIndex: 0,
    },
    (buttonIndex) => {
      if (buttonIndex === 1) {
        this._onChoosePic();
      } else if (buttonIndex == 2) {
        this._takePhoto();
      }
    });
  }

  _onChoosePic = async () => {
    const {
      cancelled,
      uri,
    } = await Expo.ImagePicker.launchImageLibraryAsync();
    if (!cancelled) {
      this.saveImage(uri)
    }
  }

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this.saveImage(pickerResult.uri)
  };

  saveImage(uri) {
    this.setState({ imageUri: uri })
    this.props.saveImage(uri)
  }

  update = (values) => {
    this.props.updateUser(values, this.props.user.id)
  }

  render() {
    const { handleSubmit } = this.props

    return(
      <KeyboardAwareScrollView style={style.mainBackground}>
        <Field
          name="email"
          type="text"
          placeholder="Email"
          style={style.input}
          component={FieldInput} />

        <Field
          name="name"
          placeholder="Name"
          style={style.input}
          component={FieldInput} />

        <Field
          name="gender"
          placeholder="Gender"
          style={style.select}
          width={40}
          options={this.getGenders()}
          component={FieldSelect} />

        <Field
          name="age"
          placeholder="Age"
          style={style.input}
          component={FieldInput} />

        <Field
          name="description"
          multiline = {true}
          placeholder="Description"
          style={style.input}
          component={FieldInput} />

        <Field
          name="favorite_movie"
          placeholder="Favorite Movie"
          style={style.input}
          component={FieldInput} />

        <Field
          name="favorite_food"
          placeholder="Favorite Food"
          style={style.input}
          component={FieldInput} />

        <Field
          name="favorite_song"
          placeholder="Favorite Song"
          style={style.input}
          component={FieldInput} />

        <Field
          name="job_title"
          placeholder="Job Title"
          style={style.input}
          component={FieldInput} />

        <Field
          name="hobbies"
          placeholder="Hobbies"
          style={style.input}
          component={FieldInput} />

        <Field
          name="school"
          placeholder="School"
          style={style.input}
          component={FieldInput} />

        <Field
          name="social_media_link"
          placeholder="Social Media Link"
          style={style.input}
          component={FieldInput} />

        <Field
          name="snap_chat_name"
          placeholder="Snap Chat Name"
          style={style.input}
          component={FieldInput} />

        <Field
          name="allow_male"
          label="Into Males"
          component={CustomCheckBox} />

        <Field
          name="allow_female"
          label="Into Females"
          component={CustomCheckBox} />

        <Field
          name="allow_other"
          label="Into Other"
          component={CustomCheckBox} />

        {this.state.imageUri &&
          <Avatar
            small
            rounded
            source={{uri: this.state.imageUri}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
        }

        <Button
          title="Update"
          onPress={this._editProfile}
          buttonStyle={style.button}
          containerViewStyle={{margin: 20}} />

        <Button
          title="Update"
          onPress={handleSubmit(this.update)}
          buttonStyle={style.button}
          containerViewStyle={{margin: 20}} />
      </KeyboardAwareScrollView>
    )
  }
}
