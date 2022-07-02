import React, { Component } from 'react';
import Form from '../../common/Form';
import InputLeftLabel from '../../common/InputLeftLabel';
import Select from '../../common/Select';

class Ingredient extends Form {
// class Ingredient extends IngredientCat {
    removeIngredient = (fieldIndex, catIndex, data) => {
        let formObj = [...data.ingForm2];
        // console.log('beforeClick', formObj)
        let ingredients = formObj[catIndex].ingredients
        let newIngredients = [...ingredients]
        newIngredients.splice(fieldIndex,1)
        formObj[catIndex].ingredients = newIngredients
        this.setState({data: formObj})
        this.forceUpdate();
        // console.log('afterClick', formObj)
    }
    handleClick = (e) => {
        console.log(e.target)
    }

    componentDidMount() {
        console.log('cdm - Ingredient DID MOUNT')
    }

    getIngValue(name,value,catIndex,fieldIndex,id) {
        let data = this.props.recipeEditState
        // if has ID then it's a select field
        if(catIndex +1){
           // console.log(data.ingForm2)
            return data.ingForm2[catIndex].ingredients[fieldIndex][name]
        } 
    }
    
    
    handleIngChange = (event, catIndex,fieldIndex) => {
        let input = event.target
        //console.log(input, catIndex, fieldIndex)
        const errors = {...this.state.errors}
        const errorMessage = this.validateProperty(input, catIndex, fieldIndex);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        const data = {...this.props.recipeEditState} /// this does not seem to be WORKING!!!!!
        // console.log('handleChange', data)
        if(catIndex +1 && fieldIndex +1) {
           //console.log('field fired')
           //console.log(data.ingForm2[catIndex].ingredients[fieldIndex][input.name]);
            data.ingForm2[catIndex].ingredients[fieldIndex][input.name] = input.value
        }
        this.setState({ data, errors })
        //console.log('state', data)
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
            //value={data[name]} 
            value={this.getIngValue(name,value,catIndex,fieldIndex)}
            //value={this.getValue(data,name,catIndex,fieldIndex,type,value)} 
            onChange={event => this.handleIngChange(event, catIndex,fieldIndex)} 
            helpText={helpText}
            // error={errors[name]}
            catIndex={catIndex}
            fieldIndex={fieldIndex} 
            hasPrefixLabel={hasPrefixLabel}
        />
    
    }

    renderSelect(name, label, helpText ='', options = {},showLabel, id, value, catIndex,fieldIndex) {
        const { data, errors } = this.state
        return <Select
        name={name} 
        label={label}
        value={this.getIngValue(name,value,catIndex,fieldIndex)}
        onChange={event => this.handleIngChange(event, catIndex, fieldIndex)} 
        options={options}
        helpText={helpText}
        error={errors[name]} 
        showLabel={showLabel}
        catIndex={catIndex}
        fieldIndex={fieldIndex}
        />
    }

    render() { 
        const { field, fieldIndex, catIndex, recipeEditState, cat,units } = this.props
        // const unitsArray = recipeEditState.units
        // console.log('unitsArray Ingredient', units);
        return (
            <div className="row" key={fieldIndex}>
                 <div className="g-3 row col-sm-8">
                    <div className="input-group col-sm-4">
                        {this.renderInputLeftLabel(
                            `fieldValue`, // name
                            'ingredient', // label
                            'text', // type
                            field.fieldValue, // value
                            '', // onChange
                            '', // helpText
                            field.sortOrder+1, // sortOrder
                            catIndex, // catIndex
                            fieldIndex, // fieldIndex
                            'showPrefix', // prefixLabel

                            )}
                    </div>
                    {/* <p>CAT INDEX = {catIndex}, FIELD INDEX = {fieldIndex}</p> */}
                    <div className="col-sm-1 ">
                    </div>
                    <div className="input-group col-sm g-3">
                        {this.renderInputLeftLabel(
                            `unitTypeAmount`, // name
                            'Amount', //label
                            'text', // type
                            field.unitTypeAmount, // value
                            '', // onChange
                            '', // helpText
                            '', // sortOrder
                            catIndex, //catIndex
                            fieldIndex, //fieldIndex
                            'showPrefix' // prefixLabel
                            )}
                    </div>
                    <div className="input-group col-sm g-3">
                        {/* {this.renderInputLeftLabel(
                            `unitType`, // name
                            'Unit Type', // label
                            'text', // type
                            field.unitType, // value
                            '', // onChange
                            '', // helpText
                            '', // sortOrder
                            catIndex, // catIndex
                            fieldIndex, // fieldIndex
                            'showPrefix' // prefixLabel
                            )} */}
                            {this.renderSelect(
                            'unitTypeId', // name
                            'unit', // label
                            '', // help text
                            units, // options
                            '', // show label
                            '', // id
                            '', // value
                            catIndex, // catIndex
                            fieldIndex // fieldIndex
                        )} 
                    </div>
                </div>
                <div className="g-5 col-sm-3">
                    {cat.ingredients.length > 1 ?
                    <div 
                    className="btn btn-danger mb-5"
                    onClick={() => this.props.onIngDelete(fieldIndex, catIndex, recipeEditState)}
                    >
                        Remove 
                        {/* <span class="oi oi-x"></span> */}
                    </div>
                    : ''}
                    {fieldIndex === 0 ? '':
                    <div 
                        className="btn btn-light mb-5"
                        onClick={() => this.props.onIngUp(this.props.field,this.props.cat)}
                    >
                        <span class="oi oi-arrow-top"></span>
                    </div>
                    }
                    {fieldIndex === recipeEditState.ingForm2[catIndex].ingredients.length -1 ? '':
                    <div 
                        className="g-5 btn btn-light mb-5"
                        onClick={() => this.props.onIngDown(this.props.field,this.props.cat)}
                    >
                        <span class="oi oi-arrow-bottom"></span>
                    </div>
                    }   

                </div>
            </div>
        );
    }
}
 
export default Ingredient;
