import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Login: undefined; // No parameters for this screen
    Register: undefined; // No parameters for this screen
    Home: undefined; // No parameters for this screen
    TodoList: undefined; // No parameters for this screen
    CreateTodo: undefined; // No parameters for this screen
    EditTodo: { id: string }; // No parameters for this screen
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
export type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;
export type TodoListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TodoList'>;