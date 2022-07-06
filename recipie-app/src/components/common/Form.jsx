import React, { Component } from 'react';
import Input from './Input';
import InputLeftLabel from './InputLeftLabel';
import Textarea from './Textarea';
import Select from './Select';
import Joi from 'joi-browser';

class Form extends Component {
    constructor (props) {
        super(props)
        this.state = { 
            data: {ingForm2:[{ingredients:[]}]},
            errors: {}
         } 
    }



    componentDidMount() {
        console.log('cdm - FORM DID MOUNT')
    }

    handleFormState (data) {
        this.setState({data})
    }

    // handleFormState (name,data) {
    //     this.setState({[name]:data})
    // }

    validate = () => {
        const options = { abortEarly: false}
        const { error } = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        // return errors;
        return null // overrides all form validation
    };

    validateProperty = ({ name, value }) => {
        // const obj = { [name]: value };
        // const schema = { [name]: this.schema[name]}
        // const { error } = Joi.validate(obj, schema)
        // return error ? error.details[0].message : null;
    };
    // validateProperty = ({ name, value }, catIndex,fieldIndex) => {
    //     console.log('catIndex', catIndex, 'fieldIndex', fieldIndex)
    //     if(typeof fieldIndex !== 'string') {
    //         // console.log(typeof fieldIndex);
    //         // console.log('validateProperty field ',name, fieldIndex )
    //         return null
    //     } else if(typeof catIndex !== 'string'){
    //         // console.log(typeof catIndex);
    //         // console.log('validateProperty cat', name, catIndex, fieldIndex )
    //         return null
    //     } else {
    //        console.log('top fields') 
    //        const obj = { [name]: value };
    //        const schema = { [name]: this.schema[name]}
    //        const { error } = Joi.validate(obj, schema)
    //        return error ? error.details[0].message : null;
    //     }
    // };

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit()
    };

    
    renderTextarea(
        name, 
        label, 
        type = 'text', 
        value,
        helpText ='', 
        error='', 
        order,
        catIndex,
        fieldIndex,
        hasPrefixLabel
        ) {
        const { data, errors } = this.state


            return <Textarea 
            name={name} 
            order={order}
            label={label}
            type={type}
            value={data[name] || value} 
            //value={this.getValue(name,value,catIndex,fieldIndex) || value}
            //value={this.getValue(data,name,catIndex,fieldIndex,type,value)} 
            onChange={event => this.handleChange(event, catIndex,fieldIndex)} 
            helpText={helpText}
            // error={errors[name]}
            catIndex={catIndex}
            fieldIndex={fieldIndex} 
            hasPrefixLabel={hasPrefixLabel}
        />

    }

    renderButton(label,color, onClick) {
        return  <button 
            className={`btn btn-${color}`}>
            {label}
            {onClick}
    </button>
    }

    renderSubmitButton(label,color, onClick) {
        return  <button 
            disabled={this.validate()}
            type="submit" 
            className={`btn btn-${color}`}>
            {label}
            {onClick}
    </button>
    } 

// below here NOT USED FOR editRecipie form
    handleChange = (event, catIndex,fieldIndex) => {
        let input = event.target
        //console.log(input, catIndex, fieldIndex)
        const errors = {...this.state.errors}
        const errorMessage = this.validateProperty(input,catIndex,fieldIndex);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        const data = {...this.state.data} /// this does not seem to be WORKING!!!!!
        //console.log('handleChange', data)
            data[input.name] = input.value; // this needs to change for nested ingredients
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

    getValue(name,value,catIndex,fieldIndex){
        const data = {...this.state.data}
        if(catIndex) {
            console.log('catIndex true')
            console.log(data);
            //return data['ingForm2'][catIndex].cat; // this needs to change for nested ingredients
        } else {
            // return null; // this needs to change for nested ingredients
        }
    }



    renderInputLeftLabel(
        name, 
        label, 
        type = 'text', 
        value,
        helpText ='', 
        error='', 
        order,
        catIndex,
        fieldIndex,
        hasPrefixLabel
        ) {
        const { data, errors } = this.state


            return <InputLeftLabel 
            name={name} 
            order={order}
            label={label}
            type={type}
            value={data[name] || value} 
            //value={this.getValue(name,value,catIndex,fieldIndex) || value}
            //value={this.getValue(data,name,catIndex,fieldIndex,type,value)} 
            onChange={event => this.handleChange(event, catIndex,fieldIndex)} 
            helpText={helpText}
            // error={errors[name]}
            catIndex={catIndex}
            fieldIndex={fieldIndex} 
            hasPrefixLabel={hasPrefixLabel}
        />

    }



    renderSelect(name, label, helpText ='', options = {},showLabel) {
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



}
 
export default Form;