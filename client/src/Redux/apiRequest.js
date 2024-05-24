import axios from 'axios';

import {
    forgotpassFailed,
    forgotpassStart,
    forgotpassSuccess,
    loginFailed,
    loginStart,
    loginSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from './authSlice';
axios.defaults.withCredentials = true;
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(
            'http://localhost:3001/v1/auth/login',
            user
        );
        dispatch(loginSuccess(res.data));
        localStorage.setItem('accessToken', res.data.accessToken);
        navigate('/');
    } catch (error) {
        dispatch(loginFailed(error?.response?.data));
    }
};
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post('http://localhost:3001/v1/auth/register', user);
        dispatch(registerSuccess());
        navigate('/login');
    } catch (error) {
        dispatch(registerFailed(error?.response?.data));
    }
};
export const forgotPass = async (user, dispatch, navigate) => {
    dispatch(forgotpassStart());
    try {
        await axios.post('http://localhost:3001/v1/auth/forgotpassword', user);
        dispatch(forgotpassSuccess());
        navigate('/login');
    } catch (error) {
        dispatch(forgotpassFailed(error?.response?.data));
    }
};
