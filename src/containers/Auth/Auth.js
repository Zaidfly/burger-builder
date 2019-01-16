import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.module.css';
import * as actions from './actions';


class Auth extends Component {
    state = {
        email: '',
        password: ''
    }

    inputChangedHanler = (event) => {        
        const newState = {
            ...this.state, 
            [event.target.name]: event.target.value};

        this.setState(newState);
    }

    submitHandler = (event) => {
        event.preventDefault();

        this.props.onSubmit({
            signUp: this.props.signUp,
            email: this.state.email,
            password: this.state.password
        });
    }

    render() {

        let error = null;
        if (this.props.error)
        {
            error = <p>{this.props.error}</p>
        }

        const switchQuestion = this.props.signUp ? 'Already have an account?' : 'Not registered yet?';
        
        let form = (
            <form onSubmit={this.submitHandler}>
                <p className={styles.Head}>{this.props.signUp ? 'Please, sign up:' : 'Welcome back!'}</p>
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={this.state.email}
                    onChange={this.inputChangedHanler} />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={this.state.password}
                    onChange={this.inputChangedHanler} />
                {error}
                <Button btnType="Success" type="submit">{this.props.signUp ? 'Sign Up' : 'Log In'}</Button>
                <Button 
                    btnType="Link"
                    type="button"
                    onClick={this.props.onChangeAuthForm}>{switchQuestion}</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />
        }

        let redirect = null;
        if (this.props.token){
            if (this.props.building) redirect = <Redirect to="/checkout" />
            else redirect = <Redirect to="/" />
        }
        
        return (
            <div className={styles.Auth} >
                {redirect}
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token,
        signUp: state.auth.signUp,
        building: state.burger.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (authData) => dispatch(actions.tryAuth(authData)),
        onChangeAuthForm: () => dispatch(actions.changeAuthForm())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);