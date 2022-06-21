import React, { Component } from 'react';
import { doLogout } from '../../../services/userService'

class Logout extends Component {

    componentDidMount() {
        doLogout('/')

    }

    render() { 
        return null
    }
}
 
export default Logout;