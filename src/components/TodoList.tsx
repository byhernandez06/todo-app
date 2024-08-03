import React from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { Todo } from '../types';

interface TodoListProps {
    todos: Todo[];
    onComplete: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    refreshControl?: JSX.Element;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onComplete, onEdit, onDelete, refreshControl }) => {
    return (
        <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <Text style={styles.title}>Title: {item.title}</Text>
                    <Text>Description: {item.description}</Text>
                    {!item.completed && (
                        <View style={styles.actions}>
                            <Button title="Complete" onPress={() => onComplete(item.id)} />
                            <Button title="Edit" onPress={() => onEdit(item.id)} />
                        </View>
                    )}
                    <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            )}
            refreshControl={refreshControl}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
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

export default TodoList;
