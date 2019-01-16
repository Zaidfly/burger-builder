import React from 'react';
import styles from './Button.module.css';

const button = (props) => {
    const { btnType, ...rest } = props;

    const styleNames = [styles.Button, styles[props.btnType]].join(' ');

    return (
        <button
            className={styleNames}            
            onClick={props.onClick}
            {...rest}>{props.children}
        </button>);
};

export default button;