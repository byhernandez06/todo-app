// src/screens/CreateTodoScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAppDispatch } from '../app/hooks';
import { addTodoAsync } from '../features/todos/todoSlice';

const CreateTodoScreen = ({ navigation }: { navigation: any }) => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddTodo = () => {
        if (!title || !description) {
            Alert.alert('Validation Error', 'Please enter both title and description.');
            return;
        }

        dispatch(addTodoAsync({ title, description }))
            .unwrap()
            .then(() => {
                navigation.navigate('TodoList'); // Redirige a la pantalla de lista de To-Do
            })
            .catch((error) => {
                Alert.alert('Error', error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter the title"
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter the description"
                multiline
            />
            <Button title="Add Todo" onPress={handleAddTodo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});

export default CreateTodoScreen;
