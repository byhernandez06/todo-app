import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { addTodoAsync } from '../features/todos/todoSlice';
import { useAppDispatch } from '../app/hooks';

const AddTodo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useAppDispatch();

    const handleAddTodo = () => {
        if (title && description) {
            dispatch(addTodoAsync({ title, description }));
            setTitle('');
            setDescription('');
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <Button title="Add Todo" onPress={handleAddTodo} />
        </View>
    );
};

export default AddTodo;
