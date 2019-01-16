import React, {Component} from 'react';
import { connect } from 'react-redux';

import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component { 
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}}
        );    
    }

    render() {
        return(
        <>
            <SideDrawer 
                showSideDrawer={this.state.showSideDrawer} 
                closed={this.sideDrawerClosedHandler}
                authenticated={this.props.authenticated} />
            <Toolbar 
                drawerToggleClicked={this.sideDrawerToggleHandler}
                authenticated={this.props.authenticated} />
            <main className={styles.Content}>{this.props.children}</main>
        </>);
    }        
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);