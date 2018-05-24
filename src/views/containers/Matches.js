import { connect } 		 from 'react-redux'
import Component 			 from '*/views/components/Matches'
import { getMatches }   from '*/core/match'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    matches: state.match
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMatches: () => dispatch(getMatches())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
