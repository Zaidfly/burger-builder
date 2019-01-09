import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.3,
    cheese: 0.8,    
    meat: 1.2
}

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    },
    totalPrice: 4
};

const updateIngredients = (state, ingredientName, count) => {
    const newIngredientCount = state.ingredients[ingredientName] + count;
    const newPrice = state.totalPrice + INGREDIENT_PRICES[ingredientName] * count;

    if(newIngredientCount < 0){
        return state;
    }

    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [ingredientName]: newIngredientCount
        },
        totalPrice: newPrice
    };
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENTS:
            return updateIngredients(state, action.ingredientName, 1);
        case actionTypes.REMOVE_INGREDIENTS:
            return updateIngredients(state, action.ingredientName, -1);
        default:
            return state;
    }
};


export default reducer;