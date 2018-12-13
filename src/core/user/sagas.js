import { all, takeLatest, fork, call, put,
         select, race, take }                       from 'redux-saga/effects'
import { delay }                                    from 'redux-saga'
import { AsyncStorage }                             from 'react-native'
import { unsetUser, setUser, receiveLoginError,
         updateUserError, updateUserSuccess,
         saveImageSuccess, saveImageError,
         registerError, sendRecoveryEmailError,
         updatePasswordError }                       from './actions'
import { LOGIN_REQUESTED, USER_UNSET, USER_UPDATED,
         REGISTERED, SEND_RECOVERY_EMAIL,
         UPDATE_PASSWORD, SAVE_TOKEN,SAVE_IMAGE }    from './constants'
import apiUser                                       from './api'
import { displayErrors }                             from '*/utils/custom_services'
import { getAccessToken }                            from '*/core/user'
import { SecureStore }                               from 'expo'
import NavigatorService                              from '*/utils/navigator'
import { displaySuccess, displayError }              from '*/utils/toastr'

// Side effects Services
const getAuthToken = () => {
  try {
    const value = AsyncStorage.getItem('token')
    if (value !== null){
      return(JSON.parse(value))
    }
  } catch (error) {
    return null
  }
}

const setAuthToken = (token) => {
  AsyncStorage.setItem('token', JSON.stringify(token))
}

const removeAuthToken = () => {
  AsyncStorage.removeItem('token')
}

function* logout () {
  yield call(removeAuthToken)
  yield put(unsetUser())
}

function* authorize(credentialsOrToken, turn_touch_id_on) {
  try {
    const { response } = yield race({
      response: call(apiUser.login, credentialsOrToken),
      signout : take(USER_UNSET)
    })

    if (response && response.access_token) {
      yield call(setAuthToken, response)
      yield put(setUser(response))

      NavigatorService.navigate('drawerStack')

      return response
    } else {
      yield call(logout)
      return null
    }
  } catch (error) {
    displayError("Could not login. Please try again.")
    yield put(receiveLoginError(error))
  }
}

function* registeredFlow(action) {
  try {
    const { data } = action
    const user = yield call(apiUser.register, data)

    yield put(setUser(user))

    NavigatorService.navigate('loginStack')
    displaySuccess('Succesfully registerd')
  } catch (error) {
    console.log(error)
    yield put(registerError(error))
    displayError(error.errors)
  }
}

function* userUpdatedFlow(action) {
  try {
    const { data, id } = action
    const token = yield select(getAccessToken)
    const user = yield call(apiUser.userUpdate, token, data, id)

    yield put(updateUserSuccess(user))
    NavigatorService.navigate('Profile')
    displaySuccess('Profile updated')
  } catch (error) {
    console.log(error)
    yield put(updateUserError(error))
    displayError(error.errors)
  }
}

function* saveImageFlow(action) {
  try {
    const { image } = action
    const token = yield select(getAccessToken)
    const user = yield call(apiUser.saveImage, token, image)

    yield put(saveImageSuccess(user))
    displaySuccess('Profile updated')
  } catch (error) {
    console.log(error)
    yield put(saveImageError(error))
    displayError('Could not save image at this time.')
  }
}

function* sendRecoveryEmailFlow(action) {
  try {
    const { data } = action
    yield call(apiUser.sendRecoveryEmail, data)

    NavigatorService.navigate('loginStack')
    displaySuccess('Email has been sent')
  } catch (error) {
    yield put(sendRecoveryEmailError(error))
    displayError('Email could not be sent.')
  }
}

function* updatePasswordFlow(action) {
  try {
    const { data } = action
    const token = yield select(getAccessToken)
    yield call(apiUser.updatePassword, data, token)

    displaySuccess('Password updated')
  } catch (error) {
    yield put(updatePasswordError(error))
    displayError('Could not update password at this time')
  }
}

function* saveTokenFlow(action) {
  try {
    const { data } = action
    const token = yield select(getAccessToken)
    yield call(apiUser.saveToken, data, token)
  } catch (error) {
    console.log(error)
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* loginWatcher () {
  let token = yield call(getAuthToken)

  while (true) {
    const data = yield take(LOGIN_REQUESTED)
    token = yield call(authorize, data.user)

    if (!token)
      continue

    let userSignedOut = false
    while(!userSignedOut) {
      const { signout } = yield race({
        signout: take(USER_UNSET)
      })

      if(signout) {
        userSignedOut = true
        yield call(logout)
      }
    }
  }
}

function* userWatcher() {
  yield all([
    takeLatest(USER_UPDATED, userUpdatedFlow),
    takeLatest(SAVE_TOKEN, saveTokenFlow),
    takeLatest(REGISTERED, registeredFlow),
    takeLatest(SEND_RECOVERY_EMAIL, sendRecoveryEmailFlow),
    takeLatest(UPDATE_PASSWORD, updatePasswordFlow),
    takeLatest(SAVE_IMAGE, saveImageFlow)
  ])
}

//=====================================
//  ROOT
//-------------------------------------

export const userSagas = [
  fork(loginWatcher),
  fork(userWatcher)
];
