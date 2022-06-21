export const loginResponse = {
    "jwt":"eyeloggedin"
}

export const users = [
    {id:1,firstName:'System',lastName:'Admin',email:'bryan.hayek@gmail.com',dateDeleted: null, dateCreated: '2022-05-27', dateSuspended: null, dob: '2001-05-27', dateDeleted: '2022-05-27', suspendReason: 'spammer', password: 'abc', gender: 1},
    {id:2,firstName:'Chlly',lastName:'Willy',email:'bryan.hayek@gmail.com',dateDeleted: null, dateCreated: '2022-05-27', dateSuspended: null, dob: '1980-05-27', dateDeleted: null, suspendReason: null, password: 'abc', gender: 1},
    {id:3,firstName:'System',lastName:'Admin',email:'bryan.hayek@gmail.com',dateDeleted: null, dateCreated: '2022-05-27', dateSuspended: null, dob: '2000-05-27', dateDeleted: null, suspendReason: null, password: 'abc', gender: 1}
];

export const recipies = [
    {
        id:1, 
        name: 'Mom\'s Best Chili',
        description: 'This is a simple, classic and very mild chili recipe that my mom made all the time when I was growing up. It\'s perfect for an easy dinner or game day get together or whenever you want some hearty comfort food. If  you\'re not a fan of spicy chili, this is the recipe for you!',
        dateCreated: '2022-05-27',
        dateDeleted: '2022-05-27', 
        isSharedId: 4,
        createdById: 1,
        photoId: null,
        prepTime: 90,
        totalTime: 120,
        servings: 4,
        photos:[
            {
                id: 1,
                coverPhoto: true,
                title: 'Chili with cheese',
                url: '/moms-best-chili-recipe-wide.jpg'
            },
            {
                id: 2,
                coverPhoto: false,
                title: 'A bowl of chili',
                url: '/bowl_of_1548681856-768x457.jpg'
            }
        ],
        ingredients:[
            {
                id: 1,
                name: 'ground beef',
                descripiton: 'lean',
                unit: 'lb',
                amount: 1.5
            },
            {
                id: 2,
                name: 'onion',
                descripiton: null,
                unit: null,
                amount: 1
            },
            {
                id: 3,
                name: 'bell pepper',
                descripiton: 'seeded and diced',
                unit: null,
                amount: 1
            },
            {
                id: 4,
                name: 'kidney beans',
                descripiton: 'rinsed and drained',
                unit: 'can',
                canSizeOz: 14, 
                amount: 2
            },
            {
                id: 5,
                name: 'tomato sauce',
                descripiton: null,
                unit: 'can',
                canSizeOz: 8, 
                amount: 1
            },
            {
                id: 6,
                name: 'diced tomatoes',
                descripiton: null,
                unit: 'can',
                canSizeOz: 14, 
                amount: 1
            },
            {
                id: 7,
                name: 'water',
                descripiton: null,
                unit: 'c', 
                amount: 1
            },
            {
                id: 8,
                name: 'chili powder',
                descripiton: null,
                unit: 'tsp',
                amount: 1.5
            },
            {
                id: 9,
                name: 'sea salt',
                descripiton: null,
                unit: 'tsp',
                amount: 1
            },
            {
                id: 10,
                name: 'black pepper',
                descripiton: 'ground',
                unit: 'tsp',
                amount: .5
            }
        ],
        instructions: [
            {
                id: 1,
                step: 'In a large pot or Dutch oven, brown the ground beef, and drain excess fat',
                time: null
            },
            {
                id: 2,
                step: 'Add the onion and pepper, and heat until slightly soft, stirring often',
                time: null
            },
            {
                id: 3,
                step: 'Stir in the remaining ingredients, heat until bubbling, cover, and simmer until ready to eat',
                time: 5
            }
        ]
    },
    {
        id: 2, 
        name: 'Mom\'s Best Chili',
        description: 'This is a simple, classic and very mild chili recipe that my mom made all the time when I was growing up. It\'s perfect for an easy dinner or game day get together or whenever you want some hearty comfort food. If  you\'re not a fan of spicy chili, this is the recipe for you!',
        dateCreated: '2022-05-27',
        dateDeleted: '2022-05-27', 
        dateSuspended: null,
        forkedById: 2,
        isSharedId: 4,
        createdById: 1,
        photoId: null,
        prepTime: 90,
        totalTime: 120,
        servings: 4,
        suspendedById: null,
        suspendedReason: '',
        photos:[
            {
                id: 1,
                coverPhoto: true,
                title: 'Chili with cheese',
                url: '/bowl_of_1548681856-768x457.jpg'
            },
            {
                id: 2,
                coverPhoto: false,
                title: 'A bowl of chili',
                url: '/bowl_of_1548681856-768x457.jpg'
            }
        ],
        ingredients:[
            {
                id: 1,
                name: 'ground beef',
                descripiton: 'lean',
                unit: 'lb',
                amount: 1.5
            },
            {
                id: 2,
                name: 'onion',
                descripiton: null,
                unit: null,
                amount: 1
            },
            {
                id: 3,
                name: 'bell pepper',
                descripiton: 'seeded and diced',
                unit: null,
                amount: 1
            },
            {
                id: 4,
                name: 'kidney beans',
                descripiton: 'rinsed and drained',
                unit: 'can',
                canSizeOz: 14, 
                amount: 2
            },
            {
                id: 5,
                name: 'tomato sauce',
                descripiton: null,
                unit: 'can',
                canSizeOz: 8, 
                amount: 1
            },
            {
                id: 6,
                name: 'diced tomatoes',
                descripiton: null,
                unit: 'can',
                canSizeOz: 14, 
                amount: 1
            },
            {
                id: 7,
                name: 'water',
                descripiton: null,
                unit: 'c', 
                amount: 1
            },
            {
                id: 8,
                name: 'chili powder',
                descripiton: null,
                unit: 'tsp',
                amount: 1.5
            },
            {
                id: 9,
                name: 'sea salt',
                descripiton: null,
                unit: 'tsp',
                amount: 1
            },
            {
                id: 10,
                name: 'black pepper',
                descripiton: 'ground',
                unit: 'tsp',
                amount: .5
            }
        ],
        instructions: [
            {
                id: 1,
                step: 'In a large pot or Dutch oven, brown the ground beef, and drain excess fat',
                time: null
            },
            {
                id: 2,
                step: 'Add the onion and pepper, and heat until slightly soft, stirring often',
                time: null
            },
            {
                id: 3,
                step: 'Stir in the remaining ingredients, heat until bubbling, cover, and simmer until ready to eat',
                time: 5
            }
        ]
    }
]

export function getRecipies() {
    return recipies;
}

export default function getRecipe(recipieId) {
    const result = recipies.filter(recipie => recipie.id === recipieId)
    console.log('result: ', result)
    console.log('result[0]: ', result[0])
    return result[0]
}  


export function getUsers() {
    return users;
}  

export function getUser(userId) {
    return users.id[userId];
}  