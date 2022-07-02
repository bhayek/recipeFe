import React, { Component } from 'react';
import Form from '../../common/Form';
import Ingredient from './Ingredient';
import recipeEdit from './RecipeEdit';
import { getConfigs } from '../../../config';
import InputLeftLabel from '../../common/InputLeftLabel';


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


componentDidMount() {
    console.log('cdm - IngredientCat DID MOUNT')
    // console.log('props')
    // console.log(this.props.recipeEditState.ingForm2)
}

getCatValue(name,value,catIndex,fieldIndex) {
    let data = this.props.recipeEditState
    if(catIndex +1){
        //console.log(data.ingForm2)
        return data.ingForm2[catIndex].cat
    }
}


handleCatChange = (event, catIndex,fieldIndex) => {
    let input = event.target
    //console.log(input, catIndex, fieldIndex)
    const errors = {...this.state.errors}
    const errorMessage = this.validateProperty(input,catIndex,fieldIndex);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = {...this.props.recipeEditState} /// this does not seem to be WORKING!!!!!
    // console.log('handleChange', data)
    if(catIndex +1 && !fieldIndex) {
        //console.log('catIndex fired')
        data.ingForm2[catIndex].cat = input.value
    } else {
        //data[input.name] = input.value; // this needs to change for nested ingredients
    }
    this.setState({ data, errors })
    
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
        value={this.getCatValue(name,value,catIndex,fieldIndex)}
        //value={this.getValue(data,name,catIndex,fieldIndex,type,value)} 
        onChange={event => this.handleCatChange(event, catIndex,fieldIndex)} 
        helpText={helpText}
        // error={errors[name]}
        catIndex={catIndex}
        fieldIndex={fieldIndex} 
        hasPrefixLabel={hasPrefixLabel}
    />

}
    



    render() { 
        const { cat,catIndex,catArr,recipeEditState,units } = this.props
     
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
                                'catName', // name
                                'Category', //label
                                'text', // type
                                cat.cat, // value
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
                                key={fieldIndex}
                                field={field}
                                fieldIndex={fieldIndex}
                                arr={arr}
                                units={units}
                                catIndex={catIndex}
                                recipeEditState={recipeEditState}
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
                                onClick={() => this.addIngredient(recipeEditState, catIndex)}
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