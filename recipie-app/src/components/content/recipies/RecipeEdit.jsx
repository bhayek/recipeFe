import React, { Component } from 'react';
import Form from '../../common/Form';
import Input from '../../common/Input';
import InputLeftLabel from '../../common/InputLeftLabel';
import Joi from 'joi-browser';
import userService from '../../../services/userService';
import recipeService from '../../../services/recipeService';
// import { data } from 'autoprefixer';
import IngredientCat from './IngredientCat';
import { getConfigs } from '../../../config';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';


class recipeEdit extends Form {
    state = {
        data:{}
    }

    

    componentDidMount() {
        
        
        let recipeId = this.props.match.params.recipeId
    //         axios.get(`/api/recipestest/${recipeId}`)
    //         .then(res => {
    //             console.log(res.data.data)
    //             // this.handleFormState(res.data.data)
    //             this.setState({ 
    //                 data: res.data.data, 
    //             }); 

    //             if(res.data.status === 404) {
    //                 return <Redirect to={'/recipe-not-found'}/>
    //             }
    // })

    axios.get(`/api/recipes/${recipeId}/edit`)
    .then(res => {

        if(res.data.status === 404) {
            return <Redirect to={'/recipe-not-found'}/>
        }
         this.setState({ 
            data: res.data.data, 
        }); 
        return res
}).then((res) => {
    // console.log('res',res)
    // if(res.data.data){
    //     let newCatObj = {...getConfigs().recipes.emptyCatObj}
    //     newCatObj.sortOrder = 0
    //     newCatObj.ingredients.sortOrder = 0
    //     newCatObj.cat = `Ingredient list name goes here`
    //     res.data.data.ingform2.push(newCatObj)
    //     this.setState({data:res.data.data})
    // }
})
        if(!this.state.units){
            axios.get('/api/lookup/units')
            .then(res => {
                const unitsArray = []
                res.data.data.map(unit => {
                    unitsArray.push({label: unit.name, value: unit.id})
                })
                this.setState({ units: unitsArray });
            }) 
        }
    
    // let recipeId = this.props.match.params.recipeId
    // let one = `/api/recipestest/${recipeId}`
    // let two = '/api/lookup/units'

    // const requestOne = axios.get(one)
    // const requestTwo = axios.get(two)
    
    // axios.all([requestOne], [requestTwo]).then(axios.spread((...responses) => {
    //     const recipeRes = responses[0]
    //     const unitsRes = responses[1]
    //     console.log('recipeRes', recipeRes)
    //     console.log('unitsRes', unitsRes)
    //     this.setState({data: recipeRes.data.data})

    //     const unitsArray = []
    //     unitsRes.data.data.map(unit => {
    //         unitsArray.push({label: unit.name, value: unit.id})
    //     })
    //     console.log('unitsArr',unitsArray)
    //     this.setState({ units: unitsArray });
        
    // })).catch(errors => {
    //     console.log(errors)
    // })
        
    console.log('cdm - RecipeEdit DID MOUNT')
}


    

    ingredient = {fieldValue: "", ingId: null, sortOrder: 0, unitType: "", description: "" }

    schema = {
        recipeTitle: Joi.string()
            .required()
            .label('Recipe Title')
            .min(3)
            .max(30)
            .required(),
        prepTime: Joi.number()
            .label('Prep Time'),
        totalTime: Joi.number()
            .label('Prep Time'),
        description: Joi.string()
            .label('Description')
            .required(),
        catName: Joi.string()
            .label('Category')
            .required(),
        ingredient: Joi.string()
            .label('Ingredient')
            .required(),
        unitType: Joi.string()
            .label('Unit')
            .required(),
        unitTypeAmount: Joi.number()
            .label('Amount')
            .required()
    }

    doSubmit = async () => {
        const recipeId = this.props.match.params.recipeId
        const { data } = this.state;
        const resp = await recipeService.saveRecipe(data,recipeId)
    }


    handleIngredientAdd = (catIndex) => {
        let newData = this.state.data;
        console.log(newData.ingForm2)
        let ingredients = newData.ingForm2[catIndex].ingredients
        let lastIngredient = ingredients[ingredients.length -1]
        let newIngredient = {...lastIngredient}
        Object.keys(newIngredient).forEach(key => newIngredient[key] = null)
        newIngredient.sortOrder = lastIngredient.sortOrder + 1
        newIngredient.fieldValue = `Ingredient ${ingredients.length+1}`
        ingredients.push(newIngredient)
        this.setState({data: newData})
    }


    handleIngredientDelete = (field, cat) => {
        let newState = {...this.state}
        const catPos = newState.data.ingForm2.indexOf(cat)
        const newIngredients = newState.data.ingForm2[catPos].ingredients.filter(f => f !== field)
        newState.data.ingForm2[catPos].ingredients = newIngredients
        this.setState({newState})
        
    }

    handleIngredientSortDown = (field,cat) => {
        let newState = {...this.state}
        const catPos = newState.data.ingForm2.indexOf(cat)
        const ingPos = cat.ingredients.indexOf(field)
        const newIngredients = [...cat.ingredients]
        newIngredients[ingPos].sortOrder++
        newIngredients[ingPos +1].sortOrder--
        newIngredients.sort((a,b) => (a.sortOrder > b.sortOrder) ? 1 : -1);
        newState.data.ingForm2[catPos].ingredients = newIngredients
        this.setState({newState})
    }

    handleIngredientSortUp = (field,cat) => {
        let newState = {...this.state}
        const catPos = newState.data.ingForm2.indexOf(cat)
        const ingPos = cat.ingredients.indexOf(field)
        const newIngredients = [...cat.ingredients]
        newIngredients[ingPos].sortOrder--
        newIngredients[ingPos -1].sortOrder++
        newIngredients.sort((a,b) => (a.sortOrder > b.sortOrder) ? 1 : -1);
        newState.data.ingForm2[catPos].ingredients = newIngredients
        this.setState({newState})
    }


    handleCatDelete = (cat,catIndex) => {
        let newState = {...this.state}
        newState.data.ingForm2.splice(catIndex,1)
        this.setState({newState})
        
    }

    handleCatAdd = (e) => {
        console.log(e)
        
        console.log("cat added")
        let newState = {...this.state}
        let newCat = {...getConfigs().recipes.emptyCatObj}
        let newIngredient = {...newCat.ingredients[0]}
        // Object.keys(newIngredient).forEach(key => newIngredient[key] = null)
        // Object.keys(newCat).forEach(key => newCat[key] = null)
        newCat.sort = newState.data.ingForm2.length
        newCat.cat = `New Ingredient List ${newCat.sort ? newCat.sort +1 : 1}`
        newIngredient.sortOrder = 0
        newIngredient.fieldValue = `Ingredient ${newCat.ingredients.length}`
        newCat.ingredients = []
        newCat.ingredients.push(newIngredient)
        newState.data.ingForm2.push(newCat)
        // console.log(newState)
        this.setState({newState})
    }

    handleCatSortDown = (cat) => {
        // console.log(this.state.data.ingForm2)
        let newState = {...this.state}
        const newCats = newState.data.ingForm2
        const catPos = newCats.indexOf(cat)
        newCats[catPos].sortOrder++
        newCats[catPos+1].sortOrder--
        newCats.sort((a,b) => (a.sortOrder > b.sortOrder) ? 1 : -1);
        this.setState({newState})
    }
    handleCatSortUp = (cat) => {
        let newState = {...this.state}
        const newCats = newState.data.ingForm2
        const catPos = newCats.indexOf(cat)
        newCats[catPos].sortOrder--
        newCats[catPos-1].sortOrder++
        newCats.sort((a,b) => (a.sortOrder > b.sortOrder) ? 1 : -1);
        this.setState({newState})
    }

    
    render() { 
        // console.log(Object.keys(this.state.data.ingForm))
        const { ingForm,ingForm2 } = this.state.data
        const { units } = this.state
        const { data } = this.state;
        //console.log('recipeEdit state: ', this.state)

        return (
                <div className="container">
                    <h1>Edit Recipie</h1>
                    <form onSubmit={this.handleSubmit}>
                        {/* {this.renderInput('recipeTitle','Recipe Title','text',"",'Required')} */}
                        {this.renderInputLeftLabel(
                                'recipeTitle', // name
                                'Recipe Title', //label
                                'text', // type
                                '', // value
                                '', // onChange
                                '', // helpText
                                '', // sortOrder
                                '', //catIndex
                                '', //fieldIndex
                                '' // prefixLabel
                                )}
                        {/* {this.renderInput('prepTime','Preparation Time','text')} */}
                        {this.renderInputLeftLabel(
                                'prepTime', // name
                                'Preparation Time (Minutes)', //label
                                'text', // type
                                '', // value
                                '', // onChange
                                '', // helpText
                                '', // sortOrder
                                '', //catIndex
                                '', //fieldIndex
                                '' // prefixLabel
                                )}
                        {/* {this.renderInput('totalTime','Total Time (includes cook, rise, etc.)','text')}  */}
                        {this.renderInputLeftLabel(
                                'totalTime', // name
                                'Total Time (Minutes)', //label
                                'text', // type
                                '', // value
                                '', // onChange
                                '', // helpText
                                '', // sortOrder
                                '', //catIndex
                                '', //fieldIndex
                                '' // prefixLabel
                                )}
                        {/* {this.renderInput('description','Recipe description','text',"",'Required')}  */}
                        {this.renderTextarea(
                                'description', // name
                                'Recipe Description', //label
                                'text', // type
                                '', // value
                                '', // onChange
                                '', // helpText
                                '', // sortOrder
                                '', //catIndex
                                '', //fieldIndex
                                '' // prefixLabel
                                )}

                        <h2>Ingredients</h2>
                        
                        {ingForm2 && ingForm2.map((cat, catIndex, catArr) =>(
                            <IngredientCat
                                key={catIndex}
                                cat={cat}
                                catIndex={catIndex}
                                catArr={catArr}
                                recipeEditState={data}
                                units={units}
                                onIngAdd={this.handleIngredientAdd}
                                onIngDelete={this.handleIngredientDelete}
                                onIngDown={this.handleIngredientSortDown}
                                onIngUp={this.handleIngredientSortUp}
                                onCatDelete={this.handleCatDelete}
                                onCatSortDown={this.handleCatSortDown}
                                onCatSortUp={this.handleCatSortUp}
                            />

                        ))}
                        <div className="offset-md-1 col-sm-3 g-2">
                        {ingForm2 && ingForm2.length < getConfigs().recipes.maxCats ?  
                            <div
                                className="btn btn-info"
                                onClick={this.handleCatAdd}
                            >
                                Add Recipe Category
                            </div>
                            :`A max of ${ingForm2 && ingForm2.length} categories have been created`}
                            {/* {this.renderButton('Add Recipe Cat','info')} */}
                        </div>
                        <div className="row">
                            <div className="offset-md-5 col-sm-3">
                                {this.renderSubmitButton('Save Changes', 'success')}
                            </div>
                            <div className="col-sm-5">
                            </div>
                        </div>
                    </form>
                </div>
        );
    }
}
 
export default recipeEdit;