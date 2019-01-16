import React, {Component} from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import Burger from '../../../components/Burger/Burger';
import BuildControls from '../../../components/Burger/BuildControls/BuildControls';
import Modal from '../../../components/UI/Modal/Modal';
import OrderSummary from '../../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from './actions';
import * as orderActions from '../actions';

class BurgerBuilder extends Component {
    state = { purchasingMode: false }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    checkoutHandler = () => {
        this.setState({ purchasingMode: true });
    }

    purchaseContinue = () => {
        this.props.onInitCheckout();
        if (this.props.isAuthenticated) {
            this.props.history.push('/checkout');
        }
        else {
            this.props.history.push('/auth');
        }
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
        
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
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
                        onPurchaseClick={this.checkoutHandler}
                        isAuthenticated={this.props.isAuthenticated} />
                </>
            );

            orderSummary = <OrderSummary 
                ingredients={this.props.ingredients} 
                totalPrice={this.props.totalPrice}
                onCancel={this.cancelCheckoutHandler}
                onConfirm={this.purchaseContinue} />;
        }

        if (this.props.loading){
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
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        error: state.burger.error,
        loading: state.burger.loading,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingName) => dispatch(actions.addIngredient(ingName)),
        onRemoveIngredient: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.fetchIngredients()),
        onInitCheckout: () => dispatch(orderActions.initCheckout())        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));