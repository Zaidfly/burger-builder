import React, {Component} from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {        
        purchasingMode: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(resp => {
                this.setState({ingredients: resp.data});
            })
            .catch(error => {
                this.setState({error: true})
            });
    }

    checkoutHandler = () => {
        this.setState({purchasingMode: true});
    }

    purchaseContinue = () => {        
        this.props.history.push('/checkout');
    }

    cancelCheckoutHandler = () => {
        this.setState({purchasingMode: false});
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if (this.props.ingredients)
        {
            const readyToOrder = Object.values(this.props.ingredients).some(i => i > 0);

            burger = (
                <>
                    <Burger ingredients={this.props.ingredients}></Burger>
                    <BuildControls 
                        totalPrice={this.props.totalPrice}
                        onAdd={this.props.onAddIngredient} 
                        onRemove={this.props.onRemoveIngredient}
                        disabled={disabledInfo}
                        readyToOrder={readyToOrder} 
                        onPurchaseClick={this.checkoutHandler}/>
                </>
            );

            orderSummary = <OrderSummary 
                ingredients={this.props.ingredients} 
                totalPrice={this.props.totalPrice}
                onCancel={this.cancelCheckoutHandler}
                onConfirm={this.purchaseContinue} />;
        }

        if (this.state.loading){
            orderSummary = <Spinner />
        }
        
        return (
            <div>
                <Modal 
                    show={this.state.purchasingMode}
                    onCancel={this.cancelCheckoutHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName}),
        onRemoveIngredient: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));