import { all }                   from 'redux-saga/effects'
import { userSagas }             from './user'
import { peopleSagas }           from './people'
import { matchSagas }            from './match'

export default function* sagas() {
  yield all([
    ...userSagas,
    ...matchSagas,
    ...peopleSagas
  ]);
}
