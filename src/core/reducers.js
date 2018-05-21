import { combineReducers }                             from 'redux'
import { userReducer }                                 from './user'
import { peopleReducer }                               from './people'
import { matchReducer }                                from './match'
import { reducer as formReducer }                      from 'redux-form'

function lastAction(state = null, action) {
  return action
}

export default combineReducers({
  user: userReducer,
  form: formReducer,
  match: matchReducer,
  people: peopleReducer
})
