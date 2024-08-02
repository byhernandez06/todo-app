import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { TodoListScreenNavigationProp } from '../types';

import { fetchTodosAsync, selectTodos, checkCompletedAsync, deleteTodoAsync } from '../features/todos/todoSlice';
import { useAppDispatch } from '../app/hooks';
import { logout } from '../slices/authSlice';
import { RootState } from '../app/store';

// type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const TodoListScreen = () => {

    const dispatch = useAppDispatch();
    // const navigation = useNavigation<LoginScreenNavigationProp>();
    const navigation = useNavigation<TodoListScreenNavigationProp>();

    const todos = useSelector(selectTodos);
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const fetchTodos = async () => {
            await dispatch(fetchTodosAsync());
            console.log('Todos:', todos);
        };

        fetchTodos();
    }, [dispatch]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await dispatch(fetchTodosAsync());
        setRefreshing(false);
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        navigation.navigate('Login'); // Redirect to login screen after logout
    };

    const createTodo = () => {
        navigation.navigate('CreateTodo');
    };

    const handleCompleteTodo = (id: string) => {
        console.log(id)
        dispatch(checkCompletedAsync(id));
    };

    const handleEditTodo = (id: string) => {
        navigation.navigate('EditTodo', { id });
    };

    const handleDelete = (id: string) => {
        dispatch(deleteTodoAsync(id));
    };

    return (
        <View style={styles.container}>
            <Text>Welcome, {user?.email}</Text>
            <Button title="Logout" onPress={handleLogout} />
            <Text>Todo List</Text>
            <FlatList
                data={todos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                        <Text style={styles.title}>Title: {item.title}</Text>
                        <Text>Description: {item.description}</Text>
                        {!item.completed && (
                            <>
                                <Button
                                    title="Complete"
                                    onPress={() => handleCompleteTodo(item.id)}
                                />

                                <Button
                                    title="Edit"
                                    onPress={() => handleEditTodo(item.id)}
                                />
                            </>
                        )}

                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDelete(item.id)}
                        >
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />

            <Button title="New" onPress={createTodo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    deleteButton: {
        marginTop: 10,
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default TodoListScreen;
