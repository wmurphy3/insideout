import { connect } 		             from 'react-redux'
import Component 			             from '*/views/components/Dashboard'
import { saveToken }               from '*/core/user'
import { getPeople }               from '*/core/people'
import { createMatch }             from '*/core/match'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    people: state.people
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPeople: (location, query) => dispatch(getPeople(location, query)),
    createMatch: (user_id) => dispatch(createMatch(user_id)),
    saveToken: (token) => dispatch(saveToken(token))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
