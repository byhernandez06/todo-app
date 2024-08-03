import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

interface TodoItemProps {
    todo: { id: string; title: string; description: string; completed: boolean };
    onComplete: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onComplete, onEdit, onDelete }) => {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.title}>Title: {todo.title}</Text>
            <Text>Description: {todo.description}</Text>
            {!todo.completed && (
                <>
                    <Button title="Complete" onPress={() => onComplete(todo.id)} />
                    <Button title="Edit" onPress={() => onEdit(todo.id)} />
                </>
            )}
            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(todo.id)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
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

export default TodoItem;
