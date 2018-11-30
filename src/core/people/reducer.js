import {
  PEOPLE_REQUESTED, PEOPLE_REQUESTED_SUCCESS, PEOPLE_REQUESTED_ERROR,
  PERSON_REQUESTED, PERSON_REQUESTED_SUCCESS, PERSON_REQUESTED_ERROR,
  PERSON_REPORTED, PERSON_REPORTED_SUCCESS, PERSON_REPORTED_ERROR
} from './constants'
import { cloneDeep, findIndex } from 'lodash'

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
        meta: action.data.meta
      }

    case PEOPLE_REQUESTED_ERROR:
      return { ...state, error: action.data, loading: false }

    case PERSON_REQUESTED:
      return { ...state, loading: true }

    case PERSON_REQUESTED_SUCCESS:
      return {
        ...state,
        loading: false,
        person: action.data.data.attributes
      }

    case PERSON_REQUESTED_ERROR:
      return { ...state, error: action.data, loading: false }

    case PERSON_REPORTED:
      return { ...state, loading: true }

    case PERSON_REPORTED_SUCCESS:
      let index = findIndex(state.data, (o) => o.id === action.id)

      return {
        ...state,
        loading: false,
        data: [
          ...state.data.slice(0, index),
          ...state.data.slice(index + 1)
        ]
      }

    case PERSON_REPORTED_ERROR:
      return { ...state, error: action.data, loading: false }

    default:
      return state
  }
}
