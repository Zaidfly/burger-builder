import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Orders extends Component {

    state = {
        orders: null,
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const orders = Object
                    .entries(res.data)
                    .map(o => ({...o[1], id: o[0]}));

                this.setState({
                    loading: false,
                    orders: orders});                
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    orders: null
                })
            })
    }

    render() {        
        let orders = <h1>There is no orders yet</h1>;
        if (this.state.orders)
        {   
            orders = this.state.orders.filter(o=>o.ingredients).map(o => 
                <Order 
                    key={o.id}
                    ingredients={Object.entries(o.ingredients).map(i => ({name:i[0], amount:i[1]}))}
                    price={o.price} />)
        }
        return (
            <React.Fragment>
                {orders}
            </React.Fragment>
        );
    }
}

export default withErrorHandler(Orders, axios);