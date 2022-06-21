import React, { Component } from 'react';
import getRecipe, { getrecipes } from '../../../services/fakeData';
import Axios from 'axios';
import { Link } from "react-router-dom"
import { getRecipes } from '../../../services/getRecipies';

class RecipeList extends Component {
    state = { 
        recipes: []
     } 
     


     componentDidMount() {
        if(this.state.recipes) {
            Axios.get('/api/recipes/active')
            .then(res => {
              this.setState({ recipes: res.data.data });
            })
        }
        console.log('state: ', this.state);
    }




    render() { 

        const {recipes} = this.state 
        return (
            <div class="container">
                        <h1>RecipeList component</h1>
            
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Prep Time</th>
                            <th scope="col">Total Time</th>
                            <th scope="col">Servings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipes.map(recipe => (
                        <tr key={recipe.id}>
                            
                            <th scope="row">{recipe.id}</th>
                            <td>{recipe.name}</td>
                            <td>{recipe.description}</td>
                            <td>{recipe.prepTime}</td>
                            <td>{recipe.totalTime}</td>
                            <td>{recipe.servings}</td>
                            <td><Link to={`/recipies/${recipe.id}`}>View</Link></td>
                               
                        </tr>
                        ))}

                    </tbody>
                </table>

            </div>
                

            
        );
    }
}
 
export default RecipeList;