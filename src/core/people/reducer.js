import {
  PEOPLE_REQUESTED, PEOPLE_REQUESTED_SUCCESS, PEOPLE_REQUESTED_ERROR,
  PERSON_REQUESTED, PERSON_REQUESTED_SUCCESS, PERSON_REQUESTED_ERROR
} from './constants'
import { cloneDeep } from 'lodash'

const initial = {
  data: [],
  person: {},
  loading: false,
}

export const peopleReducer = (state = initial, action) => {
  switch (action.type) {

    case PEOPLE_REQUESTED:
      return { ...state, loading: true }

    case PEOPLE_REQUESTED_SUCCESS:
      let action_data = action.data.data.map((e) => {
        let ret = {...e,...e.attributes}
        delete ret.attributes
        return ret
      })

      return {
        ...state,
        loading: false,
        data: action_data,
      }

    case PEOPLE_REQUESTED_ERROR:
      return { ...state, error: action.data, loading: false }

    case PERSON_REQUESTED:
      return { ...state, loading: true }

    case PERSON_REQUESTED_SUCCESS:
      let d = action.data.data.attributes
      return {
        ...state,
        loading: false,
        person: d
      }

    case PERSON_REQUESTED_ERROR:
      return { ...state, error: action.data, loading: false }

    default:
      return state
  }
}
