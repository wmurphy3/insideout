import { connect }          from 'react-redux'
import Component            from '*/views/components/Profile'
import { saveImage }        from '*/core/user'

const mapStateToProps = (state, ownProps) => {

  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveImage: (data) => dispatch(saveImage(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
