import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from '../../common/Form'
import * as userService from '../../../services/userService';

class LoginForm extends Form {
    state = { 
        data: {
            email: '',
            password: ''
        },
        errors: {}
    }

    schema = {
        email: Joi.string()
            .required()
            .label('Email'),
        password: Joi.string()
            .required()
            .label('Password')
    }

    doSubmit = async () => {
        const { data } = this.state;
        const resp = await userService.login(data,'/')
    }

    render() { 
        return (
            <div>
                <div className="container">
                    <h1>Login Form</h1>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput('email','Email Address','email',"We'll never share your email.")}
                        {this.renderInput('password','Password','password')} 
                        {this.renderButton('Login','primary')}
                    </form>
                </div>
            </div>
        );
    }
}
 
export default LoginForm;