import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../app/store';

interface User {
    id: string;
    email: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    user: null,
    loading: false,
    error: null,
};

const API_URL = 'http://localhost:3000/auth';


export const initializeAuthState = createAsyncThunk(
    'auth/initializeAuthState',
    async (token: string | null, thunkAPI) => {
        if (token) {
            try {
                const response = await axios.get(`${API_URL}/validate`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                return { token, user: response.data.user };
            } catch (error) {
                return thunkAPI.rejectWithValue('Invalid token');
            }
        }
        return { token: null, user: null };
    }
);


const saveTokenToStorage = async (token: string) => {
    try {
        await AsyncStorage.setItem('userToken', token);
    } catch (error) {
        console.error('Error saving token to storage', error);
    }
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: { email: string; password: string }, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);
            await saveTokenToStorage(response.data.token);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message || 'An unknown error occurred');
            }

            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (credentials: { fullName: string; email: string; password: string }, thunkAPI) => {
        try {
            const response = await axios.post(`${API_URL}/register`, credentials);
            
            await saveTokenToStorage(response.data.token);
            return response.data;
        } catch (error) {

            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message || 'An unknown error occurred');
            }

            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            AsyncStorage.removeItem('userToken');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeAuthState.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(initializeAuthState.fulfilled, (state, action: PayloadAction<{ token: string | null; user: any | null }>) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(initializeAuthState.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to initialize auth state';
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export const { logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
