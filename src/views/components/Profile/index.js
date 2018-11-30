import React, { Component }               from 'react'
import { Text, View, Switch, AlertIOS,
         ScrollView, FlatList, ActionSheetIOS }           from 'react-native';
import { Button, Card, ListItem , Avatar, Icon}   from 'react-native-elements'
import style                              from './style'
import Spinner                            from '*/views/components/atoms/Spinner'
import NavigatorService                   from '*/utils/navigator'
import colors                             from '*/views/components/atoms/Colors'
import { Permissions }                    from 'expo'

export default class UserInformation extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: 'My Profile'
    };
  };

  constructor(props) {
    super(props)

    this.state = {
      toggle: false,
      show: false
    }
  }

  _editProfile = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA)

    if (status === 'granted') {
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
    let pickerResult = await Expo.ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this.saveImage(pickerResult.uri)
  };

  saveImage(uri) {
    this.setState({ imageUri: uri })
    this.props.saveImage(uri)
  }

  goToEdit = () => {
    NavigatorService.navigate("EditProfileStack")
  }

  render() {
    const { user } = this.props

    if(user.loading) {
      return (<Spinner />)
    }

    return(
      <ScrollView style={style.mainBackground}>
        <Card
          title={`${user.name.split(" ")[0]}`}>
          <View style={{flex:1, alignItems: 'center'}}>
            {user.profile_picture ?
              <Avatar
                xlarge
                rounded
                source={{uri: user.profile_picture}}
                containerStyle={{width: 100, height: 100}}
                onPress={() => this._editProfile()}
                activeOpacity={0.7}
              />
              :
              <Avatar
                xlarge
                rounded
                icon={{name: 'user', type: 'entypo', size: 75}}
                containerStyle={{width: 100, height: 100}}
                onPress={() => this._editProfile()}
                activeOpacity={0.7}
              />
            }
            <View style={{flex:1}}>
              <Icon
                name={'camera'}
                type='entypo'
                containerStyle={{position: 'absolute', bottom: 0, right: -45}}
                color="#fff" />
            </View>
          </View>
          <ListItem
            containerStyle={style.listView}
            hideChevron={true}
            title={
              <View style={{flexDirection: 'row'}}>
                <View style={style.row}>
                  <Text style={style.table_header}>Gender</Text>
                </View>
                <View style={style.row}>
                  <Text style={style.table_data}>{user.gender}</Text>
                </View>
              </View>
            } />

            <ListItem
              containerStyle={style.listView}
              hideChevron={true}
              title={
                <View style={{flexDirection: 'row'}}>
                  <View style={style.row}>
                    <Text style={style.table_header}>Age</Text>
                  </View>
                  <View style={style.row}>
                    <Text style={style.table_data}>{user.age}</Text>
                  </View>
                </View>
              } />
            {user.job_title &&
              <ListItem
                containerStyle={style.listView}
                hideChevron={true}
                title={
                  <View style={{flexDirection: 'row'}}>
                    <View style={style.row}>
                      <Text style={style.table_header}>Job Title</Text>
                    </View>
                    <View style={style.row}>
                      <Text style={style.table_data}>{user.job_title}</Text>
                    </View>
                  </View>
                } />
            }
            {user.school &&
              <ListItem
                containerStyle={style.listView}
                hideChevron={true}
                title={
                  <View style={{flexDirection: 'row'}}>
                    <View style={style.row}>
                      <Text style={style.table_header}>School</Text>
                    </View>
                    <View style={style.row}>
                      <Text style={style.table_data}>{user.school}</Text>
                    </View>
                  </View>
                } />
            }
            <ListItem
              containerStyle={style.listView}
              hideChevron={true}
              title={
                <View style={{flexDirection: 'row'}}>
                  <View style={style.row}>
                    <Text style={style.table_header}>Interested In</Text>
                  </View>
                  <View style={style.row}>
                    <Text style={style.table_data}>
                    {user.allow_male ? ' Males' : '' }
                    {user.allow_female ? ' Females' : '' }
                    {user.allow_other ? ' Others' : '' }
                    </Text>
                  </View>
                </View>
              } />
            <ListItem
              containerStyle={style.listView}
              hideChevron={true}
              title={
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Text style={style.table_header}>About Me</Text>
                    <Text numberOfLines={20}>{user.description}</Text>
                  </View>
                </View>
              } />
            <ListItem
              containerStyle={style.listView}
              hideChevron={true}
              title={
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Text style={style.table_header}>Interests</Text>
                    <FlatList
                      horizontal
                      data={user.interests}
                      renderItem={({ item: rowData }) => {
                        return (
                          <Button
                            fontSize={14}
                            titleStyle={{color: colors.main}}
                            buttonStyle={style.interestButton}
                            title={rowData} />
                        );
                      }}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                </View>
              } />
            <Button
              title="EDIT"
              onPress={() => this.goToEdit()}
              fontSize={16}
              borderRadius={5}
              containerViewStyle={{marginLeft: 0, marginRight: 0}}
              buttonStyle={style.button} />

        </Card>
      </ScrollView>
    )
  }
}
