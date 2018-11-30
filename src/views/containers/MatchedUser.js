import { connect } 		               from 'react-redux'
import Component 			               from '*/views/components/MatchedUser'
import { getPerson, reportUser }     from '*/core/people'

const mapStateToProps = (state, ownProps) => {
  return {
    people: state.people,
    current_match: state.match.current_match
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPerson: (id) => dispatch(getPerson(id)),
    reportUser: (id, reason) => dispatch(reportUser(id, reason)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
