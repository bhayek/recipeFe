import http from './httpService';
import { getConfigs } from '../config';
import jwtDecode from 'jwt-decode';



export async function saveRecipe(data, recipeId) {
    const saveRecipeEndpoint =  getConfigs().apiUrl + `/recipes/${recipeId}/update`
    const resp = await http.post(saveRecipeEndpoint,data)
    console.log(resp)
    // this.setState({data: resp.data.data})
}



export default {
    saveRecipe
}