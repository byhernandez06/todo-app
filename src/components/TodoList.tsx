import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Text, View, FlatList } from 'react-native';
import { fetchTodosAsync, selectTodos } from '../features/todos/todoSlice';
import { useAppDispatch } from '../app/hooks';

const TodoList = () => {
    const dispatch = useAppDispatch();
    const todos = useSelector(selectTodos);

    useEffect(() => {
        dispatch(fetchTodosAsync());
    }, [dispatch]);

    return (
        <View>
            <Text>Todo List</Text>
            <FlatList
                data={todos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                        <Text>Title: {item.title}</Text>
                        <Text>Description: {item.description}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default TodoList;
