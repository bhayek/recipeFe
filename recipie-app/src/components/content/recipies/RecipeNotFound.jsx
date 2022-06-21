import React, { Component } from 'react';
import { Link } from "react-router-dom"

class RecipeNotFound extends Component {
    state = {  } 
    render() { 
        return (
            <div>
                <h1>404 Recipe Not Found</h1>
                <p>Return to <Link to={'/recipes'}>recipes</Link></p>
            </div>
        );
    }
}
 
export default RecipeNotFound;