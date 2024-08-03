import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../slices/authSlice';
import { AppDispatch } from '../app/store';
import type { RegisterScreenNavigationProp } from '../types';

const RegisterScreen: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [inputError, setInputError] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<RegisterScreenNavigationProp>();

    const handleRegister = async () => {
        if (!fullName || !email || !password) {
            setInputError('Please complete all fields');
            return;
        }
        if (!validateEmail(email)) {
            setEmailError('Invalid e-mail address');
            return;
        }

        try {
            await dispatch(registerUser({ fullName, email, password })).unwrap();
            Alert.alert('Successful registration', `Welcome, ${fullName}!`);
            navigation.navigate('Login');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    const handleEmailChange = (text: string) => {
        setEmail(text.toLowerCase());
        if (emailError) {
            setEmailError('');
        }
    };

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

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
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {inputError ? <Text style={styles.error}>{inputError}</Text> : null}
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
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default RegisterScreen;
