import React, { Component } from 'react';
import Form from '../../common/Form';

class Ingredient extends Form {
    removeIngredient = (fieldIndex, catIndex, data) => {
        let formObj = [...data.ingForm2];
        console.log('beforeClick', formObj)
        let ingredients = formObj[catIndex].ingredients
        let newIngredients = [...ingredients]
        newIngredients.splice(fieldIndex,1)
        formObj[catIndex].ingredients = newIngredients
        this.setState({data: formObj})
        this.forceUpdate();
        console.log('afterClick', formObj)
    }
    handleClick = (e) => {
        console.log(e.target)
    }

    render() { 
        const { field, fieldIndex, catIndex, data, cat } = this.props
        console.log({field});
        return (
            <div className="row" key={fieldIndex}>
                 <div className="g-3 row col-sm-8">
                    <div className="input-group col-sm-4">
                        {this.renderInputLeftLabel(
                            `ingredient`, // name
                            field.fieldValue, // label
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
                            `ingredient-amount`, // name
                            'Amount', //label
                            'text', // type
                            field.unitType, // value
                            '', // onChange
                            '', // helpText
                            '', // sortOrder
                            catIndex, //catIndex
                            fieldIndex, //fieldIndex
                            'showPrefix' // prefixLabel
                            )}
                    </div>
                    <div className="input-group col-sm g-3">
                        {this.renderInputLeftLabel(
                            `ingredient-unit`, // name
                            'Unit Type', // label
                            'text', // type
                            field.unitTypeAmount, // value
                            '', // onChange
                            '', // helpText
                            '', // sortOrder
                            catIndex, // catIndex
                            fieldIndex, // fieldIndex
                            'showPrefix' // prefixLabel
                            )}
                    </div>
                </div>
                <div className="g-5 col-sm-3">
                    {cat.ingredients.length > 1 ?
                    <div 
                    className="btn btn-danger mb-5"
                    onClick={() => this.props.onIngDelete(fieldIndex, catIndex, data)}
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
                    {fieldIndex === data.ingForm2[catIndex].ingredients.length -1 ? '':
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
