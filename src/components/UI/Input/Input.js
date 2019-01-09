import React from 'react';
import styles from './Input.module.css';

const input = (props) => {
    return (
        <div className={styles.Input}>
            <label>{props.placeholder}</label>
            <input className={styles.Inner} {...props}></input>            
        </div>
    );
}

export const Select = (props) => {
    
    return (
        <div className={styles.Input}>
            <label>{props.placeholder}</label>
            <select className={styles.Inner} {...props}>
                {props.options.map(o => (<option key={o.value} value={o.value}>{o.displayValue}</option>))}
            </select>            
        </div>
    );
}

export default input;
