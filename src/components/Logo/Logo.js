import React from 'react';
import BurgerLogo from '../../assets/images/burger-logo.png';
import styles from './Logo.module.css';

const logo = () => (
    <div className={styles.Logo}>
        <img src={BurgerLogo} alt='MyBurger'/>
    </div>
);

export default logo;