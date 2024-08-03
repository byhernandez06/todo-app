import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert, RefreshControl, Text, TouchableOpacity } from 'react-native';
import TodoList from '../components/TodoList';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AppDispatch, RootState } from '../app/store';
import { selectTodos, fetchTodosAsync, addTodoAsync, checkCompletedAsync, deleteTodoAsync } from '../slices/todoSlice';
import AddTodo from '../components/AddTodo';
import { TodoListScreenNavigationProp } from '../types';

const ActiveTasksScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<TodoListScreenNavigationProp>();

    const todos = useSelector((state: RootState) => selectTodos(state));
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [showAddTodo, setShowAddTodo] = useState(false);

    const activeTodos = todos.filter(todo => !todo.completed);

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

    const handleAddTodo = (title: string, description: string) => {
        dispatch(addTodoAsync({ title, description }))
            .unwrap()
            .then(() => {
                setShowAddTodo(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleCancel = () => {
        setShowAddTodo(false);
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {showAddTodo ? (
                    <AddTodo onAdd={handleAddTodo} onCancel={handleCancel} />
                ) : (
                    <>
                        <Text style={styles.headerText}>Active Tasks</Text>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => setShowAddTodo(true)}
                        >
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
            {activeTodos.length === 0 ? (
                <Text style={styles.message}>No active tasks available.</Text>
            ) : (
                <TodoList
                    todos={activeTodos}
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
    },
    headerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        padding: 10,
        marginLeft: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ActiveTasksScreen;
