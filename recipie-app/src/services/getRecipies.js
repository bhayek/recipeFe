import http from "./httpService";

export function getRecipes() {
    console.log(http.get('/api/recipes/active'))
   return http.get('/api/recipes/active')
}