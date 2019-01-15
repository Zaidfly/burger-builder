import * as actionTypes from './actionTypes';

const initialState = {
    orders: null,
    loading: false
};

const fetchOrdersSuccess = (state, action) => {
    return {
        ...state,
        orders: action.orders,
        loading: false
    }
}

const fetchOrdersFail = (state, action) => {
    return {
        ...state,
        orders: null,
        error: action.error,
        loading: false
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS_START:
            return { ...state, loading: true }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: 
            return fetchOrdersFail(state, action);
        default:
            return state;
    }
}

export default reducer;