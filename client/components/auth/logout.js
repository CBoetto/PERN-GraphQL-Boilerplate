import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {removeUser} from '../../store/user'
import {connect} from 'react-redux'

const mapStateToProps = state => {
    return {
        userStore: state.userStore
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeUser: () => dispatch(removeUser())
    }
}

const Logout = (props) => {

    const logout = () => {
        document.cookie = 'COOKIE=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        props.removeUser()
    }

    const LOGOUT_MUTATION = gql`
        mutation LogoutMutation {
            logout
        }
    `

    return (
        <div id='logout'>
            <div>{props.userStore.user ? props.userStore.user.userName : null}</div>
            <Mutation
                mutation={LOGOUT_MUTATION}
                onCompleted={() => logout()}
            >
                {mutation => (
                <div onClick={mutation}>
                    {'logout'}
                </div>
                )}
            </Mutation>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)