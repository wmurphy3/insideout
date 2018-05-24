import {
  MESSAGE_REQUESTED, MESSAGE_REQUESTED_SUCCESS, MESSAGE_REQUESTED_ERROR,
  MESSAGE_CREATED, MESSAGE_CREATED_SUCCESS, MESSAGE_CREATED_ERROR
} from './constants'

export const getMessages = (id) => ({
  type: MESSAGE_REQUESTED,
  id
})

export const getMessagesSuccess = (data) => ({
  type: MESSAGE_REQUESTED_SUCCESS,
  data
})

export const getMessagesError = (data) => ({
  type: MESSAGE_REQUESTED_ERROR,
  data
})

export const setMessage = (message, id) => ({
  type: MESSAGE_CREATED,
  message: message,
  id: id
})

export const messageCreateSuccess = (data) => ({
  type: MESSAGE_CREATED_SUCCESS,
  data
})

export const messageCreateError = (error) => ({
  type: MESSAGE_CREATED_ERROR,
  error
})
