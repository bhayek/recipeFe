import React, { Component } from 'react';

const Select = ({ name, label, value, onChange, helpText, error, options }) => {
    return (                         
    <div className="mb-3">
        <label htmlFor={name}>{ label }</label>
        <select 
            value={value} 
            onChange={onChange} 
            name={name}
            id={name} 
            className="form-select" 
            aria-describedby={`${label} select example`}
        >
            <option selected></option>
            {options.map(option => (
                
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
        {helpText && <div id={`${name}Help`} className="form-text">{ helpText }</div>}
        {error && <div className="alert alert-danger">{ error }</div> }
         
        
    </div>
 );
}
 
export default Select;