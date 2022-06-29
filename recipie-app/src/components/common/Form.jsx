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



    handleChange = (event, catIndex,fieldIndex) => {
        catIndex = parseInt(catIndex)
        fieldIndex = parseInt(fieldIndex)
        console.log('catIndex: ', typeof catIndex, 'fieldIndex: ', typeof fieldIndex)
        console.log('catIndex: ', catIndex, 'fieldIndex: ', fieldIndex)
        let input = event.target
        // console.log(input)
        const errors = {...this.state.errors}
        // const errorMessage = this.validateProperty(input);
        // if (errorMessage) errors[input.name] = errorMessage;
        // else delete errors[input.name];

        const data = {...this.state.data} /// this does not seem to be WORKING!!!!!
        console.log("alpental", this.state)

            if(input.name !== 'ingForm2'){ // user cannot use this fieldname
                const formHasField = input.name in data
                if(formHasField) {
                    console.log('basic form field', 'input.name: ', input.name, input)
                    data[input.name] = input.value; // this needs to change for nested ingredients
                } else if (isNaN(fieldIndex)) {
                    console.log('category field', 'input.name: ', input.name, input)
                    console.log({category: data})
                    data.ingForm2[catIndex].cat = input.value
                    console.log(data.ingForm2)
                } else if (fieldIndex > -1 && typeof fieldIndex === 'number'){
                    console.log('ingredient field', 'input.name: ', input.name, input, "fieldIndex: ", fieldIndex)
                    if(input.name === 'ingredient') {
                        data.ingForm2[catIndex].ingredients[fieldIndex].fieldValue = input.value
                    } else if (input.name === 'ingredient-amount') {
                        data.ingForm2[catIndex].ingredients[fieldIndex].unitTypeAmount = input.value
                    } else if (input.name === 'ingredient-unit') {
                        data.ingForm2[catIndex].ingredients[fieldIndex].unitType = input.value
                    }
                }
            }


        
        // data[input.name] = input.value; // this needs to change for nested ingredients
        console.log({this: this})
        this.setState({ data, errors })
        
    }

    // renderInput(name, label, type = 'text', helpText ='') {
    //     const { data, errors } = this.state
    //     return <Input 
    //     name={name} 
    //     label={label}
    //     type={type}
    //     // value={data[name]} 
    //     onChange={this.handleChange} 
    //     helpText={helpText}
    //     // error={errors[name]} 
    // />
    // }

    getValue(data,name,catIndex,fieldIndex) {
        // console.log({catIndex});
        
        if(catIndex < 1 || isNaN(catIndex)) {
            return data[name]
        } else if(catIndex && catIndex > -1){
            console.log('catIndexgv', catIndex)
            console.log(data.ingForm2)
            if(!data.ingForm2){
                data.ingForm2 = []
            }
            return data.ingForm2[catIndex]
        }
        // return data[name]
    }



    renderInputLeftLabel(
        name, 
        label, 
        type = 'text', 
        value = '',
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
        // value={data[name]} 
        value={this.getValue(data,name,catIndex,fieldIndex,type,value)} 
        onChange={event => this.handleChange(event, catIndex,fieldIndex)} 
        helpText={helpText}
        // error={errors[name]}
        catIndex={catIndex}
        fieldIndex={fieldIndex} 
        hasPrefixLabel={hasPrefixLabel}
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

}
 
export default Form;