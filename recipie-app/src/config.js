const config = {
    apiUrl:'http://localhost:4042/api',
    recipes:{
        maxCatIngredients: 4,
        maxCats: 5
    }
}


export function getConfigs() {
    return config
}

