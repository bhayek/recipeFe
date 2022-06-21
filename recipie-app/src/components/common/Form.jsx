import React, { Component } from 'react';
import Input from './Input';
import InputLeftLabel from './InputLeftLabel';
import Select from './Select';
import Joi from 'joi-browser';

class Form extends Component {
    state = { 
        data: {},
        errors: {}
     } 

    validate = () => {
        const options = { abortEarly: false}
        const { error } = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name]}
        const { error } = Joi.validate(obj, schema)
        return error ? error.details[0].message : null;
    };

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit()
    };

    handleChange = ({ currentTarget: input }) => {
        const errors = {...this.state.errors}
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data}
        data[input.name] = input.value;
        this.setState({ data, errors })
    }

    renderInput(name, label, type = 'text', helpText ='') {
        const { data, errors } = this.state
        return <Input 
        name={name} 
        label={label}
        type={type}
        value={data[name]} 
        onChange={this.handleChange} 
        helpText={helpText}
        error={errors[name]} 
    />
    }

    renderInputLeftLabel(
        name, 
        label, 
        type = 'text', 
        value = '',
        helpText ='', 
        error='', 
        order = 1) {
        const { data, errors } = this.state
        return <InputLeftLabel 
        name={name} 
        order={order}
        label={label}
        type={type}
        value={data[name]} 
        onChange={this.handleChange} 
        helpText={helpText}
        error={errors[name]} 
    />
    }

    renderSelect(name, label, helpText ='', options = {}) {
        const { data, errors } = this.state
        return <Select
        name={name} 
        label={label}
        value={data[name]}
        onChange={this.handleChange} 
        options={options}
        helpText={helpText}
        error={errors[name]} 
        />
    }

    renderButton(label,color) {
        return  <button 
            className={`btn btn-${color}`}>
            {label}
    </button>
    }

    renderSubmitButton(label,color) {
        return  <button 
            disabled={this.validate()}
            type="submit" 
            className={`btn btn-${color}`}>
            {label}
    </button>
    }

}
 
export default Form;