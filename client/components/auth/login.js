import React, {useState, useEffect} from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {setUser} from '../../store/user'
import {connect} from 'react-redux'

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: user => dispatch(setUser(user)),
    }
}

const Login = (props) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');


    // Once the login mutation is completed, we run this function

    const confirmLogin = (data) => {
        props.setUser({
            userName: data.login.userName,
            points: 'set points here'
        })
    }


    // This is the mutation we send to the GraphQL server.

    const LOGIN_MUTATION = gql`
        mutation LoginMutation($userName: String!, $password: String!) {
            login(userName: $userName, password: $password) {
                userName
            }
        }
    `

    return (
        <>
            <form id='loginForm'>
                <input
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    type='text'
                    placeholder='Username'
                />
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type='text'
                    placeholder='Password'
                />
                <Mutation
                    mutation={LOGIN_MUTATION}
                    variables={{ userName, password }}
                    onCompleted={data => confirmLogin(data)}
                >
                    {mutation => (
                    <div onClick={mutation}>
                        {'login'}
                    </div>
                    )}
                </Mutation>
            </form>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)