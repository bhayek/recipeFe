const config = {
    apiUrl:'http://localhost:4042/api',
    recipes:{
        maxCatIngredients: 12,
        maxCats: 5,
        emptyCatObj: {
            cat: null,
            catId: null,
            sort: 0,
            ingredients: [
                {
                    fieldValue: null,
                    ingId: null,
                    sortOrder: 0,
                    unitTypeId: null,
                    unitTypeAmount: null,
                    description: null
                }
            ]
        }
    }
}


export function getConfigs() {
    return config
}

