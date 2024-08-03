import React, { useEffect, useState, ReactNode } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from './navigation/AuthNavigator';
import AppNavigator from './navigation/AppNavigator';
import { initializeAuthState } from './slices/authSlice';
import { RootState } from './app/store';
import { useAppSelector } from './app/hooks';
import type { AppDispatch } from './app/store';

const Stack = createNativeStackNavigator();

interface AppInitializerProps {
    children?: ReactNode;
}

const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
    const dispatch: AppDispatch = useDispatch();
    const { token } = useAppSelector((state: RootState) => state.auth);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const userToken = await AsyncStorage.getItem('userToken');
            await dispatch(initializeAuthState(userToken));
            setIsLoading(false);
        };

        initializeAuth();
    }, [dispatch]);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {token ? (
                    <Stack.Screen name="App" component={AppNavigator} />
                ) : (
                    <Stack.Screen name="Auth" component={AuthNavigator} />
                )}
            </Stack.Navigator>
            {children}
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AppInitializer;
