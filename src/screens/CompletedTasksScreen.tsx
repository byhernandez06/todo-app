import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert, RefreshControl, Text } from 'react-native';
import TodoList from '../components/TodoList';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AppDispatch, RootState } from '../app/store';
import { selectTodos, fetchTodosAsync, checkCompletedAsync, deleteTodoAsync } from '../slices/todoSlice';
import { TodoListScreenNavigationProp } from '../types';

const CompletedTasksScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<TodoListScreenNavigationProp>();

    const todos = useSelector((state: RootState) => selectTodos(state));
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const completedTodos = todos.filter(todo => todo.completed);

    useEffect(() => {
        const loadTodos = async () => {
            await dispatch(fetchTodosAsync());
            setLoading(false);
        };
        loadTodos();
    }, [dispatch]);

    const confirmDelete = useCallback((id: string) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this task?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => handleDelete(id)
                }
            ]
        );
    }, [dispatch]);

    const handleDelete = useCallback((id: string) => {
        dispatch(deleteTodoAsync(id));
    }, [dispatch]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await dispatch(fetchTodosAsync());
        setRefreshing(false);
    }, [dispatch]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            {completedTodos.length === 0 ? (
                <Text style={styles.message}>No completed tasks available.</Text>
            ) : (
                <TodoList
                    todos={completedTodos}
                    onComplete={(id) => dispatch(checkCompletedAsync(id))}
                    onEdit={(id) => navigation.navigate('EditTodo', { id })}
                    onDelete={confirmDelete}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    message: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
        color: 'gray',
    },
});

export default CompletedTasksScreen;
