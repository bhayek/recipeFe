import React, { Component } from 'react';
import RecipieList from './recipies/RecipieList';


class content extends Component {
    state = {  } 
    render() { 
        return (
            <div>
                <h1>Page content component.</h1>
                <RecipieList/>
            </div>
        );
    }
}
 
export default content;