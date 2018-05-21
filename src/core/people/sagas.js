import { all, takeLatest, fork, call, put, select } from 'redux-saga/effects'
import { PEOPLE_REQUESTED } from './constants'
import {
  getPeopleSuccess, getPeopleError,
} from './actions'
import { getAccessToken }                   from '*/core/user'
import api                                  from './api'
import { displaySuccess, displayError }     from '*/utils/toastr'
import NavigatorService                     from '*/utils/navigator'

function* peopleRequestedFlow(action) {
  try {
    const token = yield select(getAccessToken)
    const data = yield call(api.getPeople, token)
    console.log(data)
    yield put(getPeopleSuccess(data))

  } catch (error) {
    yield put(getPeopleError(error))
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* peopleWatcher() {
  yield all([
    takeLatest(PEOPLE_REQUESTED, peopleRequestedFlow)
  ])
}

//=====================================
//  ROOT
//-------------------------------------

export const peopleSagas = [
  fork(peopleWatcher),
]
