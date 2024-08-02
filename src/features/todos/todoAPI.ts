import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const fetchTodos = () => axios.get(`${API_URL}/todos`);
export const createTodo = (todo: { title: string; description: string; completed: boolean; userId: string }) =>
    axios.post(`${API_URL}/todos`, todo);
export const deleteTodo = (id: string) => axios.delete(`${API_URL}/todos/${id}`);
export const updateTodo = (todo: { id: string; title: string; description: string; completed: boolean; userId: string }) =>
    axios.put(`${API_URL}/todos/${todo.id}`, todo);
