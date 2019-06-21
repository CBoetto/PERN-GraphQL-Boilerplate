import React, {useState, useEffect} from 'react';
import {setUser, removeUser} from '../../store/user'
import {connect} from 'react-redux'

import Register from './register'
import Login from './login'
import Logout from './logout'

const mapStateToProps = state => {
    return {
        userStore: state.userStore
    }
}

const Auth = (props) => {

    // Use state to toggle between the log in and register forms.

    const [register, setRegister] = useState(false)

    const toggleRegister = () => {
        setRegister(!register)
    }

    console.log('props on auth component', props)

    return (
            <div id='auth'>
                {props.userStore.user ?
                    <Logout />
                    :
                    <>
                        {register ? 
                            <div id='register'>
                            <Register />
                            <div onClick={toggleRegister}>Already a member?  Log in here.</div>
                            </div>
                            :
                            <div id='login'>
                            <Login />
                            <div onClick={toggleRegister}>Not a member?  Register here.</div>
                            </div>
                        }
                </>
                }
            </div>
    )
}

export default connect(mapStateToProps, null)(Auth)