import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Login: undefined; // No parameters for this screen
    Register: undefined; // No parameters for this screen
    Tabs: undefined; // No parameters for this screen
    TodoList: undefined; // No parameters for this screen
    EditTodo: { id: string }; // No parameters for this screen
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
export type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;
export type TodoListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TodoList'>;

export interface Todo {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}