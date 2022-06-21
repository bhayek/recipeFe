import React, { Component } from 'react';

const Input = ({ name, label, type, value, onChange, helpText, error }) => {
    return (                         
    <div className="mb-3">
        <label htmlFor={name}>{ label }</label>
        <input 
            value={value} 
            onChange={onChange}
            type={type} 
            name={name}
            autoFocus 
            id={name} 
            className="form-control" 
            aria-describedby="emailHelp"
        />
        {helpText && <div id={`${name}Help`} className="form-text">{ helpText }</div>}
        {error && <div className="alert alert-danger">{ error }</div> }
         
        
    </div>
 );
}
 
export default Input;