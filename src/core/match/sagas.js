import { all, takeLatest, fork, call, put, select } from 'redux-saga/effects'
import {
  matchCreateSuccess, matchCreateError, getMatchesSuccess, getMatchesError,
  setNextStepSuccess, setNextStepError, blockMatchSuccess, setCurrentMatchSuccess
} from './actions'
import {
  MATCH_CREATED, MATCHES_REQUESTED, MATCHES_REQUESTED_SUCCESS,
  MATCHES_REQUESTED_ERROR, MATCH_NEXT_STEP, MATCH_BLOCK, SET_CURRENT_MATCH
} from './constants'
import { getAccessToken }                   from '*/core/user'
import api                                  from './api'
import NavigatorService                     from '*/utils/navigator'
import { displaySuccess, displayError }     from '*/utils/toastr'

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
    NavigatorService.navigate('MessageStack')
    displaySuccess('Connection made. Make the first move and send them a message!')
  } catch (error) {
    yield put(matchCreateError(error))
  }
}

function* matchNextStepFlow(action) {
  try {
    const { id } = action
    const token = yield select(getAccessToken)
    const match = yield call(api.setNextStep, token, id)

    yield put(setNextStepSuccess(match))
    displaySuccess('Waiting on both of you to click this button before moving on.')
  } catch (error) {
    yield put(setNextStepError(error))
  }
}

function* blockMatchFlow(action) {
  try {
    const { id } = action
    const token = yield select(getAccessToken)
    const match = yield call(api.blockMatch, token, id)

    yield put(blockMatchSuccess(match))
    displaySuccess('User has been blocked')
  } catch (error) {
    displayError('Could not block user, please try again.')
  }
}

function* setCurrentMatchFlow(action) {
  try {
    const { id } = action
    yield put(setCurrentMatchSuccess(id))
    NavigatorService.navigate('MessageStack')
  } catch (error) {
    displayError('Could not message user at this time')
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* matchWatcher() {
  yield all([
    takeLatest(MATCH_CREATED, matchCreatedFlow),
    takeLatest(MATCHES_REQUESTED, matchesRequestedFlow),
    takeLatest(MATCH_NEXT_STEP, matchNextStepFlow),
    takeLatest(MATCH_BLOCK, blockMatchFlow),
    takeLatest(SET_CURRENT_MATCH, setCurrentMatchFlow)
  ])
}

//=====================================
//  ROOT
//-------------------------------------

export const matchSagas = [
  fork(matchWatcher),
];
