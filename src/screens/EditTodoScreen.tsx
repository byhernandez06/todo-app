import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { updateTodoAsync } from '../slices/todoSlice';
import { useAppDispatch } from '../app/hooks';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

type RootStackParamList = {
    EditTodo: { id: string };
};

type EditTodoScreenRouteProp = RouteProp<RootStackParamList, 'EditTodo'>;

const EditTodoScreen = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const route = useRoute<EditTodoScreenRouteProp>();

    const { id } = route.params;
    const todo = useSelector((state: RootState) =>
        state.todos.todos.find((todo) => todo.id === id)
    );

    const [title, setTitle] = useState(todo?.title || '');
    const [description, setDescription] = useState(todo?.description || '');

    const handleUpdateTodo = () => {
        dispatch(updateTodoAsync({ id, todo: { title, description } }));
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text>Edit Todo</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <Button title="Update Todo" onPress={handleUpdateTodo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default EditTodoScreen;
