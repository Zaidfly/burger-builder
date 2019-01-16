import * as actionTypes from './actionTypes';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.3,
    cheese: 0.8,    
    meat: 1.2,
    base: 4
}

const initialState = {
    ingredients: null,
    totalPrice: INGREDIENT_PRICES.base,
    error: false,
    loading: false,
    building: false
};

const updateIngredients = (state, ingredientName, count) => {
    const newIngredientCount = state.ingredients[ingredientName] + count;
    const newPrice = state.totalPrice + INGREDIENT_PRICES[ingredientName] * count;

    if(newIngredientCount < 0){
        return state;
    }

    const updatedIngredients = {
        ...state.ingredients, 
        [ingredientName]: newIngredientCount 
    };

    return {
        ...state, 
        ingredients: updatedIngredients,
        totalPrice: newPrice,
        building: true
    };
}

const fetchIngredientsSuccess = (state, action) => {
    return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: Object.keys(action.ingredients)
                .reduce(
                    (price, ingName) => price + action.ingredients[ingName],
                    INGREDIENT_PRICES.base),
        error: false,
        loading: false,
        building: false
    };
}

const fetchIngredientsFailed = (state) => 
{
    return {
        ...state,
        error: true,
        loading: false
    }
}

const fetchIngredientsStart = (state) => {
    return {
        ...state,
        error: false,
        loading: true
    }
}

const burgerBuilderReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENTS:
            return updateIngredients(state, action.ingredientName, 1);
        case actionTypes.REMOVE_INGREDIENTS:
            return updateIngredients(state, action.ingredientName, -1);
        case actionTypes.FETCH_INGREDIENTS_START:
            return fetchIngredientsStart(state)
        case actionTypes.FETCH_INGREDIENTS_SUCCESS:
            return fetchIngredientsSuccess(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state)
        default:
            return state;
    }
};

export default burgerBuilderReducer;