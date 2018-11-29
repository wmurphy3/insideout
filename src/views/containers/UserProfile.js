import { connect } 		 from 'react-redux'
import Component 			 from '*/views/components/UserProfile'
import { reportUser }  from '*/core/people'
import { createMatch } from '*/core/match'

const mapStateToProps = (state, ownProps) => {
  return {
    people: state.people,
    laoding: state.match.loading
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    reportUser: (id, reason) => dispatch(reportUser(id, reason)),
    createMatch: (user_id) => dispatch(createMatch(user_id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
