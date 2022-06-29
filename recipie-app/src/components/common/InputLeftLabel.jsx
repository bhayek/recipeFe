import React, { Component } from 'react';

const InputLeftLabel = ({ 
    name, 
    label, 
    type, 
    value, 
    onChange, 
    helpText, 
    error, 
    order,
    catIndex,
    fieldIndex,
    hasPrefixLabel, 
    onClick
}) => {

    
    return (                         
    <React.Fragment>
    {hasPrefixLabel === 'showPrefix' ? 
        <span className="input-group-text capitalize" id={`inputGroup-sizing-sm-${catIndex}`}>
            {name === 'ingredient' ? fieldIndex + 1 + '.' : label}
            </span>
    : ''}
        {hasPrefixLabel === '' && catIndex === '' ? <label htmlFor={name}>{ label }</label> : ''}
        
        <input 
            value={value} 
            onChange={onChange}
            type={type} 
            name={name}
            id={`catIndex_${catIndex}-ingIndex_${fieldIndex}-catName_${name}`}
            className="form-control" 
            aria-describedby={type}
        />
        {helpText && <div id={`${name}Help`} className="form-text">{ helpText }</div>}
        {error && <div className="alert alert-danger">{ error }</div> }
    </React.Fragment>
 );
}
 
export default InputLeftLabel;