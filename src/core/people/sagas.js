import { all, takeLatest, fork, call, put, select } from 'redux-saga/effects'
import { PEOPLE_REQUESTED, PERSON_REQUESTED } from './constants'
import {
  getPeopleSuccess, getPeopleError, getPersonSuccess, getPersonError
} from './actions'
import { getAccessToken }                   from '*/core/user'
import api                                  from './api'
import { displaySuccess, displayError }     from '*/utils/toastr'
import NavigatorService                     from '*/utils/navigator'

function* peopleRequestedFlow(action) {
  try {
    const { location } = action
    const token = yield select(getAccessToken)
    const data = yield call(api.getPeople, token, location)
    yield put(getPeopleSuccess(data))

  } catch (error) {
    yield put(getPeopleError(error))
  }
}

function* personRequestedFlow(action) {
  try {
    const { id } = action
    const token = yield select(getAccessToken)
    const data = yield call(api.getPerson, token, id)
    console.log(data)
    yield put(getPersonSuccess(data))

  } catch (error) {
    console.log(error)
    yield put(getPersonError(error))
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* peopleWatcher() {
  yield all([
    takeLatest(PEOPLE_REQUESTED, peopleRequestedFlow),
    takeLatest(PERSON_REQUESTED, personRequestedFlow)
  ])
}

//=====================================
//  ROOT
//-------------------------------------

export const peopleSagas = [
  fork(peopleWatcher),
]
