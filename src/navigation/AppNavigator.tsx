import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
// import HomeScreen from '../screens/HomeScreen';
import TodoListScreen from '../screens/TodoListScreen';
import CreateTodoScreen from '../screens/CreateTodoScreen';
import EditTodoScreen from '../screens/EditTodoScreen';
import { RootStackParamList } from '../types';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name="TodoList" component={TodoListScreen} />
        <Stack.Screen name="CreateTodo" component={CreateTodoScreen} />
        <Stack.Screen name="EditTodo" component={EditTodoScreen} />
    </Stack.Navigator>
);

export default AppNavigator;
