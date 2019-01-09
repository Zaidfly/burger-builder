import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    constructor(props){
        super(props);

        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = (+param[1]).toFixed(2);
            } else {
                ingredients[param[0]] = +param[1];
            }            
        }

        this.state = {
            ingredients: ingredients,
            totalPrice: price
        };
    }

    componentDidMount() {
        // const query = new URLSearchParams(this.props.location.search);
        // const ingredients = {};
        // for (let param of query.entries()) {
        //     ingredients[param[0]] = +param[1];
        // }
        // this.setState({ingredients: ingredients});
    }

    onCheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    onCheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    onCheckoutCancelled={this.onCheckoutCancelledHandler}
                    onCheckoutContinued={this.onCheckoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (
                        <ContactData 
                            ingredients={this.state.ingredients} 
                            totalPrice={this.state.totalPrice} 
                            {...props} />)
                    }/>
            </div>            
        );
    } 
}

export default Checkout;