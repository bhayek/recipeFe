import React, { Component } from 'react';

class User extends Component {
    state = {  } 
    render() { 
        return (
            <div>
                <h1>{this.props.firstName}</h1>
            </div>
        );
    }
}
 
export default User;