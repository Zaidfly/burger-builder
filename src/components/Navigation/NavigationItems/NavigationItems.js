import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/burgerbuilder">Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        { props.authenticated 
            ? <NavigationItem link="/logout">Log out</NavigationItem>
            : <NavigationItem link="/auth">Log in</NavigationItem>
        }
    </ul>
);

export default navigationItems;