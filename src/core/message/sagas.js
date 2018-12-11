import { all, takeLatest, fork, call, put, select } from 'redux-saga/effects'
import { MESSAGE_REQUESTED, MESSAGE_CREATED } from './constants'
import {
  getMessagesError, getMessagesSuccess,
  messageCreateSuccess, messageCreateError
} from './actions'
import { getAccessToken }                   from '*/core/user'
import api                                  from './api'
import { displaySuccess, displayError }     from '*/utils/toastr'
import NavigatorService                     from '*/utils/navigator'

function* messageRequestedFlow(action) {
  try {
    const { id } = action
    const token = yield select(getAccessToken)
    const data = yield call(api.getMessages, token, id)
    yield put(getMessagesSuccess(data))

  } catch (error) {
    yield put(getMessagesError(error))
  }
}

function* messageCreatedFlow(action) {
  try {
    const { message, id, user_id } = action
    const token = yield select(getAccessToken)
    const match = yield call(api.setMessage, token, message, id, user_id)

    yield put(messageCreateSuccess(match))

  } catch (error) {
    console.log(error)
    yield put(messageCreateError(error))
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* messageWatcher() {
  yield all([
    takeLatest(MESSAGE_REQUESTED, messageRequestedFlow),
    takeLatest(MESSAGE_CREATED, messageCreatedFlow)
  ])
}

//=====================================
//  ROOT
//-------------------------------------

export const messageSagas = [
  fork(messageWatcher),
]
