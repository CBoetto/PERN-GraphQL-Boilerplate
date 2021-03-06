import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'

/**
 * COMPONENT
 */
const Routes = (props) => {

  return (

        <Switch>
          {/* Routes placed here are available to all visitors */}

              {/* Routes placed here are only available after logging in */}        

          {/* Displays our Login component as a fallback */}
        </Switch>

  )
}




/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.userStore.user
  }
}

const mapDispatch = dispatch => {
  return {
    // loadInitialData() {
    //   dispatch(me())
    // }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
// Routes.propTypes = {
//   loadInitialData: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
