import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../../axios-orders';
import Button from '../../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Input, { Select } from '../../../../components/UI/Input/Input';
import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../actions';

class ContactData extends Component{
    state = {
        orderForm: {
            name: 'Max Schawrzmuller',
            street: 'someStreet 1',
            zipCode: '31341',
            country: 'Germany',
            email: 'test@test.com',
            deliveryMethod: 'fastest'
        },
        deliveryOptions: [
            {value: 'fastest', displayValue: 'Fastest'}, 
            {value: 'cheapest', displayValue: 'Cheapest'}
        ]
    }

    orderHandler = (event) => {
        event.preventDefault();
        
        this.setState({loading: true});
        const customer = {...this.state.orderForm};
        delete customer.deliveryMethod;
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            cutomer: customer,
            deliveryMethod: this.state.orderForm.deliveryMethod
        };

        this.props.onCreateOrder(order);
    }

    inputChangedHanler = (event) => {
        const newOrderForm = {...this.state.orderForm};
        newOrderForm[event.target.name] = event.target.value;
        event.target.isValid = this.checkValidity(event.target.value, {...event.target});
        this.setState({orderForm: newOrderForm});
    }

    checkValidity(value, rules)
    {
        let isValid = false;
        if (rules.required)
        {
            isValid = value.trim() !== ''
        }

        return isValid;
    }

    render() {

        let form = (
            <form onSubmit={this.orderHandler}>
                <Input 
                    type="text" 
                    name="name" 
                    placeholder="Name"
                    required 
                    value={this.state.orderForm.name} 
                    onChange={this.inputChangedHanler} />
                <Input 
                    type="text" 
                    name="street" 
                    placeholder="Street" 
                    required
                    value={this.state.orderForm.street} 
                    onChange={this.inputChangedHanler} />
                <Input 
                    type="text" 
                    name="zipCode"
                    placeholder="ZIP Code" 
                    required
                    value={this.state.orderForm.zipCode} 
                    onChange={this.inputChangedHanler} />
                <Input 
                    type="text" 
                    name="country"
                    placeholder="Country" 
                    required
                    value={this.state.orderForm.country} 
                    onChange={this.inputChangedHanler} />
                <Input 
                    type="email"
                    name="email" 
                    placeholder="Email" 
                    required
                    value={this.state.orderForm.email} 
                    onChange={this.inputChangedHanler} />                                
                <Select 
                    name="deliveryMethod" 
                    options={this.state.deliveryOptions}
                    value={this.state.orderForm.deliveryMethod}  
                    placeholder="Delivery Type" 
                    onChange={this.inputChangedHanler} />
                <Button
                    btnType="Success"
                    onClick={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        loading: state.checkout.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateOrder: (orderData) => dispatch(actionCreators.createOrder(orderData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));