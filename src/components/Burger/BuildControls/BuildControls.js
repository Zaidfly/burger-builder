import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const BuildControls = (props) => (
    <div className={styles.BuildControls}>
        <p>Total Price: <strong>${props.totalPrice.toFixed(2)}</strong></p>
        {controls.map(c=>
            <BuildControl 
                key={c.label} 
                label={c.label}
                disabled={props.disabled[c.type]}
                onAdd={() => props.onAdd(c.type)} 
                onRemove={() => props.onRemove(c.type)} />)}
        <button 
            className={styles.OrderButton}
            disabled={!props.readyToOrder}
            onClick={props.onPurchaseClick}>ORDER NOW</button>
    </div>
);

export default BuildControls;