import { connect } 		 from 'react-redux'
import Component 			 from '*/views/components/Dashboard'
import { saveToken }   from '*/core/user'
import { getPeople }   from '*/core/people'
import { createMatch, declineMatch } from '*/core/match'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    people: state.people
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPeople: () => dispatch(getPeople()),
    createMatch: (user_id) => dispatch(createMatch(user_id)),
    declineMatch: (user_id) => dispatch(declineMatch(user_id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
