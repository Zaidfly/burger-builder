import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientSummary = Object.entries(props.ingredients)
        .map(([key, value]) => 
            <li key={key}>
                <span style={{textTransform: 'capitalize'}}>{key}</span>: {value}
            </li>);

    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: ${props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" onClick={props.onCancel}>Cancel</Button>
            <Button btnType="Success" onClick={props.onConfirm}>Continue</Button>
        </>
    );
};

export default orderSummary;