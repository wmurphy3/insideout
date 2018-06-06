import {
  MATCH_CREATED, MATCH_CREATED_SUCCESS, MATCH_CREATED_ERROR,
  MATCHES_REQUESTED, MATCHES_REQUESTED_SUCCESS, MATCHES_REQUESTED_ERROR,
  MATCH_NEXT_STEP, MATCH_NEXT_STEP_SUCCESS, MATCH_NEXT_STEP_ERROR
} from './constants'

export const getMatches = () => ({
  type: MATCHES_REQUESTED
})

export const getMatchesSuccess = (data) => ({
  type: MATCHES_REQUESTED_SUCCESS,
  data
})

export const getMatchesError = (data) => ({
  type: MATCHES_REQUESTED_ERROR,
  data
})

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

export const setNextStep = (id) => ({
  type: MATCH_NEXT_STEP,
  id
})

export const setNextStepSuccess = (id) => ({
  type: MATCH_NEXT_STEP_SUCCESS,
  data
})

export const setNextStepError = (error) => ({
  type: MATCH_NEXT_STEP_ERROR,
  error
})
