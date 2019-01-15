import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const fetchOrdersStart = () => {
    return { type: actionTypes.FETCH_ORDERS_START }
}

const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders       
    }
}

const fetchOrdersFail = (error) => {
    return { 
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrders = () => dispatch => {
    dispatch(fetchOrdersStart());

    axios.get('/orders.json')
        .then(res => {
            const orders = Object
                .entries(res.data)
                .map(o => ({ ...o[1], id: o[0] }));

            dispatch(fetchOrdersSuccess(orders));
        })
        .catch(err => {
            dispatch(fetchOrdersFail(err));
        })
}

