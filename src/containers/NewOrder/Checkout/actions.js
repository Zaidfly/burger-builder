import * as actionTypes from './actionTypes';
import axios from '../../../axios-orders';

const createOrderSuccess = (orderData) => {
    return {
        type: actionTypes.CREATE_ORDER_SUCCESS,
        orderData
    };
}

const createOrderFail = (error) => {
    return {
        type: actionTypes.CREATE_ORDER_FAIL,
        error
    };
}

const createOrderStart = () => {
    return { type: actionTypes.CREATE_ORDER_START }
}

export const createOrder = (orderData) => dispatch => {
    dispatch(createOrderStart());

    axios.post('/orders.json', orderData)
        .then(resp => {
            dispatch(createOrderSuccess({...orderData, id: resp.data}))
        })
        .catch( error => {
            dispatch(createOrderFail(error))
        });
}