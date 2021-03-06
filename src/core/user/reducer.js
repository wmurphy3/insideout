import {
  USER_UPDATED, USER_UPDATED_SUCCESS, USER_UPDATED_ERROR,
  REGISTERED, REGISTERED_ERROR, LOGIN_REQUESTED, LOGIN_ERROR,
  SEND_RECOVERY_EMAIL, SEND_RECOVERY_EMAIL_ERROR,
  UPDATE_PASSWORD, UPDATE_PASSWORD_ERROR,
  USER_SET, USER_UNSET, USER_INFO_SET, USER_UNSET_TOUCH_ID,
  SAVE_IMAGE, SAVE_IMAGE_SUCCESS, SAVE_IMAGE_ERROR
} from './constants'

const initial = {
  loading: false,
  access_token: null,
  email: null,
  name: null,
  subscribed: null,
  id: null,
  description: null,
  age: null,
  favorite_movie: null,
  favorite_food: null,
  favorite_song: null,
  job_title: null,
  hobbies: null,
  school: null,
  social_media_link: null,
  gender: null,
  interests: null,
  allow_other: null,
  snap_chat_name: null,
  allow_male: null,
  allow_female: null,
  profile_picture: null
}

export const userReducer = (state = initial, action) => {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false
      }
    case USER_SET:
      return {
        ...state,
        loading: false,
        access_token: action.token.access_token,
        email: action.token.email,
        name: action.token.name,
        subscribed: action.token.subscribed,
        id: action.token.id,
        description: action.token.description,
        age: String(action.token.age),
        job_title: action.token.job_title,
        hobbies: action.token.hobbies,
        school: action.token.school,
        gender: action.token.gender,
        allow_other: action.token.allow_other,
        interests: action.token.interests,
        allow_male: action.token.allow_male,
        allow_female: action.token.allow_female,
        profile_picture: action.token.profile_picture
      }

    case USER_INFO_SET:
      return {
        ...state,
        login_username: action.username
      }

    case REGISTERED:
      return { ...state, loading: true }

    case REGISTERED_ERROR:
      return { ...state, error : action.error, loading: false }

    case USER_UPDATED:
      return { ...state, loading: true }

    case USER_UPDATED_SUCCESS:
      let user_data = action.data.data.attributes
      console.log(user_data)
      return {
        ...state,
        loading: false,
        email: user_data.email,
        name: user_data.name,
        description: user_data.description,
        age: String(user_data.age),
        job_title: user_data.job_title,
        school: user_data.school,
        gender: user_data.gender,
        allow_other: user_data.allow_other,
        allow_male: user_data.allow_male,
        interests: action.interests,
        allow_female: user_data.allow_female
      }

    case USER_UPDATED_ERROR:
      return { ...state, error : action.error, loading: false }

    case SEND_RECOVERY_EMAIL:
      return { ...state, loading: false }

    case SEND_RECOVERY_EMAIL_ERROR:
      return  { ...state, error: action.data }

    case UPDATE_PASSWORD:
      return { ...state, loading: false }

    case UPDATE_PASSWORD_ERROR:
      return  { ...state, error: action.data }

    case SAVE_IMAGE:
      return { ...state, loading: true }

    case SAVE_IMAGE_SUCCESS:
      let user_d = action.data.data.attributes

      return {
        ...state,
        loading: false,
        profile_picture: user_d.profile_picture
      }

    case SAVE_IMAGE_ERROR:
      return { ...state, error : action.error, loading: false }

    default:
      return state
  }
}
