import * as actionTypes from './actionTypes';
import axios from '../../../axios-orders';

const fetchIngredientStart = () => {
    return { type: actionTypes.FETCH_INGREDIENTS_START };
}

const fetchIngredientsSuccess = (ingredients) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_SUCCESS,
        ingredients
    }
}

const fetchIngredientsFailed = () => {
    return { type: actionTypes.FETCH_INGREDIENTS_FAILED}
}

export const fetchIngredients = () => dispatch => {
    dispatch(fetchIngredientStart());

    axios.get('/ingredients.json')
        .then(resp => {
            dispatch(fetchIngredientsSuccess(resp.data))
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed())
        });
}

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name
    }
}