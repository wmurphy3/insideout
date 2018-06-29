import { connect } 		 from 'react-redux'
import Component 			 from '*/views/components/UserProfile'
import { reportUser }  from '*/core/people'

const mapStateToProps = (state, ownProps) => {
  return {
    people: state.people
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    reportUser: (id, reason) => dispatch(reportUser(id, reason))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
