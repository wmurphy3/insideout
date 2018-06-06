import {
  PEOPLE_REQUESTED, PEOPLE_REQUESTED_SUCCESS, PEOPLE_REQUESTED_ERROR,
  PERSON_REQUESTED, PERSON_REQUESTED_SUCCESS, PERSON_REQUESTED_ERROR
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

export const getPerson = (id) => ({
  type: PERSON_REQUESTED,
  id
})

export const getPersonSuccess = (data) => ({
  type: PERSON_REQUESTED_SUCCESS,
  data
})

export const getPersonError = (data) => ({
  type: PERSON_REQUESTED_ERROR,
  data
})
