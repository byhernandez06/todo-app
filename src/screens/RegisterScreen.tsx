import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../slices/authSlice';
import { RootState, AppDispatch } from '../app/store';
import type { RegisterScreenNavigationProp } from '../types';

const RegisterScreen: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<RegisterScreenNavigationProp>();

    const handleRegister = async () => {
        if (fullName && email && password) {
            await dispatch(registerUser({ fullName, email, password })).unwrap();
            navigation.navigate('Login');

            Alert.alert('Registro exitoso', `Bienvenido, ${fullName}!`);
            navigation.navigate('Login');
        } else {
            Alert.alert('Error', 'Por favor completa todos los campos.');
        }
    };

    //   const handleRegister = async () => {
    //     try {
    //         await dispatch(loginUser({ email, password })).unwrap();
    //         navigation.navigate('TodoList');

    //         if (fullName && email && password) {
    //             Alert.alert('Registro exitoso', `Bienvenido, ${fullName}!`);
    //             navigation.navigate('Login');
    //           } else {
    //             Alert.alert('Error', 'Por favor completa todos los campos.');
    //           }
    //     } catch (error) {
    //         console.error('Login failed:', error);
    //     }
    // };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign up</Text>
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign up" onPress={handleRegister} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default RegisterScreen;
