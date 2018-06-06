import { connect } 		               from 'react-redux'
import Component 			               from '*/views/components/Message'
import { getMessages, setMessage }   from '*/core/message'
import { setNextStep }               from '*/core/match'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    messages: state.message,
    matches: state.match
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMessages: (id) => dispatch(getMessages(id)),
    setMessage: (message, id, user_id) => dispatch(setMessage(message, id, user_id)),
    setNextStep: (id) => dispatch(setNextStep(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
