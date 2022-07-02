import React, { Component } from 'react';

const Select = ({ 
    name, 
    label, 
    value, 
    onChange, 
    helpText, 
    error, 
    options,
    showLabel,
    catIndex,
    fieldIndex
}) => {
    return ( 
        <React.Fragment> 
        {showLabel === 'showLabel' ? 
            <label htmlFor={name}>{ label }</label> : ''
        }                       
        <select 
            value={value} 
            onChange={onChange} 
            name={name}
            id={`catIndex_${catIndex}-ingIndex_${fieldIndex}-catName_${name}`}
            className="form-select" 
            aria-describedby={`${label} select example`}
        >
            <option default></option>
            {Array.isArray(options) && options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
        {helpText && <div id={`${name}Help`} className="form-text">{ helpText }</div>}
        {error && <div className="alert alert-danger">{ error }</div> }
    </React.Fragment>
 );
}
 
export default Select;