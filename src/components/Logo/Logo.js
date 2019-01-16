import React from 'react';
import { NavLink } from 'react-router-dom';

import BurgerLogo from '../../assets/images/burger-logo.png';
import styles from './Logo.module.css';

const logo = () => (
    <div className={styles.Logo}>
        <NavLink to="/">
            <img src={BurgerLogo} alt='MyBurger'/>
        </NavLink>        
    </div>
);

export default logo;