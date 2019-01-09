import React from 'react';
import styles from './Order.module.css';

const order = (props) => {
    const ingredients = props.ingredients.map(i => 
        <span key={i.name}>{i.name}: {i.amount}</span>);

    return (
    <div className={styles.Order}>
        <p>Ingredients: {ingredients}</p>
        <p>Price: <strong>${props.price}</strong></p>
    </div>
)};


export default order;