import * as actionTypes from './actionTypes';

const initialState = {
    userId: null,
    email: null,
    token: null,
    loading: false,
    error: null,
    signUp: false
}

const authSuccess = (state, action) => {
    return {
        ...state,
        userId: action.userId,
        email: action.email,
        token: action.token,
        loading: false,
        error: null
    }
}

const authFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}

const changeAuthForm = state => {
    return {
        ...state,
        loading: false,
        error: null,
        signUp: !state.signUp
    }
}

const logOut = state => {
    return {
        ...state,
        token: null,
        userId: null,
        email: null
    }
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: 
            return { ...state, loading: true, error: null };
        case actionTypes.AUTH_SUCCESS: 
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: 
            return authFail(state, action);
        case actionTypes.CHANGE_AUTH_FROM: 
            return changeAuthForm(state);
        case actionTypes.LOG_OUT:
            return logOut(state);
        default: 
            return state;
    }
}

export default authReducer;