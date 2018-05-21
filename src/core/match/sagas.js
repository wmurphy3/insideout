import { all, takeLatest, fork, call, put, select } from 'redux-saga/effects'
import {
  matchCreateSuccess, matchCreateError,
} from './actions'
import {
  MATCH_CREATED, MATCH_DECLINE_CREATED
} from './constants'
import { getAccessToken }                   from '*/core/user'
import api                                  from './api'
import NavigatorService                     from '*/utils/navigator'

function* matchCreatedFlow(action) {
  try {
    const { user_id } = action
    const token = yield select(getAccessToken)
    const match = yield call(api.createMatch, token, user_id)

    yield put(matchCreateSuccess(match))

  } catch (error) {
    yield put(matchCreateError(error))
  }
}

function* matchDeclineCreatedFlow(action) {
  try {
    const { user_id } = action
    const token = yield select(getAccessToken)
    const match = yield call(api.declineMatch, token, user_id)

    yield put(matchCreateSuccess(match))

  } catch (error) {
    yield put(matchCreateError(error))
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* matchWatcher() {
  yield all([
    takeLatest(MATCH_CREATED, matchCreatedFlow),
    takeLatest(MATCH_DECLINE_CREATED, matchDeclineCreatedFlow)
  ])
}

//=====================================
//  ROOT
//-------------------------------------

export const matchSagas = [
  fork(matchWatcher),
];
