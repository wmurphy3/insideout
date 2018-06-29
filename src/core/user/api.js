import { Platform }                                     from 'react-native'
import { REACT_APP_API_URL, REACT_APP_AUTH_URL }        from 'react-native-dotenv'
import {getResponseData, getRegisterFormData,
  getResponseDelete,
        buildBody, getPasswordFormData, imageData}      from '*/core/api/helpers'

const ENDPOINT = `${REACT_APP_API_URL}/users`;
const AUTH_ENDPOINT = `${REACT_APP_AUTH_URL}/oauth/token`
const PUSH_ENDPOINT = `${REACT_APP_API_URL}/mobile_tokens`

export default {

  login: (user) => {
    return fetch(AUTH_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        grant_type: 'password',
        email: user.username,
        password: user.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => getResponseData(resp))
  },

  register: (user) => {
    return fetch(ENDPOINT, {
      method: 'POST',
      body: buildBody('user', user),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => getResponseData(resp))
  },

  userUpdate: (token, user, id) => {
    return fetch(`${ENDPOINT}/${id}`, {
      method: 'PATCH',
      body: buildBody("user", user),
      headers: {
        Authorization: `Bearer ${token || undefined}`,
        'Content-Type': 'application/json'
      }
    }).then(resp => getResponseData(resp))
  },

  saveImage: (token, image) => {
    return fetch(`${ENDPOINT}/save_image`, {
      method: 'PATCH',
      body: imageData(image),
      headers: {
        Authorization: `Bearer ${token || undefined}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then(resp => getResponseData(resp))
  },

  saveToken: (access_token, token) => {
    return fetch(PUSH_ENDPOINT, {
      method: 'POST',
      body: buildBody('mobile_token', {'token': access_token, 'platform': Platform.OS}),
      headers: {
        Authorization: `Bearer ${token || undefined}`,
        'Content-Type': 'application/json'
      }
    }).then((resp) => {
      return {"done": true}
    })
  },

  sendRecoveryEmail: (email) => {
    return fetch(`${ENDPOINT}/send_recovery_email`, {
      method: 'POST',
      body: JSON.stringify( {
        email: email.email
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => getResponseData(resp))
  }

}
