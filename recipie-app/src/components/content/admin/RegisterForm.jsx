import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from '../../common/Form';
import * as userService from '../../../services/userService';
import * as lookupService from '../../../services/lookupService';
import axios from 'axios'

class RegisterForm extends Form {
    // constructor(){
    //     this.state = 
    // }
    state = { 
        data:{
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            gender: [],
        },
        errors: {},
        genders: {},
        genderArray: []
    } 

    schema = {
        email: Joi.string()
            .required()
            .label('Email'),
        password: Joi.string()
            .required()
            .min(2)
            .label('Password'),
        firstName: Joi.string()
            .required()
            .max(20)
            .label('First Name'),
        lastName: Joi.string()
            .required()
            .max(20)
            .label('Last Name'),
        gender: Joi.string()
            .required()
            .label('Gender: M, F or O')
    }

    doSubmit = async () => {
        const { data } = this.state;
        await userService.register(data)
        await userService.login(data)

    }

    componentDidMount() {
        axios.get('/api/lookup/genders')
        .then(res => {
            const genderArray = []
            res.data.data.map(gender => {
                genderArray.push({label: gender.gender, value: gender.id})
            })
            this.setState({ genders: res.data.data, genderArray });
        })        
    }

    render() { 
        // console.log('state: ', this.state.genderArray);
        const { genderArray } = this.state
        return (
            <div>
                <div className="container">
                    <h1>Register Form</h1>

                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput('email','Email Address','email',"We'll never share your email.")}
                        {this.renderInput('password','Password','password')} 
                        {this.renderInput('firstName','First Name')} 
                        {this.renderInput('lastName','Last Name')} 
                        {/* {this.renderInput('gender','Gender')} */}
                        {this.renderSelect(
                            'gender',
                            'Gender',
                            'Gender: Male, Female, Other',
                            genderArray
                        )} 
                        {this.renderButton('Register','primary')}
                    </form>
                </div>
            </div>
        );
    }
}
 
export default RegisterForm;