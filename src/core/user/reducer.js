import {
  USER_UPDATED, USER_UPDATED_SUCCESS, USER_UPDATED_ERROR,
  REGISTERED, REGISTERED_ERROR,
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
  allow_other: null,
  snap_chat_name: null,
  allow_male: null,
  allow_female: null,
  profile_picture: null
}

export const userReducer = (state = initial, action) => {
  switch (action.type) {
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
        favorite_movie: action.token.favorite_movie,
        favorite_food: action.token.favorite_food,
        favorite_song: action.token.favorite_song,
        job_title: action.token.job_title,
        hobbies: action.token.hobbies,
        school: action.token.school,
        social_media_link: action.token.social_media_link,
        gender: action.token.gender,
        allow_other: action.token.allow_other,
        snap_chat_name: action.token.snap_chat_name,
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

      return {
        ...state,
        loading: false,
        email: user_data.email,
        name: user_data.name,
        description: user_data.description,
        age: String(user_data.age),
        favorite_movie: user_data.favorite_movie,
        favorite_food: user_data.favorite_food,
        favorite_song: user_data.favorite_song,
        job_title: user_data.job_title,
        hobbies: user_data.hobbies,
        school: user_data.school,
        social_media_link: user_data.social_media_link,
        gender: user_data.gender,
        allow_other: user_data.allow_other,
        snap_chat_name: user_data.snap_chat_name,
        allow_male: user_data.allow_male,
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
