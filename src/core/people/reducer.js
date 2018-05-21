import {
  PEOPLE_REQUESTED, PEOPLE_REQUESTED_SUCCESS, PEOPLE_REQUESTED_ERROR,
} from './constants'
import { cloneDeep } from 'lodash'

const initial = {
  data: [],
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

    default:
      return state
  }
}
