import { connect } 		 from 'react-redux'
import Component 			 from '*/views/components/Message'
import { getMessages, setMessage }   from '*/core/message'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    messages: state.message
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMessages: (id) => dispatch(getMessages(id)),
    setMessage: (message, id, user_id) => dispatch(setMessage(message, id, user_id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
