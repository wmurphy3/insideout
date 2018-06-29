import { findIndex } from 'lodash'
import {
  MATCH_CREATED, MATCH_CREATED_SUCCESS, MATCH_CREATED_ERROR,
  MATCHES_REQUESTED, MATCHES_REQUESTED_SUCCESS,
  MATCHES_REQUESTED_ERROR, MATCH_NEXT_STEP, MATCH_NEXT_STEP_SUCCESS,
  MATCH_NEXT_STEP_ERROR, MATCH_BLOCK, MATCH_BLOCK_SUCCESS
} from './constants'

const initial = {
  data: [],
  loading: false,
}

export const matchReducer = (state = initial, action) => {

  switch (action.type) {
    case MATCHES_REQUESTED:
      return { ...state, loading: true }

    case MATCHES_REQUESTED_SUCCESS:
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

    case MATCHES_REQUESTED_ERROR:
      return { ...state, error : action.error, loading: false }

    case MATCH_CREATED:
      return { ...state, loading: false }

    case MATCH_CREATED_SUCCESS:
      return { ...state, loading: false }

    case MATCH_CREATED_ERROR:
      return { ...state, error : action.error, loading: false }

    case MATCH_NEXT_STEP:
      return { ...state, loading: false }

    case MATCH_NEXT_STEP_SUCCESS:
      return { ...state, loading: false }

    case MATCH_NEXT_STEP_ERROR:
      return { ...state, error : action.error, loading: false }

    case MATCH_BLOCK:
      return { ...state, loading: true }

    case MATCH_BLOCK_SUCCESS:
      index = findIndex(state.data, (o) => o.id === action.id)

      return {
        ...state,
        data: [
          ...state.data.slice(0, index),
          ...state.data.slice(index + 1)
        ]
      }

    default:
      return state
  }
}
