import * as actionTypes from './actionTypes';
import axios from 'axios'

const authStart = () => {
    return { type: actionTypes.AUTH_START }
}

const dispatchAuthSuccess = (dispatch, respData) => {
    const authData = {
        token: respData.idToken,
        email: respData.email,
        userId: respData.localId
    };

    localStorage.setItem('token', authData.token);
    localStorage.setItem('email', authData.email);
    localStorage.setItem('userId', authData.userId);

    dispatch(authSuccess(authData));
}

const authSuccess = (authData) => {    
    return { 
        type: actionTypes.AUTH_SUCCESS,
        ...authData
    }
}

const authFail = (error) => {
    let msg = error.message;

    if (error.response.status === 400) {
        msg = msg + ' (' + error.response.data.error.message + ')';
    }

    return {
        type: actionTypes.AUTH_FAIL,
        error: msg
    }
}

export const changeAuthForm = () => {
    return { type: actionTypes.CHANGE_AUTH_FROM }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    return { type: actionTypes.LOG_OUT }
}

export const tryAuth = authData => dispatch => {
    dispatch(authStart());

    const url = authData.signUp 
        ? 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC40hq5hpV8rcYLVET9cYFUc_ypRk-f2S4'
        : 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC40hq5hpV8rcYLVET9cYFUc_ypRk-f2S4';

    const payload = {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
    };

    axios.post(url, payload)
        .then(resp => dispatchAuthSuccess(dispatch, resp.data))
        .catch(err => dispatch(authFail(err)));
}

