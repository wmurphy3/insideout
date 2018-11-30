import { all, takeLatest, fork, call, put, select }             from 'redux-saga/effects'
import { PEOPLE_REQUESTED, PERSON_REQUESTED, PERSON_REPORTED }  from './constants'
import {
  getPeopleSuccess, getPeopleError, getPersonSuccess, getPersonError,
  reportUserSuccess, reportUserError
} from './actions'
import { getAccessToken }                   from '*/core/user'
import api                                  from './api'
import { displaySuccess, displayError }     from '*/utils/toastr'
import NavigatorService                     from '*/utils/navigator'

function* peopleRequestedFlow(action) {
  try {
    const { location, query } = action
    const token = yield select(getAccessToken)
    const data = yield call(api.getPeople, token, location, query)
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
    yield put(getPersonSuccess(data))

  } catch (error) {
    console.log(error)
    yield put(getPersonError(error))
  }
}

function* personReportedFlow(action) {
  try {
    const { id, reason } = action
    const token = yield select(getAccessToken)
    const data = yield call(api.reportUser, token, id, reason)

    yield put(reportUserSuccess(id))
    NavigatorService.navigate('drawerStack')
    displaySuccess('User reported. Should be resolved within 24 hours.')
  } catch (error) {
    console.log(error)
    yield put(reportUserError('Could not report user at this time.'))
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

function* peopleWatcher() {
  yield all([
    takeLatest(PEOPLE_REQUESTED, peopleRequestedFlow),
    takeLatest(PERSON_REQUESTED, personRequestedFlow),
    takeLatest(PERSON_REPORTED, personReportedFlow)
  ])
}

//=====================================
//  ROOT
//-------------------------------------

export const peopleSagas = [
  fork(peopleWatcher),
]
