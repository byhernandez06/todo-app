import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../slices/authSlice';
import { RootState, AppDispatch } from '../app/store';
import type { LoginScreenNavigationProp } from '../types';

// type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

// interface Props {
//     navigation: LoginScreenNavigationProp;
// }

const LoginScreen: React.FC = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const [email, setEmail] = useState('byronh3@example.com');
    const [password, setPassword] = useState('1234');
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const handleLogin = async () => {
        try {
            await dispatch(loginUser({ email, password })).unwrap();
            navigation.navigate('TodoList');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} disabled={loading} />
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {error && <Text style={styles.error}>{error}</Text>}

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
