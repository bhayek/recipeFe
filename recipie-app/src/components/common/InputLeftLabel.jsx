import React, { Component } from 'react';

const InputLeftLabel = ({ 
    name, 
    label, 
    type, 
    value, 
    onChange, 
    helpText, 
    error, 
    order 
}) => {
    return (                         
    <React.Fragment>
        {/* <label htmlFor={name}>{ label }</label> */}
        <span className="input-group-text capitalize" id="inputGroup-sizing-sm">
            {order ? order + '. ' + label : label}
            </span>
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
    </React.Fragment>
 );
}
 
export default InputLeftLabel;