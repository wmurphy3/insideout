import { all, takeLatest, fork, call, put, select } from 'redux-saga/effects'
import {
  matchCreateSuccess, matchCreateError, getMatchesSuccess, getMatchesError
} from './actions'
import {
  MATCH_CREATED, MATCHES_REQUESTED, MATCHES_REQUESTED_SUCCESS,
  MATCHES_REQUESTED_ERROR
} from './constants'
import { getAccessToken }                   from '*/core/user'
import api                                  from './api'
import NavigatorService                     from '*/utils/navigator'

function* matchesRequestedFlow(action) {
  try {
    const token = yield select(getAccessToken)
    const data = yield call(api.getMatches, token)
    yield put(getMatchesSuccess(data))

  } catch (error) {
    yield put(getMatchesError(error))
  }
}

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

//=====================================
//  WATCHERS
//-------------------------------------

function* matchWatcher() {
  yield all([
    takeLatest(MATCH_CREATED, matchCreatedFlow),
    takeLatest(MATCHES_REQUESTED, matchesRequestedFlow)
  ])
}

//=====================================
//  ROOT
//-------------------------------------

export const matchSagas = [
  fork(matchWatcher),
];
