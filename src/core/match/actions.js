import {
  MATCH_CREATED, MATCH_CREATED_SUCCESS, MATCH_CREATED_ERROR,
  MATCH_DECLINE_CREATED
} from './constants'

export const createMatch = (user_id) => ({
  type: MATCH_CREATED,
  user_id: user_id
})

export const matchCreateSuccess = (data) => ({
  type: MATCH_CREATED_SUCCESS,
  data
})

export const matchCreateError = (error) => ({
  type: MATCH_CREATED_ERROR,
  error
})

export const declineMatch = (user_id) => ({
  type: MATCH_DECLINE_CREATED,
  user_id: user_id
})
