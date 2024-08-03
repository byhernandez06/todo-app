import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../slices/authSlice';
import { RootState, AppDispatch } from '../app/store';
import type { LoginScreenNavigationProp } from '../types';

const LoginScreen: React.FC = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [inputError, setInputError] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const handleLogin = async () => {
        setEmailError('');
        setInputError('');

        if (!email || !password) {
            setInputError('Please fill in all fields.');
            return;
        }

        if (!validateEmail(email)) {
            setEmailError('Invalid email address.');
            return;
        }

        try {
            await dispatch(loginUser({ email, password })).unwrap();
            navigation.navigate('Tabs');
        } catch (error) {
            console.error('Login failed:', error);
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
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={handleEmailChange}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {inputError ? <Text style={styles.error}>{inputError}</Text> : null}
            <Button title="Login" onPress={handleLogin} disabled={loading} />
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {error && !inputError && !emailError ? <Text style={styles.error}>{error}</Text> : null}
            <Button
                title="Sign Up"
                onPress={() => navigation.navigate('Register')}
                color="#007bff"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    error: {
        color: 'red',
        marginTop: 12,
    },
});

export default LoginScreen;
