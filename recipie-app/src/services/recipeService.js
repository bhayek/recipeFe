import http from './httpService';
import { getConfigs } from '../config';
import jwtDecode from 'jwt-decode';



export function saveRecipe(data, recipeId) {
    const saveRecipeEndpoint = getConfigs().apiUrl + `/recipes/${recipeId}/update`

    console.log(http.post(saveRecipeEndpoint))
    return http.post(saveRecipeEndpoint)
}

export default {
    saveRecipe
}