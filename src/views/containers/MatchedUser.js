import { connect } 		 from 'react-redux'
import Component 			 from '*/views/components/MatchedUser'
import { getPerson }   from '*/core/people'

const mapStateToProps = (state, ownProps) => {
  return {
    people: state.people
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPerson: (id) => dispatch(getPerson(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
