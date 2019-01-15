import * as actionTypes from './actionTypes';
import * as orderActionTypes from '../actionTypes';

const initialState = {
    loading: false,
    checkouting: true
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case orderActionTypes.INIT_CHECKOUT:
            return { ...state, checkouting: true }
        case actionTypes.CREATE_ORDER_START:
            return { ...state, loading: true }
        case actionTypes.CREATE_ORDER_SUCCESS: 
            return { ...state, loading: false, checkouting: false }
        case actionTypes.CREATE_ORDER_FAIL: 
            return { ...state, loading: false }        
        default: 
            return state;
    }
}

export default reducer;