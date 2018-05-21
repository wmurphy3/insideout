import { findIndex } from 'lodash'
import {
  MATCH_CREATED, MATCH_CREATED_SUCCESS, MATCH_CREATED_ERROR,
  MATCH_DECLINE_CREATED
} from './constants'

const initial = {
  data: [],
  loading: false,
}

export const matchReducer = (state = initial, action) => {

  switch (action.type) {

    case MATCH_CREATED:
      return { ...state, loading: true }

    case MATCH_DECLINE_CREATED:
      return { ...state, loading: true }

    case MATCH_CREATED_SUCCESS:

      return { ...state, loading: false }

    case MATCH_CREATED_ERROR:
      return { ...state, error : action.error, loading: false }

    default:
      return state
  }
}
