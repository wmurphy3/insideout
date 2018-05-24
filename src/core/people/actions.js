import {
  PEOPLE_REQUESTED, PEOPLE_REQUESTED_SUCCESS, PEOPLE_REQUESTED_ERROR,
} from './constants'

export const getPeople = (location) => ({
  type: PEOPLE_REQUESTED,
  location
})

export const getPeopleSuccess = (data) => ({
  type: PEOPLE_REQUESTED_SUCCESS,
  data
})

export const getPeopleError = (data) => ({
  type: PEOPLE_REQUESTED_ERROR,
  data
})
