import React, { Component } from 'react';
import Form from '../../common/Form';
import Ingredient from './Ingredient';
import { getConfigs } from '../../../config';


class IngredientCat extends Form {
    addIngredient = (data, catIndex,event) => {
        let formObj = [...data.ingForm2];
        let ingredients = formObj[catIndex].ingredients
        let lastIngredient = ingredients[ingredients.length -1]
        let newIngredient = {...lastIngredient}
        Object.keys(newIngredient).forEach(key => newIngredient[key] = '')
        newIngredient.sortOrder = lastIngredient.sortOrder + 1
        newIngredient.fieldValue = `Ingredient ${ingredients.length+1}`
        ingredients.push(newIngredient)
        this.setState({data: formObj})
    }



    



    render() { 
        const { cat,catIndex,catArr,data } = this.props
     
        return (
            <div>
                <div className="shadow-sm p-3 mb-5 bg-light rounded">
                    <div className="row">
                        <h4 className="capitalize col-sm-11">{cat.cat}</h4>
                        {catArr.length > 1 ?
                            <div 
                                className="col-sm-1"
                                onClick={() => this.props.onCatDelete(this.props.cat,this.props.catIndex)}
                                >   
                                <span class="oi oi-x"></span>
                            </div>
                        :''}
                        <hr/>
                    </div>
                    <div className="row g-3">
                        <div className="col-sm-3">
                            {this.renderInputLeftLabel(
                                cat, // name
                                'Category', //label
                                'text', // type
                                '', // value
                                '', // onChange
                                '', // helpText
                                '', // sortOrder
                                catIndex, //catIndex
                                '', //fieldIndex
                                '' // prefixLabel
                                )}
                        </div>         
                        <div 
                            className="offset-8 col-sm-1"
                            >
                            {catIndex > 0 ? 
                            <div 
                                className="btn btn-light col-sm-2 mb-5"
                                onClick={() => this.props.onCatSortUp(this.props.cat)}
                            >
                                <span class="oi oi-arrow-top"></span>
                            </div>
                            : ''}
                            {catIndex < catArr.length -1 ? 
                            <div 
                            className="g-5 btn btn-light col-sm-2 mb-5"
                            onClick={() => this.props.onCatSortDown(this.props.cat)}
                            >
                                <span class="oi oi-arrow-bottom"></span>
                            </div>
                            :''}
                        </div>
                        

                    </div>
                    {cat.ingredients.map((field, fieldIndex, arr) => (
                        <React.Fragment>
                            <Ingredient
                                field={field}
                                fieldIndex={fieldIndex}
                                arr={arr}
                                catIndex={catIndex}
                                data={data}
                                cat={cat}
                                onIngDelete={() => this.props.onIngDelete(field, this.props.cat)}
                                onIngDown={() => this.props.onIngDown(field, this.props.cat)}
                                onIngUp={() => this.props.onIngUp(field, this.props.cat)}
                            />
                        {fieldIndex+1 < arr.length ? <hr className="col-sm-9 offset-1 mt-5"/>: '' }
                        </React.Fragment>
                    ))}
                    <div className="row offset-sm-8 col-sm-3 g-2">
                        {
                        cat.ingredients
                        .length < getConfigs().recipes.maxCatIngredients ?   
                            <button className="btn btn-info"
                                onClick={() => this.addIngredient(data, catIndex)}
                            >
                            Add Ingredient
                        </button>
                        : <p>Max of {getConfigs().recipes.maxCatIngredients} ingredients added</p>}
                        </div>
                </div>
            </div>
            
        )
    }
}
 
export default IngredientCat;