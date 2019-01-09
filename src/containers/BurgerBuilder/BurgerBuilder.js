import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.8,
    bacon: 0.3,
    meat: 1.2
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
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

    addIngredientHandler = (type) => {
        this.updateIngredients(type, 1);
    }

    removeIngredientHandler = (type) => {
        this.updateIngredients(type, -1);
    }

    checkoutHandler = () => {
        this.setState({purchasingMode: true});
    }

    purchaseContinue = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?'+ queryString
        });
    }

    cancelCheckoutHandler = () => {
        this.setState({purchasingMode: false});
    }

    updateIngredients = (type, count) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };

        const newIngredientCount = this.state.ingredients[type] + count;

        if(newIngredientCount < 0)
        {
            return;
        }

        updatedIngredients[type] = newIngredientCount;
        
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type] * count;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
    }


    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if (this.state.ingredients)
        {
            const readyToOrder = Object.values(this.state.ingredients).some(i => i > 0);

            burger = (
                <>
                    <Burger ingredients={this.state.ingredients}></Burger>
                    <BuildControls 
                        totalPrice={this.state.totalPrice}
                        onAdd={this.addIngredientHandler} 
                        onRemove={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        readyToOrder={readyToOrder} 
                        onPurchaseClick={this.checkoutHandler}/>
                </>
            );

            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients} 
                totalPrice={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);