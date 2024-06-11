import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { authAPI } from './authAPI';
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authAPI.endpoints.login.matchFulfilled,
                (state, { payload }) => {
                    state.user = payload.user;
                    localStorage.setItem('accessToken', payload.accessToken);
                    toast.success('Đăng nhập thành công !');
                }
            )
            .addMatcher(
                authAPI.endpoints.login.matchRejected,
                (state, action) => {
                    state.error = action.error.message;
                    if (action.payload?.data?.code === 401) {
                        toast.error('Tài khoản hoặc mật khẩu không chính xác.');
                    } else if (
                        action.payload?.data?.message ===
                        'Email is not verified'
                    ) {
                        toast.error(
                            'Vui lòng xác thực email trước khi đăng nhập'
                        );
                    } else if (
                        action.payload?.data?.message === 'ACCOUNT_LOCKED'
                    ) {
                        toast.error('Tài khoản này đã bị khóa!');
                    } else {
                        toast.error('Đăng nhập thất bại !');
                    }
                }
            )
            // Register
            .addMatcher(authAPI.endpoints.register.matchFulfilled, (state) => {
                toast.success(
                    'Đăng ký tài khoản thành công! Vui lòng kiểm tra email của bạn.'
                );
            })
            .addMatcher(
                authAPI.endpoints.register.matchRejected,
                (state, action) => {
                    state.error = action.error.message;
                    if (action.payload?.data?.error === 'MISSING_FIELDS') {
                        toast.warn('Vui lòng nhập đầy đủ thông tin.');
                    } else if (action.payload?.data?.error === 'EMAIL_EXIST') {
                        toast.error('Email đã tồn tại.');
                    } else if (
                        action.payload?.data?.error === 'PHONENUMBER_EXIST'
                    ) {
                        toast.error('Số điện thoại đã tồn tại.');
                    }
                }
            )
            // Forgot Password
            .addMatcher(
                authAPI.endpoints.forgotPassword.matchFulfilled,
                (state) => {
                    toast.success('Vui lòng kiểm tra email của bạn !');
                }
            )
            .addMatcher(
                authAPI.endpoints.forgotPassword.matchRejected,
                (state, action) => {
                    state.error = action.error.message;
                    if (action.payload?.data?.error === 'EMAIL_IS_NOT_EXIST') {
                        toast.error('Email không tồn tại.');
                    }
                }
            )
            // Logout
            .addMatcher(authAPI.endpoints.logout.matchFulfilled, (state) => {
                state.user = null;
                localStorage.removeItem('accessToken');
                toast.success('Đăng xuất thành công !');
            })
            .addMatcher(authAPI.endpoints.logout.matchRejected, (state) => {
                toast.error('Đăng xuất thất bại !');
            })
            // Refresh Token
            .addMatcher(
                authAPI.endpoints.refreshtoken.matchPending,
                (state) => {
                    state.isLoading = true;
                }
            )
            .addMatcher(
                authAPI.endpoints.refreshtoken.matchFulfilled,
                (state, { payload }) => {
                    state.isLoading = false;
                    localStorage.setItem('accessToken', payload.accessToken);
                }
            )
            .addMatcher(
                authAPI.endpoints.refreshtoken.matchRejected,
                (state, action) => {
                    state.isLoading = false;
                    if (action.payload?.data?.code === 403) {
                        toast.error('Phiên đăng nhập hết hạn');
                    }
                }
            );
    },
});

export default authSlice.reducer;
