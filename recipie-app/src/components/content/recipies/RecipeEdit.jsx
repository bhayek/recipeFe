import React, { Component } from 'react';
import Form from '../../common/Form';
import Input from '../../common/Input';
import InputLeftLabel from '../../common/InputLeftLabel';
import Joi from 'joi-browser';
import userService from '../../../services/userService';
import { data } from 'autoprefixer';

class recipeEdit extends Form {
    state = { 
        data: {
            recipeTitle: '',
            prepTime: '',
            totalTime: '',
            description: '',
            ingForm2:[
                {cat: "chili", sortOrder: 0, ingredients:[
                    {fieldValue: "ground beef", sortOrder: 0, unitType: "pound", description: "cooked" },
                    {fieldValue: "bell pepper", sortOrder: 1, unitType: "", description: "" }
                    ]
                },
                {cat: "garnish", sortOrder: 1, ingredients:[
                    {fieldValue: "cilantro", sortOrder: 0, unitType: "tsp", description: "" },
                    {fieldValue: "cheese", sortOrder: 1, unitType: "ounce", description: "grated" }     
                    ]
                }
            ],
            ingredients: {},
            steps:{}
        },
        errors: {}
    }

    schema = {
        recipeTitle: Joi.string()
            .required()
            .label('Recipe Title'),
        prepTime: Joi.number()
            .label('Prep Time'),
        totalTime: Joi.number()
            .label('Prep Time')
    }

    doSubmit = async () => {
        const { data } = this.state;
        const resp = await userService.login(data,'/')
    }

    render() { 
        // console.log(Object.keys(this.state.data.ingForm))
        const { ingForm } = this.state.data
        const { ingForm2 } = this.state.data
        return (
            <div>
                <div className="container">
                    <h1>Edit Recipie</h1>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput('recipeTitle','Recipe Title','text',"",'Required')}
                        {this.renderInput('prepTime','Preparation Time','text')} 
                        {this.renderInput('totalTime','Total Time (includes cook, rise, etc.)','text')} 
                        {this.renderInput('description','Description','text')} 

                        <h2>Ingredients</h2>
                        {ingForm2 && ingForm2.map((cat, i, arr) =>(
                            <div>
                                <div className="shadow-sm p-3 mb-5 bg-light rounded">
                                    <div className="row">
                                        <h4 className="capitalize col-sm-10">{cat.cat}</h4>
                                        <div className="col-sm-2">Remove <span class="oi oi-x"></span></div>
                                    </div>
                                    <div className="row g-3">
                                        <div className="col-sm-3">
                                            {this.renderInput(`category`,'Recipe List Name','text',"",'Required')}
                                        </div>
                                    </div>
                                    {cat.ingredients.map((field, i, arr) => (
                                    <div className="row">

                                        <div className="g-3 row col-sm-8">
                                            <div className="input-group col-sm-4">
                                                {this.renderInputLeftLabel(`ingredient`,field.fieldValue,'text',"",'','',field.sortOrder+1)}
                                            </div>
                                            <div className="col-sm-1 ">
                                            </div>
                                            <div className="input-group col-sm g-3">
                                                {this.renderInputLeftLabel(`ingredient-amount`,'Amount','text',"",'','','')}
                                            </div>
                                            <div className="input-group col-sm g-3">
                                                {this.renderInputLeftLabel(`ingredient-unit`,'Unit Type','text',"",'','','')}
                                            </div>

                                            
                                        </div>

                                            <div className="g-5 col-sm-3">
                                                <div className="btn btn-light mb-5">
                                                    <span class="oi oi-arrow-top"></span>
                                                </div>
                                                <div className="g-5 btn btn-light mb-5">
                                                    <span class="oi oi-arrow-bottom"></span>
                                                </div>
                                                <div className="btn btn-danger mb-5">
                                                    Remove 
                                                    {/* <span class="oi oi-x"></span> */}
                                                </div>
                                 
                                            </div>

                                            {arr.length -1 === i ? <div className="row offset-sm-8 col-sm-3 g-2">{this.renderButton('Add Ingredient', 'info')}</div>:<hr className="offset-sm-3 col-sm-6 g-5"/>}
                                    </div>        

                                    ))}
                                    
                                </div>
                                {arr.length -1 === i ? <div className="offset-md-1col-sm-3 g-2">{this.renderButton('Add Recipe Cat','info')}</div>:''}
                            </div>
                            
                        ))}


                    <div className="row">

                        <div className="offset-md-5 col-sm-3">

                        {this.renderSubmitButton('Save Changes', 'success')}
                        </div>
                        <div className="col-sm-5">

                        </div>

                    </div>

                    </form>
                </div>
            </div>
        );
    }
}
 
export default recipeEdit;