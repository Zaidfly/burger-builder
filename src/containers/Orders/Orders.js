import React, {Component} from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from './actions';


class Orders extends Component {

    state = {
        orders: null,
        loading: true
    }

    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {        
        let orders = <h1>There are no orders yet</h1>;
        
        if (this.props.orders) {   
            orders = this.props.orders.filter(o=>o.ingredients).map(o => 
                <Order 
                    key={o.id}
                    ingredients={Object.entries(o.ingredients).map(i => ({name:i[0], amount:i[1]}))}
                    price={o.price} />)
        }

        if (this.props.loading) {
            orders = <Spinner />
        }

        return (
            <React.Fragment>
                {orders}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));