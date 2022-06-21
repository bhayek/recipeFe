import fracty from 'fracty';
import React, { Component } from 'react';
import getRecipe from '../../../services/fakeData';
import recipieEdit from './RecipeEdit';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';




class RecipeView extends Component {
    state = { 
        resStatus:0,
        recipe: [],
        ingredients: {}
     }

     
    componentDidMount() {
        // console.log('recipe vew - component did mount')
        let recipeId = this.props.match.params.recipeId
            Axios.get(`/api/recipes/${recipeId}`)
            .then(res => {
                const { ingredients } = res.data.resContract
                const cats = {}
                ingredients.forEach(ingredient => {
                    if(!cats[ingredient.category]) {
                        cats[ingredient.category] = []
                    } 
                    cats[ingredient.category].push(ingredient)
                })

                this.setState({ 
                    recipe: res.data.resContract, 
                    resStatus: res.data.status, 
                    ingredients: cats 
                }); 

                if(res.data.status === 404) {
                    return <Redirect to={'/recipe-not-found'}/>
                }
    })
        
}

    // getIngCatHeadings = () => {

    // }

    
    getCoverPhoto = () => {
        const { photos } = this.state.recipe
        if(photos[0]) {
            const coverPhotos = photos.filter(photo =>
                photo.coverPhoto === 1)
            if(coverPhotos[0]) {
                return coverPhotos[0].url
            } else {
                return photos[0].url
            }
        } else {
            return '/placeholder.jpg'
        }
    }

    render() { 
        console.log('state:',this.state.ingredients)

        
        const {recipe} = this.state

        if(this.state.resStatus === 404) {
            return <Redirect to={'/recipe-not-found'}/>
        }

        if(this.state.resStatus === 200) {
            return (
                <div>
                    <div className="coverPhoto">
                        <img src={this.getCoverPhoto()} alt="" />
                    </div>
                    <div class="container">
                        <div className="container">
                            <div className="row">
                                <h1 className="col-6">{recipe.name}</h1>
                                <div className="col-5"></div>
                                <div className="col-1 self-end justify-content-end">
                                    <button type="button" class="btn btn-light">
                                        <Link to={`/recipies/${this.props.match.params.recipeId}/edit`}>
                                            <span class="oi oi-pencil"></span>
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <p><strong>Prep Time:</strong> {recipe.prepTime} minutes</p>
                        <p><strong>Total Time:</strong> {recipe.totalTime} minutes</p>
                        <h2>Ingredients</h2>
                        <div>
                        {recipe.ingredients.length === 0 ? <p><i>[[ NO INGREDIENTS IN DATABSE ]]</i></p>: ''}
                        {Object.keys(this.state.ingredients).map(cat => (
                            <div>
                                <h3 className="capitalize">{cat}</h3>
                                <ul>
                                    {this.state.ingredients[cat].map(ingredient =>(
                                        <li key={ingredient.id}>
                                        {fracty(ingredient.amount) + ' '} 
                                        {ingredient.unit === null ? '': ingredient.unit  + ' '}
                                        {ingredient.name} 
                                        {ingredient.descripiton ? ' (' + ingredient.descripiton + ')' : ''}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        </div>

                    <h2>Instructions</h2>
                    <p>{recipe.description}</p>
                    <h3>Steps</h3>
                    <ol className="col-md-6">
                    {recipe.instructions.length === 0 ? <p><i>[[ NO STEPS IN DATABSE ]]</i></p>: ''}
                        {recipe.instructions.map(instruction => (
                            <li key={instruction.id}>
                                {instruction.step}
                                {instruction.time ? <span> <a href='#'>START TIMER for {instruction.time + ' Seconds'} </a></span> : ''}  
                            </li>
                            // <li>
                            //     <div class="custom-control custom-checkbox">
                            //         <input type="checkbox" class="custom-control-input" id="check2">
                            //         <label class="custom-control-label" for="check2">Check me</label>
                            //     </div>
                            // </li>
                        ))}
                    </ol>
                    </div>
                </div>
    

            
            );
        }
    }
}
 
export default RecipeView;