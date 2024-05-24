import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(
                'http://localhost:3001/v1/auth/refresh-token',
                {
                    method: 'POST',
                    credentials: 'include',
                }
            );
            const data = await response.json();
            return data.accessToken;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: localStorage.getItem('accessToken') || null,
        refreshToken: null,
        status: 'idle',
        error: null,

        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        },
        register: {
            isFetching: false,
            error: false,
            success: false,
        },
        forgotpass: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
            toast.success('Đăng nhập thành công');
        },
        loginFailed: (state, action) => {
            state.login.isFetching = false;
            state.login.error = true;
            if (action.payload?.code === 401) {
                toast.error('Tài khoản hoặc mật khẩu không chính xác');
            }
            if (action.payload?.code === 403) {
                toast.error('Vui lòng xác thực email trước khi đăng nhập');
            }
        },
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
            toast.success(
                'Đăng ký tài khoản thành công! Vui lòng kiểm tra email của bạn '
            );
        },
        registerFailed: (state, action) => {
            state.register.isFetching = false;
            state.register.error = true;
            if (action.payload?.error === 'MISSING_FIELDS') {
                toast.error('Vui lòng nhập đầy đủ thông tin.');
            }
            if (action.payload?.error === 'EMAIL_EXIST') {
                toast.error('Email đã tồn tại.');
            }
            if (action.payload?.error === 'PHONENUMBER_EXIST') {
                toast.error('Số điện thoại đã tồn tại.');
            }
            state.register.success = false;
        },
        forgotpassStart: (state) => {
            state.forgotpass.isFetching = true;
        },
        forgotpassSuccess: (state) => {
            state.forgotpass.isFetching = false;
            state.forgotpass.error = false;
            state.forgotpass.success = true;
            toast.success('Vui lòng kiểm tra email của bạn ');
        },
        forgotpassFailed: (state, action) => {
            state.forgotpass.isFetching = false;
            state.forgotpass.error = true;
            if (action.payload?.error === 'EMAIL_IS_NOT_EXIST') {
                toast.error('Email không tồn tại.');
            }
            state.forgotpass.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.accessToken = action.payload; // Assume the payload is the new access token
                state.status = 'succeeded';
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = 'failed';
            })
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    forgotpassStart,
    forgotpassSuccess,
    forgotpassFailed,
} = authSlice.actions;

export default authSlice.reducer;
