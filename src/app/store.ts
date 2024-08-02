import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import todoReducer from '../features/todos/todoSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        todos: todoReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {todos: TodosState}
export type AppDispatch = typeof store.dispatch;

export default store;