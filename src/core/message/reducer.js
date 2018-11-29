import {
  MESSAGE_REQUESTED, MESSAGE_REQUESTED_SUCCESS, MESSAGE_REQUESTED_ERROR,
  MESSAGE_CREATED, MESSAGE_CREATED_SUCCESS, MESSAGE_CREATED_ERROR
} from './constants'
import { cloneDeep } from 'lodash'

const initial = {
  data: [],
  loading: false,
}

export const messageReducer = (state = initial, action) => {
  switch (action.type) {

    case MESSAGE_REQUESTED:
      return { ...state, loading: true }

    case MESSAGE_REQUESTED_SUCCESS:
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

    case MESSAGE_REQUESTED_ERROR:
      return { ...state, error: action.data, loading: false }

    case MESSAGE_CREATED:
      return { ...state, loading: true }

    case MESSAGE_CREATED_SUCCESS:
      let actiondata = {...action.data.data, ...action.data.data.attributes},
        found = false,
        newData

      delete actiondata.attributes

      for (var i = 0; i < state.data.length; i++) {
        if (state.data[i].id === action.data.id) {
          found = true
          index = i
        }
      }

      if (found) {
        newData = [
          ...state.data.slice(0, index),
          actiondata,
          ...state.data.slice(index + 1)
        ]
      }
      else {
        newData = [actiondata].concat(state.data)
      }

      return { ...state, data: newData, loading: false }

    case MESSAGE_CREATED_ERROR:
      return { ...state, error: action.data, loading: false }

    default:
      return state
  }
}
