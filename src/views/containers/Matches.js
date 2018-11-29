import { connect } 		                    from 'react-redux'
import Component 			                    from '*/views/components/Matches'
import { getMatches, setCurrentMatch }    from '*/core/match'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    matches: state.match
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMatches: () => dispatch(getMatches()),
    setCurrentMatch: (id) => dispatch(setCurrentMatch(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
