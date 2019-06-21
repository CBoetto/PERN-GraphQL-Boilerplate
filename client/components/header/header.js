import React from 'react'
import Auth from '../auth/auth.js'


const Header = () => {

    return (
        <div id='header'>
            <p>PERN + GraphQL/Apollo Boilerplate</p>
            <Auth />
        </div>
    )

}

export default Header