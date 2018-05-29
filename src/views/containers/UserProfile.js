import { connect } 		 from 'react-redux'
import Component 			 from '*/views/components/UserProfile'

const mapStateToProps = (state, ownProps) => {
  return {
    people: state.people
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
