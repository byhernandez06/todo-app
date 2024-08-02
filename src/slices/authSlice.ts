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


export const initializeAuthState = createAsyncThunk(
    'auth/initializeAuthState',
    async (token: string | null, thunkAPI) => {
        if (token) {
            try {
                const response = await axios.get('http://localhost:3000/auth/validate', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Handle response if needed
                return { token, user: response.data.user };
            } catch (error) {
                return thunkAPI.rejectWithValue('Invalid token');
            }
        }
        return { token: null, user: null };
    }
);

// Función para guardar el token en AsyncStorage
const saveTokenToStorage = async (token: string) => {
    try {
        await AsyncStorage.setItem('userToken', token);
    } catch (error) {
        console.error('Error saving token to storage', error);
    }
};

// Función para recuperar el token de AsyncStorage
const getTokenFromStorage = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        return token;
    } catch (error) {
        console.error('Error retrieving token from storage', error);
        return null;
    }
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: { email: string; password: string }, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', credentials);
            console.log('Login response: ', response)
            await saveTokenToStorage(response.data.token);
            return response.data;
        } catch (error) {
            console.log('Login Response: ', error)
            // Comprobamos si el error es de Axios y tiene respuesta
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message || 'An unknown error occurred');
            }
            // Si el error no es de Axios, manejamos el error desconocido
            return thunkAPI.rejectWithValue('An unknown error occurred');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (credentials: { fullName: string; email: string; password: string }, thunkAPI) => {
        try {
            console.log('Before register: ', credentials)
            const response = await axios.post('http://localhost:3000/auth/register', credentials);
            console.log('Register response: ', response)
            await saveTokenToStorage(response.data.token);
            return response.data;
        } catch (error) {
            console.log('Register Response: ', error)
            // Comprobamos si el error es de Axios y tiene respuesta
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.message || 'An unknown error occurred');
            }
            // Si el error no es de Axios, manejamos el error desconocido
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
