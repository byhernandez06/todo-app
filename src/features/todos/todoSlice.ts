// src/features/todos/todoSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosConfig';
import { RootState } from '../../app/store';

interface Todo {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    userId: string;
}

interface TodoState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
}

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null,
};

export const fetchTodosAsync = createAsyncThunk(
    'todos/fetchTodos',
    async (_, thunkAPI) => {
        try {
            console.log('Before request')
            const response = await axiosInstance.get('/todos');
            console.log('Response: ', response)
            return response.data;
        } catch (error: any) {
            console.log('Error on Get: ', error)
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const addTodoAsync = createAsyncThunk(
    'todos/addTodo',
    async (todo: Omit<Todo, 'id' | 'completed' | 'userId'>, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/todos', todo);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateTodoAsync = createAsyncThunk(
    'todos/updateTodo',
    async ({ id, todo }: { id: string; todo: Partial<Todo> }, thunkAPI) => {
        try {
            const response = await axiosInstance.put(`/todos/${id}`, todo);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodo',
    async (id: string, thunkAPI) => {
        try {
            await axiosInstance.delete(`/todos/${id}`);
            return id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const checkCompletedAsync = createAsyncThunk(
    'todos/checkCompleted',
    async (id: string, thunkAPI) => {
        try {
            const response = await axiosInstance.patch(`/todos/${id}/completed`, { completed: true });
            console.log(response)
            return response.data;
        } catch (error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodosAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodosAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(fetchTodosAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            })
            .addCase(updateTodoAsync.fulfilled, (state, action) => {
                const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            .addCase(deleteTodoAsync.fulfilled, (state, action: PayloadAction<string>) => {
                state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            })
            .addCase(checkCompletedAsync.fulfilled, (state, action) => {
                const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index].completed = action.payload.completed;
                }
            });
    },
});

export const selectTodos = (state: RootState) => state.todos.todos;

export default todoSlice.reducer;
